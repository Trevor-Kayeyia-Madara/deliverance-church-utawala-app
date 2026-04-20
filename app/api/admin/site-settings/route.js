import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth.server";
import { SITE as DEFAULT_SITE } from "@/lib/siteConfig";

const SettingsSchema = z.object({
  siteName: z.string().min(2).max(160),
  shortName: z.string().min(2).max(60),
  tagline: z.string().min(2).max(160),
  location: z.string().min(2).max(200),
  addressLine1: z.string().max(200).optional().or(z.literal("")),
  addressLine2: z.string().max(200).optional().or(z.literal("")),
  phoneDisplay: z.string().max(40).optional().or(z.literal("")),
  phoneTel: z.string().max(40).optional().or(z.literal("")),
  email: z.string().email().max(200).optional().or(z.literal("")),
  youtubeUrl: z.string().url().max(500).optional().or(z.literal("")),
  facebookUrl: z.string().url().max(500).optional().or(z.literal("")),
  instagramUrl: z.string().url().max(500).optional().or(z.literal("")),
  liveEmbedUrl: z.string().url().max(500).optional().or(z.literal("")),
});

function normalizeRow(row) {
  if (!row) {
    return {
      siteName: DEFAULT_SITE.name,
      shortName: DEFAULT_SITE.shortName,
      tagline: DEFAULT_SITE.tagline,
      location: DEFAULT_SITE.location,
      addressLine1: DEFAULT_SITE.contact.addressLine1,
      addressLine2: DEFAULT_SITE.contact.addressLine2,
      phoneDisplay: DEFAULT_SITE.contact.phoneDisplay,
      phoneTel: DEFAULT_SITE.contact.phoneTel,
      email: DEFAULT_SITE.contact.email,
      youtubeUrl: DEFAULT_SITE.social.youtube,
      facebookUrl: DEFAULT_SITE.social.facebook,
      instagramUrl: DEFAULT_SITE.social.instagram,
      liveEmbedUrl: DEFAULT_SITE.liveEmbedUrl || "",
    };
  }

  return {
    siteName: row.siteName,
    shortName: row.shortName,
    tagline: row.tagline,
    location: row.location,
    addressLine1: row.addressLine1 || "",
    addressLine2: row.addressLine2 || "",
    phoneDisplay: row.phoneDisplay || "",
    phoneTel: row.phoneTel || "",
    email: row.email || "",
    youtubeUrl: row.youtubeUrl || "",
    facebookUrl: row.facebookUrl || "",
    instagramUrl: row.instagramUrl || "",
    liveEmbedUrl: row.liveEmbedUrl || "",
  };
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const row = await prisma.siteSettings.findFirst({ orderBy: { id: "asc" } });
    return NextResponse.json({ ok: true, settings: normalizeRow(row) });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Database error" },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await request.json().catch(() => null);
  const parsed = SettingsSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  try {
    const existing = await prisma.siteSettings.findFirst({ orderBy: { id: "asc" } });
    const saved = existing
      ? await prisma.siteSettings.update({
          where: { id: existing.id },
          data: {
            siteName: data.siteName,
            shortName: data.shortName,
            tagline: data.tagline,
            location: data.location,
            addressLine1: data.addressLine1 || null,
            addressLine2: data.addressLine2 || null,
            phoneDisplay: data.phoneDisplay || null,
            phoneTel: data.phoneTel || null,
            email: data.email || null,
            youtubeUrl: data.youtubeUrl || null,
            facebookUrl: data.facebookUrl || null,
            instagramUrl: data.instagramUrl || null,
            liveEmbedUrl: data.liveEmbedUrl || null,
          },
        })
      : await prisma.siteSettings.create({
          data: {
            siteName: data.siteName,
            shortName: data.shortName,
            tagline: data.tagline,
            location: data.location,
            addressLine1: data.addressLine1 || null,
            addressLine2: data.addressLine2 || null,
            phoneDisplay: data.phoneDisplay || null,
            phoneTel: data.phoneTel || null,
            email: data.email || null,
            youtubeUrl: data.youtubeUrl || null,
            facebookUrl: data.facebookUrl || null,
            instagramUrl: data.instagramUrl || null,
            liveEmbedUrl: data.liveEmbedUrl || null,
          },
        });

    return NextResponse.json({ ok: true, settings: normalizeRow(saved) });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Database error" },
      { status: 500 },
    );
  }
}

