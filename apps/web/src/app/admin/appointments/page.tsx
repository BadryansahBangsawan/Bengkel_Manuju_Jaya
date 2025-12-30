"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export default function AppointmentsAdmin() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/appointments");
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      toast.error("Gagal memuat janji temu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const statusLabels = {
    pending: "Pending",
    confirmed: "Dikonfirmasi",
    completed: "Selesai",
    cancelled: "Dibatalkan",
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const handleStatusChange = async (id: number, status: AppointmentStatus) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast.success(`Status berhasil diperbarui menjadi ${statusLabels[status]}`);
        fetchAppointments();
      } else {
        toast.error("Gagal memperbarui status");
      }
    } catch (error) {
      toast.error("Gagal memperbarui status");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus janji temu ini?")) return;
    
    try {
      const response = await fetch(`/api/appointments/${id}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Janji temu berhasil dihapus");
        fetchAppointments();
      } else {
        toast.error("Gagal menghapus janji temu");
      }
    } catch (error) {
      toast.error("Gagal menghapus janji temu");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Janji Temu</h1>

      <div className="space-y-4">
        {appointments.map((appointment: any) => (
          <Card key={appointment.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-lg font-semibold">{appointment.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[appointment.status as keyof typeof statusColors]}`}>
                      {statusLabels[appointment.status as keyof typeof statusLabels]}
                    </span>
                  </div>
                  <div className="grid gap-2 text-sm text-muted-foreground">
                    <p><strong>Email:</strong> {appointment.email}</p>
                    <p><strong>Telepon:</strong> {appointment.phone}</p>
                    <p><strong>Kendaraan:</strong> {appointment.vehicle}</p>
                    <p><strong>Layanan:</strong> {appointment.service}</p>
                    <p><strong>Tanggal:</strong> {new Date(appointment.date).toLocaleString("id-ID")}</p>
                    {appointment.notes && <p><strong>Catatan:</strong> {appointment.notes}</p>}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleStatusChange(appointment.id, "confirmed")}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Konfirmasi
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleStatusChange(appointment.id, "completed")}>
                    <Check className="h-4 w-4 mr-2" />
                    Selesai
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleStatusChange(appointment.id, "cancelled")}>
                    <XCircle className="h-4 w-4 mr-2" />
                    Batalkan
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(appointment.id)}>
                    Hapus
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
