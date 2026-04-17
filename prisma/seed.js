/* eslint-disable no-console */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function youtubeId(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
    return null;
  } catch {
    return null;
  }
}

function youtubeThumb(url) {
  const id = youtubeId(url);
  if (!id) return null;
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

async function main() {
  const categories = [
    "Faith",
    "Prayer",
    "Family",
    "Worship",
    "Leadership",
    "Discipleship",
  ];

  const categoryRows = await Promise.all(
    categories.map((name) =>
      prisma.category.upsert({
        where: { slug: slugify(name) },
        update: { name },
        create: { name, slug: slugify(name) },
      }),
    ),
  );

  const sermons = [
    {
      title: "Growing Strong in Faith",
      speaker: "Ps. Emmanuel Kokonyo",
      date: "2026-03-23T07:00:00.000Z",
      durationMinutes: 47,
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      category: "Faith",
      description:
        "A practical message on strengthening your walk with God in every season.",
    },
    {
      title: "The Power of Prayer",
      speaker: "Ps. Lucy Kokonyo",
      date: "2026-03-16T07:00:00.000Z",
      durationMinutes: 39,
      videoUrl: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
      category: "Prayer",
      description: "How prayer aligns our hearts with heaven’s agenda.",
    },
    {
      title: "Worship as a Lifestyle",
      speaker: "Guest Minister",
      date: "2026-03-09T07:00:00.000Z",
      durationMinutes: 52,
      videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
      category: "Worship",
      description: "Worship beyond Sunday: living surrendered every day.",
    },
  ];

  for (const sermon of sermons) {
    const category = categoryRows.find((c) => c.slug === slugify(sermon.category));
    const thumb = sermon.videoUrl ? youtubeThumb(sermon.videoUrl) : null;
    const slug = `${slugify(sermon.title)}-${new Date(sermon.date)
      .toISOString()
      .slice(0, 10)}`;

    await prisma.sermon.upsert({
      where: { slug },
      update: {
        title: sermon.title,
        speaker: sermon.speaker,
        date: new Date(sermon.date),
        durationMinutes: sermon.durationMinutes,
        videoUrl: sermon.videoUrl,
        thumbnailUrl: thumb,
        description: sermon.description,
        categoryId: category ? category.id : null,
      },
      create: {
        slug,
        title: sermon.title,
        speaker: sermon.speaker,
        date: new Date(sermon.date),
        durationMinutes: sermon.durationMinutes,
        videoUrl: sermon.videoUrl,
        thumbnailUrl: thumb,
        description: sermon.description,
        categoryId: category ? category.id : null,
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
