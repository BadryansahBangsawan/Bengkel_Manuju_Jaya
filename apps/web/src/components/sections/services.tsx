import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Services() {
  const services = [
    "Scan Check Engine & Diagnosa Sistem",
    "Servis Mesin Bensin & Diesel",
    "Kelistrikan Mobil (starter, alternator, wiring)",
    "Sistem Rem (kampas, master, kaliper, bleeding)",
    "Kaki-kaki & Suspensi",
    "AC Mobil (freon, flushing, kompresor)",
    "Kopling & Transmisi",
    "Servis Berkala (oli, filter, tune up)",
    "Perbaikan Darurat",
  ];

  return (
    <section id="layanan" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30 animate-on-scroll">
      <div className="container mx-auto px-4">
        <h2 className="mb-[1.25rem] text-3xl font-bold text-center md:text-4xl">
          Layanan Bengkel
        </h2>
        <p className="mb-12 text-center text-muted-foreground font-medium">
          Service All Problem
        </p>
        <div className="grid gap-[1.25rem] md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service} className="transition-all duration-300 hover:scale-105 hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-base">{service}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
