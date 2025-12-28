"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getAdminEmails, getEnv } from "@/lib/env";

async function requireAdmin() {
  const sb = supabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user?.email) redirect("/admin/login");

  const allow = getAdminEmails();
  if (!allow.includes(user.email.toLowerCase())) redirect("/admin/denied");
  return user;
}

function toInt(v: FormDataEntryValue | null, fallback: number) {
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}

function toBoolFromCheckbox(v: FormDataEntryValue | null, fallback: boolean) {
  if (v === null) return false; // unchecked checkbox won't submit
  const s = String(v).toLowerCase();
  return s === "on" || s === "true" || s === "1" || s === "yes";
}

function toTextArray(v: FormDataEntryValue | null): string[] {
  const raw = String(v ?? "").trim();
  if (!raw) return [];
  return raw
    .split(/[,\n]/g)
    .map(s => s.trim())
    .filter(Boolean);
}

export async function adminUpsertProduct(form: FormData) {
  await requireAdmin();

  const id = String(form.get("id") ?? "").trim();
  const slug = String(form.get("slug") ?? "").trim();
  const title = String(form.get("title") ?? "").trim();
  const category = String(form.get("category") ?? "Other").trim() || "Other";

  if (!slug || !title) throw new Error("Slug dan Title wajib diisi.");

  const payload = {
    slug,
    title,
    category,
    price_idr: toInt(form.get("price_idr"), 0),
    duration_days: toInt(form.get("duration_days"), 30),
    badge: String(form.get("badge") ?? "").trim() || null,
    image_path: String(form.get("image_path") ?? "").trim() || null,
    image_url: String(form.get("image_url") ?? "").trim() || null,
    description: String(form.get("description") ?? "").trim() || null,
    features: toTextArray(form.get("features")),
    order_link: String(form.get("order_link") ?? "").trim() || null,
    is_active: toBoolFromCheckbox(form.get("is_active"), true),
    is_ready: toBoolFromCheckbox(form.get("is_ready"), true),
  };

  const admin = supabaseAdmin();
  const q = id
    ? admin.from("products").update(payload).eq("id", id).select("id").single()
    : admin.from("products").insert(payload).select("id").single();

  const { data, error } = await q;
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/product/${slug}`);

  redirect(`/admin/products/${data.id}/edit?ok=1`);
}

export async function adminDeleteProduct(form: FormData) {
  await requireAdmin();
  const id = String(form.get("id") ?? "").trim();
  const slug = String(form.get("slug") ?? "").trim();
  if (!id) throw new Error("Missing id.");

  const admin = supabaseAdmin();
  const { error } = await admin.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/admin");
  if (slug) revalidatePath(`/product/${slug}`);

  redirect("/admin?deleted=1");
}

export async function adminSignOut() {
  const sb = supabaseServer();
  await sb.auth.signOut();
  redirect("/admin/login");
}

export function defaultOrderLink(): string {
  return getEnv("DEFAULT_ORDER_LINK", "");
}
