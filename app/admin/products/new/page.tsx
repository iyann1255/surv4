import Link from "next/link";
import AdminGuard from "@/components/AdminGuard";
import ImageUpload from "@/components/ImageUpload";
import { adminUpsertProduct, defaultOrderLink } from "@/lib/actions";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type PageProps = { params: { id?: string }; searchParams: { [k: string]: string | string[] | undefined } };

export default async function Page({ params, searchParams }: PageProps) {
  const ok = !!searchParams["ok"];

  let existing: any = null;
  if (false) {
    const admin = supabaseAdmin();
    const { data, error } = await admin.from("products").select("*").eq("id", params.id as string).single();
    if (error) throw new Error(error.message);
    existing = data;
  }

  const fallbackOrder = defaultOrderLink();

  return (
    <AdminGuard>
      <div className="space-y-6">
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="text-sm text-neutral-500">Admin</div>
          <h1 className="mt-1 text-2xl font-semibold">Tambah Produk</h1>
          {ok ? <div className="mt-3 text-sm text-green-700">Tersimpan.</div> : null}
          <div className="mt-4">
            <Link className="rounded-2xl border bg-white px-4 py-2 text-sm font-medium" href="/admin">
              ← Kembali
            </Link>
          </div>
        </div>

        <form action={adminUpsertProduct} className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-2xl border bg-white p-4">
              <div className="grid gap-3 md:grid-cols-2">
                <input type="hidden" name="id" value={existing?.id ?? ""} />
                <div>
                  <div className="text-sm font-medium">Slug</div>
                  <input name="slug" defaultValue={existing?.slug ?? ""} className="mt-2 w-full rounded-2xl border px-4 py-3 outline-none" placeholder="netflix-premium-30d" required />
                </div>
                <div>
                  <div className="text-sm font-medium">Title</div>
                  <input name="title" defaultValue={existing?.title ?? ""} className="mt-2 w-full rounded-2xl border px-4 py-3 outline-none" placeholder="Netflix Premium" required />
                </div>
                <div>
                  <div className="text-sm font-medium">Category</div>
                  <input name="category" defaultValue={existing?.category ?? "Other"} className="mt-2 w-full rounded-2xl border px-4 py-3 outline-none" placeholder="Streaming" />
                </div>
                <div>
                  <div className="text-sm font-medium">Badge</div>
                  <input name="badge" defaultValue={existing?.badge ?? ""} className="mt-2 w-full rounded-2xl border px-4 py-3 outline-none" placeholder="Best Seller" />
                </div>
                <div>
                  <div className="text-sm font-medium">Price (IDR)</div>
                  <input name="price_idr" type="number" defaultValue={existing?.price_idr ?? 0} className="mt-2 w-full rounded-2xl border px-4 py-3 outline-none" />
                </div>
                <div>
                  <div className="text-sm font-medium">Duration (days)</div>
                  <input name="duration_days" type="number" defaultValue={existing?.duration_days ?? 30} className="mt-2 w-full rounded-2xl border px-4 py-3 outline-none" />
                </div>

                <div className="md:col-span-2">
                  <div className="text-sm font-medium">Description</div>
                  <textarea name="description" defaultValue={existing?.description ?? ""} className="mt-2 w-full rounded-2xl border px-4 py-3 outline-none" rows={3} placeholder="Deskripsi singkat produk" />
                </div>

                <div className="md:col-span-2">
                  <div className="text-sm font-medium">Features (comma / newline)</div>
                  <textarea name="features" defaultValue={(existing?.features ?? []).join("\n")} className="mt-2 w-full rounded-2xl border px-4 py-3 outline-none" rows={4} placeholder={"No ads\n4K UHD\n30 hari"} />
                </div>

                <div className="md:col-span-2">
                  <div className="text-sm font-medium">Order link (optional)</div>
                  <input name="order_link" defaultValue={existing?.order_link ?? ""} className="mt-2 w-full rounded-2xl border px-4 py-3 outline-none" placeholder={fallbackOrder || "https://wa.me/62..."} />
                  <div className="mt-2 text-xs text-neutral-500">
                    Jika kosong, sistem pakai DEFAULT_ORDER_LINK dari env.
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input name="is_active" type="checkbox" defaultChecked={existing ? !!existing.is_active : true} />
                    Active
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input name="is_ready" type="checkbox" defaultChecked={existing ? !!existing.is_ready : true} />
                    Ready
                  </label>
                </div>

                <div className="md:col-span-2 flex flex-wrap gap-3">
                  <button className="rounded-2xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white">
                    Save
                  </button>
                  <Link className="rounded-2xl border bg-white px-4 py-2 text-sm font-medium" href="/">
                    Lihat store
                  </Link>
                </div>
              </div>

              <input type="hidden" name="image_path" defaultValue={existing?.image_path ?? ""} />
              <input type="hidden" name="image_url" defaultValue={existing?.image_url ?? ""} />

              <div className="mt-4">
                <div className="text-sm font-medium">Preview</div>
                <img id="img-preview" src={existing?.image_url ?? ""} alt="preview" className="mt-2 w-full max-w-lg rounded-2xl border" />
                <div className="mt-2 text-xs text-neutral-500">
                  Upload gambar di panel kanan lalu Save.
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <ImageUpload
              onUploaded={({ image_path, image_url }) => {
                const p = document.querySelector('input[name="image_path"]') as HTMLInputElement | null;
                const u = document.querySelector('input[name="image_url"]') as HTMLInputElement | null;
                if (p) p.value = image_path;
                if (u) u.value = image_url;

                const preview = document.getElementById("img-preview") as HTMLImageElement | null;
                if (preview) preview.src = image_url;
              }}
            />
            <div className="rounded-2xl border bg-white p-4 text-sm text-neutral-600">
              Pastikan bucket storage <span className="font-mono">products</span> sudah dibuat dan public.
            </div>
          </div>
        </form>
      </div>
    </AdminGuard>
  );
}
