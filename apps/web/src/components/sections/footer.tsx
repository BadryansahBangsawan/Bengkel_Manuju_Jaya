import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-10 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <p className="text-muted-foreground text-sm md:text-base mb-4">
          © {new Date().getFullYear()} Bengkel Mobil Manuju Jaya. Semua
          Masalah Mobil, Satu Tempat.
        </p>
        <Link
          href="/admin/login"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Admin Login
        </Link>
      </div>
    </footer>
  );
}
