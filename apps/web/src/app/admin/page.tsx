import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle, Clock, MessageSquare, Wrench, Users as UserIcon, Users } from "lucide-react";
import { db } from "@my-better-t-app/db";
import { services, employees, appointments, contactMessages, users } from "@my-better-t-app/db/schema";
import { sql } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [servicesCount, employeesCount, appointmentsCount, messagesCount, usersCount] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(services),
    db.select({ count: sql<number>`count(*)` }).from(employees),
    db.select({ count: sql<number>`count(*)` }).from(appointments),
    db.select({ count: sql<number>`count(*)` }).from(contactMessages),
    db.select({ count: sql<number>`count(*)` }).from(users),
  ]);

  const [recentAppointments, recentMessages] = await Promise.all([
    db.select().from(appointments).orderBy(sql`appointments.date DESC`).limit(5),
    db.select().from(contactMessages).orderBy(sql`contact_messages.created_at DESC`).limit(5),
  ]);

  const stats = [
    {
      title: "Janji Temu",
      value: appointmentsCount[0]?.count?.toString() || "0",
      icon: Calendar,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Layanan",
      value: servicesCount[0]?.count?.toString() || "0",
      icon: Wrench,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Karyawan",
      value: employeesCount[0]?.count?.toString() || "0",
      icon: UserIcon,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Pesan",
      value: messagesCount[0]?.count?.toString() || "0",
      icon: MessageSquare,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Pengguna",
      value: usersCount[0]?.count?.toString() || "0",
      icon: Users,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
  ];

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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Janji Temu Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.map((appointment: any) => (
                <div key={appointment.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{appointment.name}</p>
                    <p className="text-sm text-muted-foreground">{appointment.vehicle} - {appointment.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{new Date(appointment.date).toLocaleDateString("id-ID")}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      statusColors[appointment.status as keyof typeof statusColors]
                    }`}>
                      {statusLabels[appointment.status as keyof typeof statusLabels]}
                    </span>
                  </div>
                </div>
              ))}
              {recentAppointments.length === 0 && (
                <p className="text-muted-foreground text-center py-4">Belum ada janji temu</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pesan Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((message: any) => (
                <div key={message.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${message.read ? "bg-muted-foreground/30" : "bg-blue-500"}`} />
                    <div>
                      <p className="font-medium">{message.name}</p>
                      <p className="text-sm text-muted-foreground">{message.subject}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{new Date(message.createdAt).toLocaleDateString("id-ID")}</p>
                </div>
              ))}
              {recentMessages.length === 0 && (
                <p className="text-muted-foreground text-center py-4">Belum ada pesan</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
