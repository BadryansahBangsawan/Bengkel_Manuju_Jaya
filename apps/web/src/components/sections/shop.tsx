import { Card } from "@/components/ui/card";

export default function Shop() {
  const products = [
    "Oli Mesin & Oli Transmisi",
    "Aki Mobil",
    "Filter Oli / Udara / Solar",
    "Kampas Rem",
    "Busi",
    "Lampu & Kelistrikan",
    "Alat-alat mobil fast moving",
  ];

  return (
    <section id="spare-part" className="py-16 md:py-32 animate-on-scroll">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-2xl font-bold text-center md:text-4xl">
          Produk
        </h2>
        <p className="mb-10 text-center text-muted-foreground font-medium">
          Lihat produk dan spare part lengkap kami
        </p>
        <div className="max-w-2xl mx-auto text-center">
          <a
            href="https://qasir.biz/manujujaya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-transparent bg-primary px-8 py-6 text-lg font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-primary/80 min-h-[4rem]"
          >
            Lihat Katalog Produk
          </a>
          <p className="mt-6 text-base md:text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Beli part → langsung pasang → garansi kerja
          </p>
        </div>
      </div>
    </section>
  );
}
