"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Loader2, User } from "lucide-react";
import Image from "next/image";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Tim Karyawan Kami</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Kenali tim profesional kami yang siap membantu Anda dengan segala kebutuhan perbaikan kendaraan Anda
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {employees.map((employee) => (
            <Card key={employee.id} className="overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-md bg-gradient-to-br from-card to-muted/10">
              <div className="relative aspect-square w-full">
                {employee.photo ? (
                  <Image
                    src={employee.photo}
                    alt={employee.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-muted">
                    <User className="h-24 w-24 text-muted-foreground/50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-5">
                  <h3 className="font-semibold mb-1 text-lg text-white">{employee.name}</h3>
                  <p className="text-sm text-white/90">{employee.position}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground line-clamp-3">{employee.bio}</p>
              </div>
            </Card>
          ))}
          {employees.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              Belum ada data karyawan
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
