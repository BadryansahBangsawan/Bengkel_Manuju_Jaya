import { NextRequest, NextResponse } from "next/server";
import { db } from "@my-better-t-app/db";
import { appointments } from "@my-better-t-app/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const allAppointments = await db.select().from(appointments).orderBy(desc(appointments.date));
    return NextResponse.json(allAppointments);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newAppointment = await db.insert(appointments).values(body);
    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
  }
}
