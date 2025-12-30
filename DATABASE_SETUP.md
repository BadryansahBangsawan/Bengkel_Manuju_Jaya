# Database Setup Guide

## Langkah 1: Setup Database

### Option A - Recreate Appointments Table (Quick Fix)
Buka URL ini untuk membuat ulang tabel appointments dengan schema yang benar:
```
http://localhost:3001/api/setup/recreate-appointments
```

### Option B - Create All Tables (Fresh Start)
Buka URL ini untuk membuat semua tabel dari awal:
```
http://localhost:3001/api/setup/direct
```

### Option C - Create All Tables with Drizzle
Buka URL ini untuk membuat tabel menggunakan Drizzle:
```
http://localhost:3001/api/setup/tables
```

## Langkah 2: Restart Server

Setelah setup tabel, restart server:
```bash
# Tekan Ctrl+C untuk stop
# Lalu jalankan lagi:
bun run dev
```

## Langkah 3: Setup Data (Opsional)

Untuk menambahkan 3 karyawan contoh:
```
http://localhost:3001/api/setup/sample-data
```

## Langkah 4: Coba Booking

1. Buka halaman `/appointments`
2. Di form booking, Anda akan melihat dropdown "Pilih Mekanik"
3. Pilih mekanik yang diinginkan
4. Isi form lain dan submit

## Langkah 5: Cek Admin

1. Buka `/admin` untuk melihat dashboard
2. Buka `/admin/appointments` untuk melihat booking dengan mekanik yang dipilih

## Struktur Tabel

### appointments
- id (Primary Key)
- name
- email
- phone
- vehicle
- service
- employee_id (FK ke employees) - **BARU**
- date
- notes
- status (pending/confirmed/completed/cancelled)
- created_at
- updated_at

### employees
- id (Primary Key)
- name
- position
- photo
- email
- phone
- bio
- active
- order
- created_at
- updated_at

## Troubleshooting

### Error "Table 'appointments' doesn't exist"
- Jalankan salah satu setup URL di atas
- Restart server

### Error LIMIT parameter
- Sudah diperbaiki dengan query yang lebih eksplisit
- Gunakan nama tabel di ORDER BY clause

### Production (Vercel)
1. Set environment variable `DATABASE_URL` di Vercel dashboard
2. Jalankan setup URL setelah deployment:
   ```
   https://domain-anda.vercel.app/api/setup/direct
   ```
