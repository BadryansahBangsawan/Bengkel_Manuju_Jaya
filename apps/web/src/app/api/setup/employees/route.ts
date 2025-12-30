import { db } from "@my-better-t-app/db";
import { employees } from "@my-better-t-app/db/schema";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    await db.insert(employees).values({
      name: "Karyawan 1",
      position: "Mekanik Utama",
      photo: "/uploads/default-avatar.png",
      bio: "Mekanik berpengalaman dengan 10 tahun pengalaman di bidang perbaikan mesin mobil.",
      order: 1,
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
