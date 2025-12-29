import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Gallery() {
  const workItems = [
    { title: "Servis Mesin", description: "Overhaul mesin Toyota Avanza", image: "https://images.unsplash.com/photo-1632823471565-1ecdf5c6da63?w=800&h=450&fit=crop" },
    { title: "Ganti Kampas Rem", description: "Perbaikan sistem rem Honda Jazz", image: "https://images.unsplash.com/photo-1632823471600-6670b5400156?w=800&h=450&fit=crop" },
    { title: "Servis AC Mobil", description: "Isi freon dan perbaikan kompresor", image: "https://images.unsplash.com/photo-1632823471698-88f647561536?w=800&h=450&fit=crop" },
    { title: "Kaki-kaki", description: "Penggantian shockbreaker dan linkage", image: "https://images.unsplash.com/photo-1632823471803-3870555d0121?w=800&h=450&fit=crop" },
    { title: "Scan ECU", description: "Diagnosa dan reset sistem komputer", image: "https://images.unsplash.com/photo-1632823471851-055238725059?w=800&h=450&fit=crop" },
    { title: "Ganti Aki", description: "Pemasangan aki baru dan cek kelistrikan", image: "https://images.unsplash.com/photo-1632823472062-7c77b1f6020a?w=800&h=450&fit=crop" },
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
              <div className="aspect-video bg-muted/50 relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
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
