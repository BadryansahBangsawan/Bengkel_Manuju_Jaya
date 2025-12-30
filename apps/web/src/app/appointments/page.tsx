"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Calendar, CheckCircle, User } from "lucide-react";
import { toast } from "sonner";

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    service: "",
    employeeId: "",
    date: "",
    notes: "",
  });
  const [employees, setEmployees] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/employees");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          vehicle: formData.vehicle,
          service: formData.service,
          employeeId: formData.employeeId ? parseInt(formData.employeeId) : null,
          date: formData.date,
          notes: formData.notes,
        }),
      });

      if (response.ok) {
        toast.success("Janji temu berhasil dibuat!");
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          vehicle: "",
          service: "",
          employeeId: "",
          date: "",
          notes: "",
        });
      } else {
        toast.error("Gagal membuat janji temu. Silakan coba lagi.");
      }
    } catch (error) {
      toast.error("Gagal membuat janji temu. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-12 pb-12 text-center">
            <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
            <h1 className="text-2xl font-bold mb-2">Janji Temu Berhasil!</h1>
            <p className="text-muted-foreground mb-6">
              Terima kasih! Janji temu Anda telah berhasil dibuat. Kami akan menghubungi Anda segera.
            </p>
            <Button onClick={() => setSubmitted(false)}>
              Buat Janji Temu Lain
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calendar className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Booking Janji Temu</h1>
            </div>
            <p className="text-muted-foreground">
              Isi form di bawah ini untuk membuat janji temu servis
            </p>
          </div>

          <Card className="bg-gradient-to-br from-card to-muted/10">
            <CardHeader>
              <CardTitle>Formulir Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
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
                    <Label htmlFor="phone">Telepon</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
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
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="vehicle">Kendaraan</Label>
                    <Input
                      id="vehicle"
                      placeholder="Contoh: Toyota Avanza 2020"
                      value={formData.vehicle}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Tanggal & Waktu</Label>
                    <Input
                      id="date"
                      type="datetime-local"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="service">Layanan</Label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      required
                    >
                      <option value="">Pilih Layanan</option>
                      <option value="Servis Rutin">Servis Rutin</option>
                      <option value="Ganti Oli">Ganti Oli</option>
                      <option value="Servis AC">Servis AC</option>
                      <option value="Kaki-kaki">Kaki-kaki</option>
                      <option value="Sistem Rem">Sistem Rem</option>
                      <option value="Diagnosa Sistem">Diagnosa Sistem</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Pilih Mekanik (Opsional)</Label>
                    <select
                      id="employeeId"
                      value={formData.employeeId}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="">-- Pilih mekanik --</option>
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.id.toString()}>
                          {employee.name} - {employee.position}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Catatan Tambahan</Label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    placeholder="Jelaskan keluhan atau pertanyaan Anda..."
                  />
                </div>
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    "Buat Janji Temu"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {employees.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Tim Kami
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {employees.slice(0, 4).map((employee) => (
                    <div
                      key={employee.id}
                      className="flex items-center gap-4 p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                      onClick={() => setFormData({ ...formData, employeeId: employee.id.toString() })}
                    >
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-muted">
                        {employee.photo ? (
                          <img
                            src={employee.photo}
                            alt={employee.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <User className="h-6 w-6 text-muted-foreground/50" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.position}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
