"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="text-sm text-neutral-500">Terjadi error</div>
      <div className="mt-2 font-semibold">Aplikasi lagi rewel.</div>
      <pre className="mt-4 overflow-auto rounded-xl bg-neutral-50 p-4 text-xs text-neutral-700">
        {String(error?.message ?? error)}
      </pre>
      <button
        onClick={() => reset()}
        className="mt-4 rounded-2xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white"
      >
        Coba lagi
      </button>
    </div>
  );
}
