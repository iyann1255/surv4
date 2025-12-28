# Surya Store v4 (Mode B — Supabase)

## Setup Supabase
1) Buat project Supabase
2) SQL Editor → jalankan `supabase/schema.sql`
3) Buat Storage bucket bernama `products` dan set **Public**

## Env
Copy `.env.example` → `.env.local`, isi:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY (server-only)
- ADMIN_EMAILS (whitelist email admin)
- DEFAULT_ORDER_LINK (fallback)

## Run
```bash
npm i
npm run dev
```

## Admin
- /admin/login (OTP email)
- /admin (CRUD)

Deploy:
- Vercel / Netlify: tinggal set env vars
- VPS: `npm run build && npm run start` (reverse proxy ke 3000)
