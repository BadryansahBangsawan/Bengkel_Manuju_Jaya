import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Gallery() {
  const workItems = [
    { title: "Servis Mesin", description: "Overhaul mesin Toyota Avanza", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=800&fit=crop" },
    { title: "Ganti Kampas Rem", description: "Perbaikan sistem rem Honda Jazz", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=800&fit=crop" },
    { title: "Servis AC Mobil", description: "Isi freon dan perbaikan kompresor", image: "https://images.unsplash.com/photo-1617886903315-55c369387b0a?w=800&h=800&fit=crop" },
    { title: "Kaki-kaki", description: "Penggantian shockbreaker dan linkage", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=800&fit=crop" },
    { title: "Scan ECU", description: "Diagnosa dan reset sistem komputer", image: "https://images.unsplash.com/photo-1504222490345-c075b6008014?w=800&h=800&fit=crop" },
    { title: "Ganti Aki", description: "Pemasangan aki baru dan cek kelistrikan", image: "https://images.unsplash.com/photo-1623826870242-238005886858?w=800&h=800&fit=crop" },
  ];

  return (
    <section id="galeri" className="py-16 md:py-32 bg-gradient-to-b from-background to-muted/20 animate-on-scroll">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-2xl font-bold text-center md:text-4xl">
          Galeri Pekerjaan
        </h2>
        <p className="mb-10 text-center text-muted-foreground font-medium">
          Beberapa hasil pekerjaan kami
        </p>
        <div className="grid gap-4 md:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {workItems.map((item) => (
            <Card key={item.title} className="overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-md bg-gradient-to-br from-card to-muted/10 p-0">
              <div className="relative aspect-square w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5">
                  <h3 className="font-semibold mb-1 text-base md:text-lg text-white">{item.title}</h3>
                  <p className="text-sm text-white/80">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
