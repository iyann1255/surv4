"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

type Props = {
  onUploaded: (payload: { image_path: string; image_url: string }) => void;
};

export default function ImageUpload({ onUploaded }: Props) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onPick(file: File | null) {
    setErr(null);
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErr("File harus gambar.");
      return;
    }

    setBusy(true);
    try {
      const sb = supabaseBrowser();
      const ext = (file.name.split(".").pop() || "png").toLowerCase();
      const safeExt = /^[a-z0-9]+$/.test(ext) ? ext : "png";
      const path = `products/${Date.now()}-${Math.random().toString(16).slice(2)}.${safeExt}`;

      const { error: upErr } = await sb.storage.from("products").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type
      });
      if (upErr) throw upErr;

      const { data } = sb.storage.from("products").getPublicUrl(path);
      onUploaded({ image_path: path, image_url: data.publicUrl });
    } catch (e: any) {
      setErr(e?.message ?? "Upload gagal.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="text-sm font-medium">Gambar Produk</div>
      <div className="mt-2 text-sm text-neutral-600">
        Upload ke bucket <span className="font-mono">products</span>.
      </div>

      <input
        className="mt-3 block w-full text-sm"
        type="file"
        accept="image/*"
        onChange={(e) => onPick(e.target.files?.[0] ?? null)}
        disabled={busy}
      />

      {busy ? <div className="mt-2 text-sm text-neutral-600">Uploading…</div> : null}
      {err ? <div className="mt-2 text-sm text-red-600">{err}</div> : null}
    </div>
  );
}
