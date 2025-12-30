import { NextRequest, NextResponse } from "next/server";
import { db } from "@my-better-t-app/db";
import { contactMessages } from "@my-better-t-app/db/schema";
import { sql } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const allMessages = await db.select().from(contactMessages).orderBy(sql`contact_messages.created_at DESC`);
    return NextResponse.json(allMessages);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newMessage = await db.insert(contactMessages).values(body);
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create message" }, { status: 500 });
  }
}
