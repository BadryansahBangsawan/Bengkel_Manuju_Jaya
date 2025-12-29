import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Contact() {
  return (
    <section id="kontak" className="py-20 md:py-32 bg-gradient-to-b from-muted/30 to-primary/5 animate-on-scroll">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-3xl font-bold text-center md:text-4xl">
          Hubungi Kami
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-all duration-300 hover:scale-105 hover:shadow-md bg-gradient-to-br from-card to-muted/10">
            <CardHeader>
              <CardTitle>Nama</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Bengkel Mobil Manuju Jaya</p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:scale-105 hover:shadow-md">
            <CardHeader>
              <CardTitle>Alamat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">[Isi alamat lengkap]</p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:scale-105 hover:shadow-md">
            <CardHeader>
              <CardTitle>Jam Buka</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">[Isi jam operasional]</p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:scale-105 hover:shadow-md">
            <CardHeader>
              <CardTitle>WhatsApp</CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-1 whitespace-nowrap rounded-[0.3125rem] border border-border bg-background px-[0.9375rem] py-2 text-sm font-medium hover:bg-muted hover:text-foreground h-10 transition-all"
              >
                +62 812-3456-7890
              </a>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:scale-105 hover:shadow-md">
            <CardHeader>
              <CardTitle>Telepon</CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href="tel:+6281234567890"
                className="flex w-full items-center justify-center gap-1 whitespace-nowrap rounded-[0.3125rem] border border-border bg-background px-[0.9375rem] py-2 text-sm font-medium hover:bg-muted hover:text-foreground h-10 transition-all"
              >
                +62 812-3456-7890
              </a>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:scale-105 hover:shadow-md">
            <CardHeader>
              <CardTitle>Format Pesan WhatsApp</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line">
                Halo Bengkel Manuju Jaya.
                Mobil: …
                Tahun: …
                Keluhan: …
                Lokasi: …
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
