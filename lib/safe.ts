export function formatIDR(value: number): string {
  try {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value);
  } catch {
    return `Rp ${value}`;
  }
}

export function isHttpUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function pick<T>(v: T | null | undefined, fallback: T): T {
  return v == null ? fallback : v;
}
