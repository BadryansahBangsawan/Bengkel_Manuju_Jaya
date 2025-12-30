import { Card } from "@/components/ui/card";
import { LayoutDashboard, Users, Users as UserIcon, Calendar, MessageSquare, Wrench, LogOut } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/appointments", icon: Calendar, label: "Janji Temu" },
    { href: "/admin/services", icon: Wrench, label: "Layanan" },
    { href: "/admin/employees", icon: UserIcon, label: "Karyawan" },
    { href: "/admin/messages", icon: MessageSquare, label: "Pesan" },
    { href: "/admin/users", icon: Users, label: "Pengguna" },
  ];

  return (
    <div className="min-h-screen bg-muted/20">
      <nav className="border-b bg-background">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={"/admin" as any} className="text-xl font-bold">
            Admin Panel
          </Link>
          <div className="flex gap-2">
            <Link
              href={"/" as any}
              target="_blank"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Lihat Website
            </Link>
            <form action={async () => {
              "use server";
              redirect("/admin/login" as any);
            }}>
              <button
                type="submit"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <aside className="w-64 shrink-0">
            <Card className="p-4">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href as any}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </Card>
          </aside>

          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
