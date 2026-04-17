"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import SermonCard from "./SermonCard";

async function fetchSermons({ page, category, q }) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", "9");
  if (category) params.set("category", category);
  if (q) params.set("q", q);
  const res = await fetch(`/api/sermons?${params.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load sermons");
  return res.json();
}

export default function SermonsClient() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [q, setQ] = useState("");

  const queryKey = useMemo(
    () => ["sermons", { page, category, q }],
    [page, category, q],
  );

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey,
    queryFn: () => fetchSermons({ page, category, q }),
  });

  const categories = data?.categories || [];
  const total = data?.total || 0;
  const limit = data?.limit || 9;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-white/80 text-sm font-black tracking-wide">Filters</p>

          <div className="mt-4">
            <label className="text-xs font-bold text-white/60">Search</label>
            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/10 bg-background/60 px-4 py-3">
              <Search className="size-4 text-white/50" />
              <input
                value={q}
                onChange={(e) => {
                  setPage(1);
                  setQ(e.target.value);
                }}
                placeholder="Title or speaker…"
                className="w-full bg-transparent outline-none text-sm placeholder:text-white/40"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="text-xs font-bold text-white/60">Category</label>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setPage(1);
                  setCategory("");
                }}
                className={[
                  "px-3 py-2 rounded-xl text-sm font-extrabold border transition-colors",
                  !category
                    ? "bg-primary text-black border-primary"
                    : "bg-white/5 border-white/10 text-white/75 hover:bg-white/10",
                ].join(" ")}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => {
                    setPage(1);
                    setCategory(c.slug);
                  }}
                  className={[
                    "px-3 py-2 rounded-xl text-sm font-extrabold border transition-colors",
                    category === c.slug
                      ? "bg-primary text-black border-primary"
                      : "bg-white/5 border-white/10 text-white/75 hover:bg-white/10",
                  ].join(" ")}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-xs text-white/50">
            {isFetching ? "Updating…" : `${total} sermon${total === 1 ? "" : "s"} found`}
          </div>
        </div>
      </div>

      <div className="lg:col-span-9">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl border border-white/10 bg-white/5 h-[320px] animate-pulse"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/80">
            Unable to load sermons right now.
          </div>
        ) : data.items.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {data.items.map((s) => (
              <SermonCard key={s.id} sermon={s} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/80">
            No sermons match your filters.
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-extrabold disabled:opacity-40 hover:bg-white/10 transition-colors"
          >
            Previous
          </button>
          <div className="text-sm text-white/60 font-bold">
            Page {page} of {totalPages}
          </div>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-extrabold disabled:opacity-40 hover:bg-white/10 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

