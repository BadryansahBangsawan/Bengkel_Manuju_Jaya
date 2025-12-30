"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Mail, Phone, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/messages");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      toast.error("Gagal memuat pesan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id: number) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });

      if (response.ok) {
        toast.success("Pesan ditandai sebagai dibaca");
        fetchMessages();
      } else {
        toast.error("Gagal menandai pesan");
      }
    } catch (error) {
      toast.error("Gagal menandai pesan");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus pesan ini?")) return;
    
    try {
      const response = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Pesan berhasil dihapus");
        fetchMessages();
      } else {
        toast.error("Gagal menghapus pesan");
      }
    } catch (error) {
      toast.error("Gagal menghapus pesan");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await Promise.all(
        messages.filter((m: any) => !m.read).map((m: any) =>
          fetch(`/api/messages/${m.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ read: true }),
          })
        )
      );
      toast.success("Semua pesan ditandai sebagai dibaca");
      fetchMessages();
    } catch (error) {
      toast.error("Gagal menandai semua pesan");
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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pesan</h1>
        <Button variant="outline" onClick={handleMarkAllAsRead}>
          Tandai Semua Dibaca
        </Button>
      </div>

      <div className="space-y-4">
        {messages.map((message: any) => (
          <Card key={message.id} className={!message.read ? "border-primary" : ""}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {!message.read && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                    <h3 className="text-lg font-semibold">{message.name}</h3>
                    <span className="text-sm text-muted-foreground">
                      {new Date(message.createdAt).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="mb-3">
                    <p className="font-medium text-primary">{message.subject}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-muted-foreground">{message.message}</p>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {message.email}
                    </div>
                    {message.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {message.phone}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {!message.read && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleMarkAsRead(message.id)}
                    >
                      Tandai Dibaca
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(message.id)}
                  >
                    <Trash2 className="h-4 w-4" />
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
