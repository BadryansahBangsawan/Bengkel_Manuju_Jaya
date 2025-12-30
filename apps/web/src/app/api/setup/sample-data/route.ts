import { NextResponse } from "next/server";
import { db } from "@my-better-t-app/db";
import { employees } from "@my-better-t-app/db/schema";

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    await db.insert(employees).values([
      {
        name: "Ahmad Fauzi",
        position: "Kepala Mekanik",
        photo: "/uploads/default-avatar.png",
        email: "ahmad@manujujaya.com",
        phone: "081234567890",
        bio: "Mekanik profesional dengan pengalaman 15 tahun di bidang perbaikan mesin mobil. Spesialis dalam perbaikan mesin Toyota dan Honda.",
        active: true,
        order: 1,
      },
      {
        name: "Budi Santoso",
        position: "Mekanik Senior",
        photo: "/uploads/default-avatar.png",
        email: "budi@manujujaya.com",
        phone: "081234567891",
        bio: "Ahli dalam sistem rem, suspensi, dan servis rutin. Telah menangani ratusan kendaraan dengan hasil yang memuaskan.",
        active: true,
        order: 2,
      },
      {
        name: "Doni Pratama",
        position: "Mekanik AC & Kelistrikan",
        photo: "/uploads/default-avatar.png",
        email: "doni@manujujaya.com",
        phone: "081234567892",
        bio: "Berspesialisasi dalam perbaikan sistem AC mobil dan masalah kelistrikan. Tersertifikasi untuk berbagai merek kendaraan.",
        active: true,
        order: 3,
      },
    ]);

    return NextResponse.json({ 
      success: true, 
      message: "3 sample employees inserted successfully" 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message,
      details: error.stack 
    }, { status: 500 });
  }
}
