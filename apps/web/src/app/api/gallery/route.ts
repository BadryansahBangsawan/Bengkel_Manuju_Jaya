import { NextRequest, NextResponse } from "next/server";
import { db } from "@my-better-t-app/db";
import { gallery } from "@my-better-t-app/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allGallery = await db.select().from(gallery).orderBy(gallery.order);
    return NextResponse.json(allGallery);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newItem = await db.insert(gallery).values(body);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 });
  }
}
