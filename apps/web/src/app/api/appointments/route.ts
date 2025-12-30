import { NextRequest, NextResponse } from "next/server";
import { db } from "@my-better-t-app/db";
import { appointments } from "@my-better-t-app/db/schema";
import { eq, desc } from "drizzle-orm";
import { sql } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const allAppointments = await db
      .select()
      .from(appointments)
      .orderBy(sql`appointments.date DESC`);
    return NextResponse.json(allAppointments);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Creating appointment:", body);
    
    const insertData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      vehicle: body.vehicle,
      service: body.service,
      employeeId: body.employeeId,
      date: new Date(body.date),
      notes: body.notes,
    };
    
    const newAppointment = await db.insert(appointments).values(insertData);
    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ error: "Failed to create appointment", details: String(error) }, { status: 500 });
  }
}
