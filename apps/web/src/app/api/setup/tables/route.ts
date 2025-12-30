import { NextResponse } from "next/server";
import { db } from "@my-better-t-app/db";

export const dynamic = 'force-dynamic';

export async function GET() {
  const results: any[] = [];

  try {
    const tables = [
      {
        name: 'users',
        sql: `
          CREATE TABLE IF NOT EXISTS \`users\` (
            \`id\` int AUTO_INCREMENT NOT NULL,
            \`email\` varchar(255) NOT NULL UNIQUE,
            \`name\` varchar(255) NOT NULL,
            \`password\` varchar(255) NOT NULL,
            \`role\` varchar(50) NOT NULL DEFAULT 'admin',
            \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (\`id\`)
          )
        `
      },
      {
        name: 'services',
        sql: `
          CREATE TABLE IF NOT EXISTS \`services\` (
            \`id\` int AUTO_INCREMENT NOT NULL,
            \`title\` varchar(255) NOT NULL,
            \`description\` text NOT NULL,
            \`icon\` varchar(255) NOT NULL,
            \`price\` varchar(100),
            \`active\` boolean NOT NULL DEFAULT true,
            \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (\`id\`)
          )
        `
      },
      {
        name: 'gallery',
        sql: `
          CREATE TABLE IF NOT EXISTS \`gallery\` (
            \`id\` int AUTO_INCREMENT NOT NULL,
            \`title\` varchar(255) NOT NULL,
            \`description\` text NOT NULL,
            \`image\` varchar(500) NOT NULL,
            \`active\` boolean NOT NULL DEFAULT true,
            \`order\` int NOT NULL DEFAULT 0,
            \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (\`id\`)
          )
        `
      },
      {
        name: 'employees',
        sql: `
          CREATE TABLE IF NOT EXISTS \`employees\` (
            \`id\` int AUTO_INCREMENT NOT NULL,
            \`name\` varchar(255) NOT NULL,
            \`position\` varchar(255) NOT NULL,
            \`photo\` varchar(500) NOT NULL,
            \`email\` varchar(255),
            \`phone\` varchar(50),
            \`bio\` text NOT NULL,
            \`active\` boolean NOT NULL DEFAULT true,
            \`order\` int NOT NULL DEFAULT 0,
            \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (\`id\`)
          )
        `
      },
      {
        name: 'appointments',
        sql: `
          CREATE TABLE IF NOT EXISTS \`appointments\` (
            \`id\` int AUTO_INCREMENT NOT NULL,
            \`name\` varchar(255) NOT NULL,
            \`email\` varchar(255) NOT NULL,
            \`phone\` varchar(50) NOT NULL,
            \`vehicle\` varchar(255) NOT NULL,
            \`service\` varchar(255) NOT NULL,
            \`employee_id\` int,
            \`date\` timestamp NOT NULL,
            \`notes\` text,
            \`status\` varchar(50) NOT NULL DEFAULT 'pending',
            \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (\`id\`)
          )
        `
      },
      {
        name: 'contact_messages',
        sql: `
          CREATE TABLE IF NOT EXISTS \`contact_messages\` (
            \`id\` int AUTO_INCREMENT NOT NULL,
            \`name\` varchar(255) NOT NULL,
            \`email\` varchar(255) NOT NULL,
            \`phone\` varchar(50),
            \`subject\` varchar(255) NOT NULL,
            \`message\` text NOT NULL,
            \`read\` boolean NOT NULL DEFAULT false,
            \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (\`id\`)
          )
        `
      }
    ];

    for (const table of tables) {
      try {
        await db.execute(table.sql);
        results.push({ table: table.name, status: 'success' });
      } catch (error: any) {
        results.push({ table: table.name, status: 'error', message: error.message });
      }
    }

    return NextResponse.json({ 
      success: true, 
      results,
      message: "Database setup completed. Check results for details."
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message, 
      stack: error.stack,
      results
    }, { status: 500 });
  }
}
