"use client";

import { useMemo, useState } from "react";
import type { ProductRow } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

export default function ProductBrowser({ initial }: { initial: ProductRow[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const categories = useMemo(() => {
    const s = new Set(initial.map(p => p.category).filter(Boolean));
    return ["All", ...Array.from(s).sort((a, b) => a.localeCompare(b))];
  }, [initial]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return initial.filter(p => {
      if (cat !== "All" && p.category !== cat) return false;
      if (!query) return true;
      return (
        p.title.toLowerCase().includes(query) ||
        p.slug.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    });
  }, [initial, q, cat]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-white px-4 py-3 shadow-sm">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari produk… (netflix, spotify, capcut)"
            className="w-full bg-transparent outline-none"
          />
        </div>

        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <div className="text-sm font-medium">Kategori</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={[
                  "rounded-full border px-3 py-1 text-sm",
                  cat === c ? "bg-neutral-900 text-white border-neutral-900" : "bg-white"
                ].join(" ")}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border bg-white p-6 text-neutral-600">
          Tidak ada produk yang cocok. Coba keyword lain.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  );
}
