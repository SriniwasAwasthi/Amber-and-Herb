import { NextResponse } from "next/server";
import { db } from "@/db";
import { inquiries } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      plan?: string;
      message?: string;
    };

    const name = body.name?.trim();
    const email = body.email?.trim();
    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "A valid name and email are required." },
        { status: 400 },
      );
    }

    if (db) {
      try {
        await db.insert(inquiries).values({
          name,
          email,
          phone: body.phone?.trim() || null,
          plan: body.plan?.trim() || null,
          message: body.message?.trim() || null,
        });
      } catch (err) {
        console.warn("DB insert inquiry failed, logging inquiry fallback:", err, { name, email });
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our end. Try again in a minute." },
      { status: 500 },
    );
  }
}

