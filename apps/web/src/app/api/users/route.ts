import { NextRequest, NextResponse } from "next/server";
import { db } from "@my-better-t-app/db";
import { users } from "@my-better-t-app/db/schema";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const allUsers = await db.select().from(users);
    return NextResponse.json(allUsers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newUser = await db.insert(users).values(body);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
