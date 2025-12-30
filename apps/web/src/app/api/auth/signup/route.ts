import { NextRequest, NextResponse } from "next/server";
import { db } from "@my-better-t-app/db";
import { users } from "@my-better-t-app/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nama, email, dan password harus diisi" },
        { status: 400 }
      );
    }

    const existingUsers = await db.select().from(users).where(eq(users.email, email));

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role: role || "admin",
    });

    return NextResponse.json({
      success: true,
      user: {
        email,
        name,
        role: role || "admin",
      },
    }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat signup" },
      { status: 500 }
    );
  }
}
