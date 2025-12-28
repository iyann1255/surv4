import { createBrowserClient } from "@supabase/ssr";
import { mustGetEnv } from "@/lib/env";

export function supabaseBrowser() {
  return createBrowserClient(
    mustGetEnv("NEXT_PUBLIC_SUPABASE_URL"),
    mustGetEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  );
}
