export default function Footer() {
  return (
    <footer className="mt-14 border-t">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-600">
        <div className="font-semibold text-neutral-900">Cara Order</div>
        <ol className="mt-2 list-decimal pl-5 space-y-1">
          <li>Pilih produk</li>
          <li>Masuk halaman detail</li>
          <li>Tekan tombol Order</li>
          <li>Chat admin dan beres</li>
        </ol>
        <div className="mt-6 text-xs text-neutral-500">
          © {new Date().getFullYear()} Surya Store v4
        </div>
      </div>
    </footer>
  );
}
