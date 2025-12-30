"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Pesan berhasil dikirim!");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast.error("Gagal mengirim pesan. Silakan coba lagi.");
      }
    } catch (error) {
      toast.error("Gagal mengirim pesan. Silakan coba lagi.");
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <section id="kontak" className="py-16 md:py-32 bg-gradient-to-b from-muted/30 to-primary/5 animate-on-scroll">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-2xl font-bold text-center md:text-4xl">
          Hubungi Kami
        </h2>
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-md bg-gradient-to-br from-card to-muted/10">
              <CardHeader>
                <CardTitle>Nama</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Bengkel Mobil Manuju Jaya</p>
              </CardContent>
            </Card>
            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-md bg-gradient-to-br from-card to-muted/10">
              <CardHeader>
                <CardTitle>Alamat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm md:text-base">
                  Jl. Mariadei No.55, Serui Kota, Kec. Yapen Sel., Kabupaten Kepulauan Yapen, Papua 98215
                </p>
              </CardContent>
            </Card>
            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-md bg-gradient-to-br from-card to-muted/10">
              <CardHeader>
                <CardTitle>Jam Buka</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Senin - Sabtu: 08:00 - 17:00</p>
              </CardContent>
            </Card>
            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-md bg-gradient-to-br from-card to-muted/10">
              <CardHeader>
                <CardTitle>WhatsApp</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="https://wa.me/6282199055555"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-border bg-background px-6 py-3 text-sm md:text-base font-medium hover:bg-muted hover:text-foreground min-h-[3rem] transition-all"
                >
                  +62 821-9905-5555
                </a>
              </CardContent>
            </Card>
            <Card className="transition-all duration-300 hover:scale-105 hover:shadow-md bg-gradient-to-br from-card to-muted/10">
              <CardHeader>
                <CardTitle>Telepon</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="tel:+6282199055555"
                  className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-border bg-background px-6 py-3 text-sm md:text-base font-medium hover:bg-muted hover:text-foreground min-h-[3rem] transition-all"
                >
                  +62 821-9905-5555
                </a>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-card to-muted/10">
            <CardHeader>
              <CardTitle>Kirim Pesan</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telepon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subjek</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Pesan</Label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={sending}>
                  {sending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Kirim Pesan
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
