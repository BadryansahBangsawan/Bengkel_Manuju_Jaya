import { NextResponse } from "next/server";
import { db } from "@my-better-t-app/db";

export const dynamic = 'force-dynamic';

export async function GET() {
  const sqls = [
    `DROP TABLE IF EXISTS appointments`,
    `CREATE TABLE appointments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      vehicle VARCHAR(255) NOT NULL,
      service VARCHAR(255) NOT NULL,
      employee_id INT,
      date TIMESTAMP NOT NULL,
      notes TEXT,
      status VARCHAR(50) NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
  ];

  const results = [];

  try {
    for (const sql of sqls) {
      await db.execute(sql);
      results.push({ sql: sql.substring(0, 50) + "...", status: 'success' });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Appointments table recreated successfully",
      results 
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message,
      details: error.stack,
      results
    }, { status: 500 });
  }
}
