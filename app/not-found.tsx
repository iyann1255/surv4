export default function NotFound() {
  return (
    <div className="rounded-2xl border bg-white p-6 text-neutral-700">
      Halaman tidak ditemukan. Balik ke katalog aja.
      <div className="mt-4">
        <a className="rounded-2xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white" href="/">
          Ke Home
        </a>
      </div>
    </div>
  );
}
