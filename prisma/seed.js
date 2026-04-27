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
  const siteDefaults = {
    siteName: "Deliverance Church Utawala",
    shortName: "DC Utawala",
    tagline: "The Church of Choice",
    location: "Utawala, Nairobi, Kenya",
    addressLine1: "Utawala, Nairobi, Kenya",
    addressLine2: "Utawala Road",
    phoneDisplay: "+254 700 000 000",
    phoneTel: "+254700000000",
    email: "info@dcutawala.org",
    youtubeUrl: "https://www.youtube.com",
    facebookUrl: "https://www.facebook.com",
    instagramUrl: "https://www.instagram.com",
    liveEmbedUrl: null,
  };

  const existingSettings = await prisma.siteSettings.findFirst();
  if (existingSettings) {
    await prisma.siteSettings.update({
      where: { id: existingSettings.id },
      data: siteDefaults,
    });
  } else {
    await prisma.siteSettings.create({ data: siteDefaults });
  }

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

  function nextDow(dow) {
    const today = new Date();
    const next = new Date(today);
    next.setHours(10, 0, 0, 0);
    const diff = (dow + 7 - next.getDay()) % 7 || 7;
    next.setDate(next.getDate() + diff);
    return next;
  }

  const upcomingEvents = [
    { title: "Sunday Service", startAt: nextDow(0), meta: "Sun â€¢ 10:00 AM" },
    {
      title: "Midweek Service",
      startAt: (() => {
        const d = nextDow(3);
        d.setHours(18, 0, 0, 0);
        return d;
      })(),
      meta: "Wed â€¢ 6:00 PM",
    },
    {
      title: "Prayer & Worship",
      startAt: (() => {
        const d = nextDow(5);
        d.setHours(18, 0, 0, 0);
        return d;
      })(),
      meta: "Fri â€¢ 6:00 PM",
    },
  ];

  for (const event of upcomingEvents) {
    const slug = `${slugify(event.title)}-${event.startAt
      .toISOString()
      .slice(0, 10)}`;
    await prisma.event.upsert({
      where: { slug },
      update: {
        title: event.title,
        startAt: event.startAt,
        description: `Auto-seeded: ${event.meta}`,
        isPublished: true,
      },
      create: {
        slug,
        title: event.title,
        startAt: event.startAt,
        description: `Auto-seeded: ${event.meta}`,
        isPublished: true,
      },
    });
  }

  const pastors = [
    {
      name: "Ps. Emmanuel Kokonyo",
      roleTitle: "Senior Pastor",
      sortOrder: 1,
      isPublished: true,
    },
    {
      name: "Ps. Lucy Kokonyo",
      roleTitle: "Associate Pastor",
      sortOrder: 2,
      isPublished: true,
    },
  ];

  for (const pastor of pastors) {
    const slug = slugify(pastor.name);
    await prisma.pastor.upsert({
      where: { slug },
      update: { ...pastor, slug },
      create: { ...pastor, slug },
    });
  }

  const ministries = [
    {
      slug: "worship",
      title: "Worship Ministry",
      description: "Serve God with your gifts through worship and excellence.",
      highlights: ["Choir", "Band", "Media support"],
      sortOrder: 1,
      isPublished: true,
    },
    {
      slug: "house-of-prophets",
      title: "House of Prophets",
      description: "A discipleship space for spiritual growth and direction.",
      highlights: ["Teaching", "Mentorship", "Prayer"],
      sortOrder: 2,
      isPublished: true,
    },
    {
      slug: "daughters-of-faith",
      title: "Daughters of Faith",
      description: "Womenâ€™s fellowship for connection and strengthening.",
      highlights: ["Bible study", "Community", "Support"],
      sortOrder: 3,
      isPublished: true,
    },
    {
      slug: "young-adults",
      title: "Young Adults",
      description: "A community for young people to grow and serve together.",
      highlights: ["Fellowship", "Purpose", "Discipleship"],
      sortOrder: 4,
      isPublished: true,
    },
    {
      slug: "sunday-school",
      title: "Sunday School",
      description: "A safe, joyful space for children to grow in faith.",
      highlights: ["Bible stories", "Worship", "Care & safety"],
      sortOrder: 5,
      isPublished: true,
    },
    {
      slug: "media-team",
      title: "Media Team",
      description: "Serve behind the scenes to support worship and outreach.",
      highlights: ["Sound", "Video", "Design"],
      sortOrder: 6,
      isPublished: true,
    },
  ];

  try {
    for (const ministry of ministries) {
      await prisma.ministry.upsert({
        where: { slug: ministry.slug },
        update: {
          title: ministry.title,
          description: ministry.description,
          highlights: ministry.highlights,
          sortOrder: ministry.sortOrder,
          isPublished: ministry.isPublished,
        },
        create: {
          slug: ministry.slug,
          title: ministry.title,
          description: ministry.description,
          highlights: ministry.highlights,
          sortOrder: ministry.sortOrder,
          isPublished: ministry.isPublished,
        },
      });
    }
  } catch (err) {
    console.warn("Skipping ministries seed:", err?.message || err);
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
