export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-primary/20 via-primary/10 to-background py-20 md:py-32 animate-on-scroll">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-6 text-3xl font-bold leading-tight md:text-6xl">
          BENGKEL MOBIL MANUJU JAYA
        </h1>
        <p className="mb-10 text-lg text-muted-foreground md:text-2xl font-medium">
          Service All Problem • Toko Alat & Spare Part Mobil
        </p>
        <div className="mb-10 grid gap-3 md:grid-cols-4 md:gap-5">
          <div className="rounded-lg bg-card p-4 md:p-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
            <h3 className="font-semibold text-sm md:text-base">Mesin & Scan ECU</h3>
          </div>
          <div className="rounded-lg bg-card p-4 md:p-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
            <h3 className="font-semibold text-sm md:text-base">Kelistrikan & AC</h3>
          </div>
          <div className="rounded-lg bg-card p-4 md:p-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
            <h3 className="font-semibold text-sm md:text-base">Rem & Kaki-kaki</h3>
          </div>
          <div className="rounded-lg bg-card p-4 md:p-5 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md">
            <h3 className="font-semibold text-sm md:text-base">Kopling & Transmisi</h3>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href="https://wa.me/6281234567890?text=Halo%20Bengkel%20Manuju%20Jaya.%0AMobil%3A%20%0ATahun%3A%20%0AKeluhan%3A%20%0ALokasi%3A%20"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-transparent bg-primary px-6 py-4 text-base font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-primary/80 min-h-[3rem]"
          >
            WhatsApp Sekarang
          </a>
          <a
            href="tel:+6281234567890"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-border bg-background px-6 py-4 text-base font-medium hover:bg-muted hover:text-foreground min-h-[3rem] transition-all duration-300 hover:scale-105 hover:shadow-md"
          >
            Telepon Bengkel
          </a>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-border bg-background px-6 py-4 text-base font-medium hover:bg-muted hover:text-foreground min-h-[3rem] transition-all duration-300 hover:scale-105 hover:shadow-md"
          >
            Petunjuk Arah
          </a>
          <a
            href="https://qasir.biz/manujujaya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-border bg-background px-6 py-4 text-base font-medium hover:bg-muted hover:text-foreground min-h-[3rem] transition-all duration-300 hover:scale-105 hover:shadow-md"
          >
            Produk
          </a>
        </div>
      </div>
    </section>
  );
}
