import { NextResponse } from "next/server";
import { db } from "@my-better-t-app/db";

export const dynamic = 'force-dynamic';

export async function GET() {
  const tablesSQL = [
    `DROP TABLE IF EXISTS contact_messages`,
    `DROP TABLE IF EXISTS appointments`,
    `DROP TABLE IF EXISTS employees`,
    `DROP TABLE IF EXISTS gallery`,
    `DROP TABLE IF EXISTS services`,
    `DROP TABLE IF EXISTS users`,
    `CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'admin',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE services (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      icon VARCHAR(255) NOT NULL,
      price VARCHAR(100),
      active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE gallery (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      image VARCHAR(500) NOT NULL,
      active BOOLEAN NOT NULL DEFAULT TRUE,
      \`order\` INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE employees (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      position VARCHAR(255) NOT NULL,
      photo VARCHAR(500) NOT NULL,
      email VARCHAR(255),
      phone VARCHAR(50),
      bio TEXT NOT NULL,
      active BOOLEAN NOT NULL DEFAULT TRUE,
      \`order\` INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`,
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
    `CREATE TABLE contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      subject VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      \`read\` BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`,
  ];

  try {
    for (const sql of tablesSQL) {
      await db.execute(sql);
    }

    return NextResponse.json({ 
      success: true, 
      message: "All tables created successfully",
      tables: ['users', 'services', 'gallery', 'employees', 'appointments', 'contact_messages']
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message,
      details: error.stack 
    }, { status: 500 });
  }
}
