import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";

const DonationSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200).optional().or(z.literal("")),
  phone: z.string().min(7).max(30).optional().or(z.literal("")),
  amount: z.number().positive(),
  currency: z.string().min(3).max(3).optional(),
  method: z.string().max(30).optional().or(z.literal("")),
  note: z.string().max(500).optional().or(z.literal("")),
});

export async function POST(request) {
  const json = await request.json().catch(() => null);
  const parsed = DonationSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  try {
    await prisma.donation.create({
      data: {
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
        amount: data.amount,
        currency: data.currency || "KES",
        method: data.method || null,
        note: data.note || null,
      },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true, mocked: true });
  }
}

