"use client";
import Link from "next/link";

export default function Header() {
  const links = [
    { to: "/", label: "Beranda" },
    { to: "#layanan", label: "Layanan Bengkel" },
    { to: "#spare-part", label: "Toko Spare Part" },
    { to: "#galeri", label: "Galeri Pekerjaan" },
    { to: "#kontak", label: "Kontak" },
  ] as const;

  return (
    <div className="border-b bg-background">
      <div className="container mx-auto flex flex-row items-center justify-between px-5 py-[0.9375rem]">
        <Link href="/" className="text-xl font-bold">
          Manuju Jaya
        </Link>
        <nav className="hidden md:flex gap-[1.875rem] text-sm">
          {links.map(({ to, label }) => {
            return (
              <Link key={to} href={to} className="hover:text-primary transition-colors">
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="md:hidden container mx-auto flex gap-5 px-5 pb-[0.9375rem] text-sm">
        {links.map(({ to, label }) => {
          return (
            <Link key={to} href={to} className="hover:text-primary transition-colors">
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
