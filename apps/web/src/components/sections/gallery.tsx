"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Gallery() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = async () => {
    try {
      const response = await fetch("/api/gallery");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-32 bg-gradient-to-b from-background to-muted/20 animate-on-scroll">
        <div className="container mx-auto px-4 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </section>
    );
  }

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
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-md bg-gradient-to-br from-card to-muted/10 p-0">
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
          {items.length === 0 && (
            <p className="text-muted-foreground text-center col-span-full">Belum ada galeri</p>
          )}
        </div>
      </div>
    </section>
  );
}
