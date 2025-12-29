import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function About() {
  return (
    <section className="py-20 md:py-32 animate-on-scroll">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Tentang Kami</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Manuju Jaya adalah bengkel mobil umum yang melayani semua
              masalah kendaraan, didukung toko alat dan spare part mobil
              langsung di lokasi. Diagnosa jelas, estimasi transparan, pengerjaan
              terukur.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
