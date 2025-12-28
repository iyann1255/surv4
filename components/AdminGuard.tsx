import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { getAdminEmails } from "@/lib/env";

export default async function AdminGuard({ children }: { children: React.ReactNode }) {
  const sb = supabaseServer();
  const { data: { user } } = await sb.auth.getUser();

  if (!user?.email) redirect("/admin/login");

  const allow = getAdminEmails();
  if (!allow.includes(user.email.toLowerCase())) redirect("/admin/denied");

  return <>{children}</>;
}
