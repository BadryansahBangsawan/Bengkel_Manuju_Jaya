"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-32 bg-gradient-to-b from-background to-muted/30 animate-on-scroll">
        <div className="container mx-auto px-4 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section id="layanan" className="py-16 md:py-32 bg-gradient-to-b from-background to-muted/30 animate-on-scroll">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-2xl font-bold text-center md:text-4xl">
          Layanan Bengkel
        </h2>
        <p className="mb-10 text-center text-muted-foreground font-medium">
          Service All Problem
        </p>
        <div className="grid gap-4 md:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className="transition-all duration-300 hover:scale-105 hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">{service.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
          {services.length === 0 && (
            <p className="text-muted-foreground text-center col-span-full">Belum ada layanan</p>
          )}
        </div>
      </div>
    </section>
  );
}
