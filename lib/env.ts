export function mustGetEnv(name: string): string {
  const v = process.env[name];
  if (!v || !v.trim()) throw new Error(`Missing env: ${name}`);
  return v.trim();
}

export function getEnv(name: string, fallback = ""): string {
  const v = process.env[name];
  return (v && v.trim()) ? v.trim() : fallback;
}

export function getAdminEmails(): string[] {
  const raw = getEnv("ADMIN_EMAILS", "");
  return raw
    .split(",")
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);
}
