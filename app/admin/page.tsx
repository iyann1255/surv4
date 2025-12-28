import Link from "next/link";
import AdminGuard from "@/components/AdminGuard";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { adminSignOut, adminDeleteProduct } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function AdminHome({ searchParams }: { searchParams: { [k: string]: string | string[] | undefined } }) {
  const ok = !!searchParams["deleted"];

  const admin = supabaseAdmin();
  const { data, error } = await admin
    .from("products")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (
    <AdminGuard>
      <div className="space-y-6">
        <div className="rounded-3xl border bg-white p-6 shadow-sm flex items-start justify-between gap-3">
          <div>
            <div className="text-sm text-neutral-500">Admin Panel</div>
            <h1 className="mt-1 text-2xl font-semibold">Kelola Produk</h1>
            <p className="mt-2 text-sm text-neutral-600">
              CRUD produk langsung, tanpa edit kode.
            </p>
            {ok ? <div className="mt-3 text-sm text-green-700">Produk berhasil dihapus.</div> : null}
          </div>

          <form action={adminSignOut}>
            <button className="rounded-2xl border bg-white px-4 py-2 text-sm font-medium">
              Sign out
            </button>
          </form>
        </div>

        <div className="flex items-center justify-between">
          <Link className="rounded-2xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white" href="/admin/products/new">
            + Tambah Produk
          </Link>
          <div className="text-sm text-neutral-600">Total: {data?.length ?? 0}</div>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Slug</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Active</th>
                <th className="px-4 py-3 text-left">Ready</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {(data ?? []).map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3 font-mono text-xs">{p.slug}</td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3">{p.is_active ? "Yes" : "No"}</td>
                  <td className="px-4 py-3">{p.is_ready ? "Yes" : "No"}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-2">
                      <Link className="rounded-xl border bg-white px-3 py-1" href={`/admin/products/${p.id}/edit`}>
                        Edit
                      </Link>
                      <form action={adminDeleteProduct}>
                        <input type="hidden" name="id" value={p.id} />
                        <input type="hidden" name="slug" value={p.slug} />
                        <button className="rounded-xl border bg-white px-3 py-1 text-red-600">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {(data ?? []).length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-neutral-600" colSpan={6}>
                    Belum ada produk. Klik “Tambah Produk”.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </AdminGuard>
  );
}
