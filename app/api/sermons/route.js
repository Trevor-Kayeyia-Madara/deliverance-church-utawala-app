import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { MOCK_CATEGORIES, MOCK_SERMONS } from "@/lib/mockData";
import { getYouTubeSermonsCollection, hasYouTubeRuntimeSource } from "@/lib/sermonsData";

function safeInt(value, fallback) {
  const n = Number.parseInt(String(value || ""), 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function normalizeSermon(s) {
  return {
    id: s.id,
    slug: s.slug,
    title: s.title,
    description: s.description || null,
    speaker: s.speaker || null,
    date: typeof s.date === "string" ? s.date : s.date.toISOString(),
    durationMinutes: s.durationMinutes ?? null,
    thumbnailUrl: s.thumbnailUrl || null,
    videoUrl: s.videoUrl || null,
    category: s.category
      ? { id: s.category.id, name: s.category.name, slug: s.category.slug }
      : null,
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = safeInt(searchParams.get("page"), 1);
  const limit = Math.min(safeInt(searchParams.get("limit"), 9), 48);
  const category = searchParams.get("category");
  const q = searchParams.get("q");

  if (hasYouTubeRuntimeSource()) {
    try {
      const youtubeData = await getYouTubeSermonsCollection({ page, limit, q });
      return NextResponse.json(youtubeData);
    } catch {
      // Fall through to DB/mock data so the site still renders if YouTube is unavailable.
    }
  }

  const where = {
    ...(category ? { category: { slug: category } } : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q } },
            { description: { contains: q } },
            { speaker: { contains: q } },
          ],
        }
      : {}),
  };

  try {
    const [categories, total, items] = await Promise.all([
      prisma.category.findMany({ orderBy: { name: "asc" } }),
      prisma.sermon.count({ where }),
      prisma.sermon.findMany({
        where,
        include: { category: true },
        orderBy: { date: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      categories: categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug })),
      page,
      limit,
      total,
      items: items.map(normalizeSermon),
    });
  } catch {
    // Fallback when DATABASE_URL isn't configured yet.
    const filtered = MOCK_SERMONS.filter((s) => {
      if (category && s.category?.slug !== category) return false;
      if (q) {
        const needle = q.toLowerCase();
        const hay = `${s.title} ${s.speaker || ""}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });

    const start = (page - 1) * limit;
    const items = filtered.slice(start, start + limit);

    return NextResponse.json({
      categories: MOCK_CATEGORIES,
      page,
      limit,
      total: filtered.length,
      items,
      mocked: true,
    });
  }
}
