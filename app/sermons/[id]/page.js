import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { MOCK_SERMONS } from "@/lib/mockData";
import { formatDate, formatDuration } from "@/lib/format";
import { getYouTubeSermonById, hasYouTubeRuntimeSource } from "@/lib/sermonsData";
import { toYouTubeEmbedUrl } from "@/lib/youtube";

async function getSermon(id) {
  if (hasYouTubeRuntimeSource()) {
    try {
      const youtubeSermon = await getYouTubeSermonById(id);
      if (youtubeSermon) return youtubeSermon;
    } catch {
      // Fall through to DB/mock data.
    }
  }

  try {
    const sermon =
      (await prisma.sermon.findUnique({
        where: { id },
        include: { category: true },
      })) ||
      (await prisma.sermon.findUnique({
        where: { slug: id },
        include: { category: true },
      }));

    if (!sermon) return null;

    return {
      id: sermon.id,
      slug: sermon.slug,
      title: sermon.title,
      description: sermon.description || null,
      speaker: sermon.speaker || null,
      date: sermon.date.toISOString(),
      durationMinutes: sermon.durationMinutes ?? null,
      thumbnailUrl: sermon.thumbnailUrl || null,
      videoUrl: sermon.videoUrl || null,
      category: sermon.category
        ? {
            id: sermon.category.id,
            name: sermon.category.name,
            slug: sermon.category.slug,
          }
        : null,
      source: "db",
    };
  } catch {
    const fallback = MOCK_SERMONS.find((item) => item.id === id || item.slug === id);
    return fallback || null;
  }
}

export async function generateMetadata({ params }) {
  const sermon = await getSermon(params.id);
  if (!sermon) return { title: "Sermon Not Found" };
  return { title: `${sermon.title} | Sermons` };
}

export default async function SermonDetailPage({ params }) {
  const sermon = await getSermon(params.id);
  if (!sermon) notFound();

  const embed = toYouTubeEmbedUrl(sermon.videoUrl);
  const duration = formatDuration(sermon.durationMinutes);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link
          href="/sermons"
          className="inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/10 px-5 py-2.5 font-bold hover:bg-white/10 transition-colors"
        >
          Back to Sermons
        </Link>
        {sermon.videoUrl ? (
          <a
            href={sermon.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-primary text-black font-extrabold px-5 py-2.5 hover:bg-accent transition-colors"
          >
            Watch on YouTube
          </a>
        ) : null}
      </div>

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
          ) : (
            <div className="flex h-full w-full items-center justify-center text-white/70 font-bold">
              Video not available
            </div>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-accent/90 text-xs font-black tracking-[0.25em] uppercase">
            {sermon.category?.name || "Sermon"}
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-black leading-tight">
            {sermon.title}
          </h1>
          <p className="mt-3 text-white/70 font-bold">
            {formatDate(sermon.date)}
            {duration ? ` | ${duration}` : ""}
            {sermon.speaker ? ` | ${sermon.speaker}` : ""}
          </p>
          {sermon.description ? (
            <p className="mt-5 max-w-3xl text-white/80 leading-relaxed">
              {sermon.description}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
