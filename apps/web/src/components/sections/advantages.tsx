import { Card } from "@/components/ui/card";

export default function Advantages() {
  const advantages = [
    "Service semua masalah mobil",
    "Bengkel + toko dalam satu lokasi",
    "Mekanik spesialis",
    "Alat lengkap",
    "Estimasi sebelum kerja",
    "Pengerjaan rapi & terdokumentasi",
  ];

  return (
    <section className="py-20 md:py-32 animate-on-scroll">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-3xl font-bold text-center md:text-4xl">
          Keunggulan Manuju Jaya
        </h2>
        <div className="grid gap-[1.25rem] md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage) => (
            <Card key={advantage} className="transition-all duration-300 hover:scale-105 hover:shadow-md bg-gradient-to-br from-card to-muted/10">
              <div className="flex items-center gap-[0.9375rem] py-[1.5625rem] px-5">
                <div className="flex h-[2.5rem] w-[2.5rem] shrink-0 items-center justify-center rounded-[0.5rem] bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md">
                  ✓
                </div>
                <p className="font-medium">{advantage}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
