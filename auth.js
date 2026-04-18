import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { NextResponse } from "next/server";

function parseAllowedEmails() {
  const raw = process.env.AUTH_ALLOWED_EMAILS || "";
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

const hasGoogle = !!(
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
);

// Export names expected by Auth.js v5 examples: handlers + auth.
// When OAuth isn't configured yet, we return predictable 500s (and null sessions)
// instead of crashing builds/dev.
export let handlers;
export let auth;
export let signIn;
export let signOut;

if (hasGoogle) {
  ({ handlers, auth, signIn, signOut } = NextAuth({
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
      async signIn({ user }) {
        const allowed = parseAllowedEmails();
        if (!allowed.length) return true;
        const email = String(user?.email || "").toLowerCase();
        return allowed.includes(email);
      },
    },
  }));
} else {
  auth = async () => null;
  handlers = {
    GET: async () =>
      NextResponse.json(
        {
          error:
            "Auth not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.",
        },
        { status: 500 },
      ),
    POST: async () =>
      NextResponse.json(
        {
          error:
            "Auth not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.",
        },
        { status: 500 },
      ),
  };
  signIn = async () => {
    throw new Error("Auth not configured");
  };
  signOut = async () => {
    throw new Error("Auth not configured");
  };
}

export const AUTH_CONFIGURED = hasGoogle;

