import Link from "next/link";
import type { ProductRow } from "@/lib/types";
import { formatIDR } from "@/lib/safe";

export default function ProductCard({ p }: { p: ProductRow }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="group rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm text-neutral-500">{p.category}</div>
          <div className="mt-1 font-semibold">{p.title}</div>
        </div>
        {p.badge ? (
          <span className="rounded-full border px-2 py-1 text-xs text-neutral-700">
            {p.badge}
          </span>
        ) : null}
      </div>

      <div className="mt-3 text-2xl font-semibold">{formatIDR(p.price_idr)}</div>
      <div className="mt-1 text-sm text-neutral-500">{p.duration_days} hari</div>

      <div className="mt-4 text-sm text-neutral-600 line-clamp-2">
        {p.description ?? "Produk digital ready. Fast response."}
      </div>

      <div className="mt-4 text-sm font-medium text-neutral-900 group-hover:underline">
        Lihat detail →
      </div>
    </Link>
  );
}
