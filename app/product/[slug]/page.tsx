import { notFound } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { formatIDR, isHttpUrl } from "@/lib/safe";
import { defaultOrderLink } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const sb = supabaseServer();
  const { data: p, error } = await sb
    .from("products")
    .select("*")
    .eq("slug", params.slug)
    .eq("is_active", true)
    .single();

  if (error || !p) return notFound();

  const order = (p.order_link && isHttpUrl(p.order_link)) ? p.order_link : "";
  const fallback = await defaultOrderLink();
  const finalOrder = order || fallback;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="text-sm text-neutral-500">{p.category}</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">{p.title}</h1>

        <div className="mt-3 text-2xl font-semibold">{formatIDR(p.price_idr)}</div>
        <div className="mt-1 text-sm text-neutral-500">{p.duration_days} hari</div>

        {p.badge ? (
          <div className="mt-3 inline-flex rounded-full border px-3 py-1 text-xs text-neutral-700">
            {p.badge}
          </div>
        ) : null}

        {p.image_url ? (
          <img
            src={p.image_url}
            alt={p.title}
            className="mt-5 w-full max-w-xl rounded-2xl border object-cover"
          />
        ) : null}

        {p.description ? (
          <p className="mt-5 text-neutral-700">{p.description}</p>
        ) : null}

        {Array.isArray(p.features) && p.features.length ? (
          <ul className="mt-4 list-disc pl-6 text-neutral-700">
            {p.features.map((f: string) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          {finalOrder ? (
            <a
              href={finalOrder}
              className="rounded-2xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white"
              target="_blank"
              rel="noreferrer"
            >
              Order sekarang
            </a>
          ) : (
            <div className="rounded-2xl border px-4 py-2 text-sm text-neutral-600">
              Order link belum diset (isi DEFAULT_ORDER_LINK atau order_link produk).
            </div>
          )}

          <a
            href="/"
            className="rounded-2xl border bg-white px-4 py-2 text-sm font-medium"
          >
            ← Kembali
          </a>
        </div>
      </div>
    </div>
  );
}
