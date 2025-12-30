import { NextRequest, NextResponse } from "next/server";
import { db } from "@my-better-t-app/db";
import { employees } from "@my-better-t-app/db/schema";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const allEmployees = await db.select().from(employees).orderBy(employees.order);
    return NextResponse.json(allEmployees);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newEmployee = await db.insert(employees).values(body);
    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create employee" }, { status: 500 });
  }
}
