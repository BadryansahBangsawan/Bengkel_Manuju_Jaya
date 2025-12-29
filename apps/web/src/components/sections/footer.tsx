export default function Footer() {
  return (
    <footer className="border-t py-20">
      <div className="container mx-auto px-4 text-center">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Bengkel Mobil Manuju Jaya. Semua
          Masalah Mobil, Satu Tempat.
        </p>
      </div>
    </footer>
  );
}
