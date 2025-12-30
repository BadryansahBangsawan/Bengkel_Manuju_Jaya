import { NextRequest, NextResponse } from "next/server";
import { db } from "@my-better-t-app/db";
import { services } from "@my-better-t-app/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const allServices = await db.select().from(services);
    return NextResponse.json(allServices);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newService = await db.insert(services).values(body);
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
