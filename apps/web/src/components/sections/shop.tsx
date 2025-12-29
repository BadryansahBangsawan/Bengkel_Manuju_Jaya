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
    <section id="spare-part" className="py-20 md:py-32 animate-on-scroll">
      <div className="container mx-auto px-4">
        <h2 className="mb-[1.25rem] text-3xl font-bold text-center md:text-4xl">
          Toko Alat & Spare Part
        </h2>
        <p className="mb-12 text-center text-muted-foreground font-medium">
          Tersedia langsung di bengkel
        </p>
        <div className="mb-12 grid gap-[1.25rem] md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Card key={product} className="transition-all duration-300 hover:scale-105 hover:shadow-md">
              <div className="flex items-center justify-center py-[1.5625rem] px-5">
                <p className="font-medium text-center">{product}</p>
              </div>
            </Card>
          ))}
        </div>
        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <div className="py-[1.5625rem] px-5 text-center">
            <p className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Beli part → langsung pasang → garansi kerja
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
