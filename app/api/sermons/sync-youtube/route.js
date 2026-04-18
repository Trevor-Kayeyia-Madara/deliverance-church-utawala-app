import { NextResponse } from "next/server";
import { syncYouTubeSermons } from "@/lib/sermonSync";
import { auth } from "@/auth";

function parseAllowedEmails() {
  const raw = process.env.AUTH_ALLOWED_EMAILS || "";
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export async function POST(request) {
  const session = await auth().catch(() => null);
  const allowed = parseAllowedEmails();
  const email = String(session?.user?.email || "").toLowerCase();
  const isAllowedUser = !!session?.user && (!allowed.length || allowed.includes(email));

  if (!isAllowedUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  const playlistId = process.env.YOUTUBE_PLAYLIST_ID;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const max = Number.parseInt(process.env.YOUTUBE_MAX_RESULTS || "50", 10) || 50;

  try {
    const result = await syncYouTubeSermons({ apiKey, playlistId, channelId, max });
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Sync failed" },
      { status: 400 },
    );
  }
}
