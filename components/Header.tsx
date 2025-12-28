import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight text-lg">
          Surya Store v4
        </Link>
        <nav className="flex items-center gap-4 text-sm text-neutral-600">
          <Link href="/" className="hover:text-neutral-900">Katalog</Link>
          <Link href="/admin" className="hover:text-neutral-900">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
