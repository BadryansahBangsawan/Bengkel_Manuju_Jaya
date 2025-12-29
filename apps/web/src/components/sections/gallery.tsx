import { Card } from "@/components/ui/card";

export default function Gallery() {
  const workItems = [
    { title: "Servis Mesin", description: "Overhaul mesin Toyota Avanza" },
    { title: "Ganti Kampas Rem", description: "Perbaikan sistem rem Honda Jazz" },
    { title: "Servis AC Mobil", description: "Isi freon dan perbaikan kompresor" },
    { title: "Kaki-kaki", description: "Penggantian shockbreaker dan linkage" },
    { title: "Scan ECU", description: "Diagnosa dan reset sistem komputer" },
    { title: "Ganti Aki", description: "Pemasangan aki baru dan cek kelistrikan" },
  ];

  return (
    <section id="galeri" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20 animate-on-scroll">
      <div className="container mx-auto px-4">
        <h2 className="mb-[1.25rem] text-3xl font-bold text-center md:text-4xl">
          Galeri Pekerjaan
        </h2>
        <p className="mb-12 text-center text-muted-foreground font-medium">
          Beberapa hasil pekerjaan kami
        </p>
        <div className="grid gap-[1.25rem] md:grid-cols-2 lg:grid-cols-3">
          {workItems.map((item) => (
            <Card key={item.title} className="overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-md bg-gradient-to-br from-card to-muted/10">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <span className="text-6xl">🔧</span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
