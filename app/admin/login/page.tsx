"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function sendLink() {
    setErr(null);
    const e = email.trim();
    if (!e) return setErr("Email wajib diisi.");

    setBusy(true);
    try {
      const sb = supabaseBrowser();
      const { error } = await sb.auth.signInWithOtp({
        email: e,
        options: { emailRedirectTo: `${window.location.origin}/admin` }
      });
      if (error) throw error;
      setSent(true);
    } catch (x: any) {
      setErr(x?.message ?? "Gagal kirim OTP.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="text-sm text-neutral-500">Admin Login</div>
        <h1 className="mt-1 text-2xl font-semibold">Masuk pakai email OTP</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Cek inbox/spam. Email kamu harus ada di whitelist.
        </p>

        <div className="mt-4 space-y-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@kamu.com"
            className="w-full rounded-2xl border bg-white px-4 py-3 outline-none"
            disabled={busy || sent}
          />
          <button
            onClick={sendLink}
            className="w-full rounded-2xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white disabled:opacity-60"
            disabled={busy || sent}
          >
            {sent ? "OTP terkirim" : (busy ? "Mengirim..." : "Kirim OTP")}
          </button>

          {err ? <div className="text-sm text-red-600">{err}</div> : null}
          {sent ? <div className="text-sm text-neutral-700">Udah kekirim. Buka email dan klik link.</div> : null}
        </div>
      </div>
    </div>
  );
}
