import ProductBrowser from "@/components/ProductBrowser";
import { supabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const sb = supabaseServer();
  const { data, error } = await sb
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("is_ready", true)
    .order("updated_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="text-sm text-neutral-500">Digital Store</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Beli premium tanpa drama
        </h1>
        <p className="mt-2 text-neutral-600">
          Katalog rapi, order cepat, admin panel jalan.
        </p>
      </div>

      <ProductBrowser initial={data ?? []} />
    </div>
  );
}
