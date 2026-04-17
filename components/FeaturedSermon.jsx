"use client";

import { useQuery } from "@tanstack/react-query";
import { toYouTubeEmbedUrl } from "@/lib/youtube";
import { formatDate, formatDuration } from "@/lib/format";
import Link from "next/link";

async function fetchLatest() {
  const res = await fetch("/api/sermons?limit=1", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load sermon");
  const data = await res.json();
  return data.items?.[0] || null;
}

export default function FeaturedSermon() {
  const { data: sermon, isLoading } = useQuery({
    queryKey: ["sermons", "featured"],
    queryFn: fetchLatest,
  });

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden animate-pulse">
        <div className="aspect-video bg-white/5" />
        <div className="p-6">
          <div className="h-4 w-32 bg-white/10 rounded" />
          <div className="mt-3 h-6 w-2/3 bg-white/10 rounded" />
          <div className="mt-2 h-4 w-1/2 bg-white/10 rounded" />
        </div>
      </div>
    );
  }

  if (!sermon) return null;

  const embed = toYouTubeEmbedUrl(sermon.videoUrl);
  const duration = formatDuration(sermon.durationMinutes);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
      <div className="aspect-video bg-background/40">
        {embed ? (
          <iframe
            title={sermon.title}
            className="h-full w-full"
            src={embed}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : null}
      </div>
      <div className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-accent/90 text-xs font-black tracking-[0.25em] uppercase">
            Featured Sermon
          </p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-black leading-tight">
            {sermon.title}
          </h2>
          <p className="mt-2 text-white/70 font-bold text-sm">
            {formatDate(sermon.date)}
            {duration ? ` • ${duration}` : ""}
            {sermon.speaker ? ` • ${sermon.speaker}` : ""}
          </p>
        </div>
        <Link
          href="/sermons"
          className="inline-flex items-center justify-center rounded-xl bg-primary text-black font-extrabold px-6 py-3 hover:bg-accent transition-colors"
        >
          Browse Sermons
        </Link>
      </div>
    </div>
  );
}

