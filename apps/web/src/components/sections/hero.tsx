export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-primary/20 via-primary/10 to-background py-20 md:py-32 animate-on-scroll">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          BENGKEL MOBIL MANUJU JAYA
        </h1>
        <p className="mb-8 text-xl text-muted-foreground md:text-2xl font-medium">
          Service All Problem • Toko Alat & Spare Part Mobil
        </p>
        <div className="mb-8 grid gap-4 md:grid-cols-5 md:gap-5">
          <div className="rounded-[0.3125rem] bg-card p-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
            <h3 className="font-semibold">Mesin & Scan ECU</h3>
          </div>
          <div className="rounded-[0.3125rem] bg-card p-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
            <h3 className="font-semibold">Kelistrikan & AC</h3>
          </div>
          <div className="rounded-[0.3125rem] bg-card p-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
            <h3 className="font-semibold">Rem & Kaki-kaki</h3>
          </div>
          <div className="rounded-[0.3125rem] bg-card p-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
            <h3 className="font-semibold">Kopling & Transmisi</h3>
          </div>
          <div className="rounded-[0.3125rem] bg-card p-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
            <h3 className="font-semibold">Servis Berkala</h3>
          </div>
        </div>
        <div className="flex flex-col gap-[1.25rem] sm:flex-row sm:justify-center">
          <a
            href="https://wa.me/6281234567890?text=Halo%20Bengkel%20Manuju%20Jaya.%0AMobil%3A%20%0ATahun%3A%20%0AKeluhan%3A%20%0ALokasi%3A%20"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[0.3125rem] border border-transparent bg-primary px-[0.9375rem] py-4 text-sm font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-md hover:bg-primary/80 h-10"
          >
            WhatsApp Sekarang
          </a>
          <a
            href="tel:+6281234567890"
            className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[0.3125rem] border border-border bg-background px-[0.9375rem] py-4 text-sm font-medium hover:bg-muted hover:text-foreground h-10 transition-all duration-300 hover:scale-105 hover:shadow-md"
          >
            Telepon Bengkel
          </a>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[0.3125rem] border border-border bg-background px-[0.9375rem] py-4 text-sm font-medium hover:bg-muted hover:text-foreground h-10 transition-all duration-300 hover:scale-105 hover:shadow-md"
          >
            Petunjuk Arah
          </a>
        </div>
      </div>
    </section>
  );
}
