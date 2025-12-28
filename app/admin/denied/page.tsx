import Link from "next/link";

export default function Denied() {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="text-sm text-neutral-500">Akses ditolak</div>
      <div className="mt-2 font-semibold">Email kamu tidak ada di whitelist ADMIN_EMAILS.</div>
      <div className="mt-4 text-sm text-neutral-700">
        Minta owner nambahin email kamu di env: <span className="font-mono">ADMIN_EMAILS</span>
      </div>
      <div className="mt-6">
        <Link className="rounded-2xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white" href="/">
          Balik ke Home
        </Link>
      </div>
    </div>
  );
}
