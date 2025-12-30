"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Loader2, Upload, User } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function EmployeesAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/employees");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      toast.error("Gagal memuat karyawan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = () => {
    setEditingItem({ id: null, name: "", position: "", photo: "", email: "", phone: "", bio: "", active: true, order: 0 });
    setImagePreview("");
    setFile(null);
    setIsEditing(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setImagePreview(item.photo);
    setFile(null);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus karyawan ini?")) return;
    
    try {
      const response = await fetch(`/api/employees/${id}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Karyawan berhasil dihapus");
        fetchItems();
      } else {
        toast.error("Gagal menghapus karyawan");
      }
    } catch (error) {
      toast.error("Gagal menghapus karyawan");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Pilih file foto terlebih dahulu");
      return null;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success("Foto berhasil diupload");
        return data.url;
      } else {
        toast.error("Gagal mengupload foto");
        return null;
      }
    } catch (error) {
      toast.error("Gagal mengupload foto");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let imageUrl = editingItem.photo;
    
    if (file) {
      const uploadedUrl = await handleUpload();
      if (!uploadedUrl) return;
      imageUrl = uploadedUrl;
    } else if (!editingItem.photo && !file) {
      toast.error("Upload foto terlebih dahulu");
      return;
    }

    setSaving(true);
    
    try {
      const url = editingItem.id ? `/api/employees/${editingItem.id}` : "/api/employees";
      const method = editingItem.id ? "PUT" : "POST";
      
      const payload = editingItem.id ? {
        name: editingItem.name,
        position: editingItem.position,
        photo: imageUrl,
        email: editingItem.email,
        phone: editingItem.phone,
        bio: editingItem.bio,
        active: editingItem.active,
        order: editingItem.order,
      } : { ...editingItem, photo: imageUrl };
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(`Karyawan berhasil ${editingItem.id ? "diperbarui" : "ditambahkan"}`);
        setIsEditing(false);
        setEditingItem(null);
        setFile(null);
        setImagePreview("");
        fetchItems();
      } else {
        toast.error("Gagal menyimpan karyawan");
      }
    } catch (error) {
      toast.error("Gagal menyimpan karyawan");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{editingItem.id ? "Edit Karyawan" : "Tambah Karyawan"}</h1>
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama</Label>
                <Input
                  id="name"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Jabatan</Label>
                <Input
                  id="position"
                  value={editingItem.position}
                  onChange={(e) => setEditingItem({ ...editingItem, position: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editingItem.email}
                  onChange={(e) => setEditingItem({ ...editingItem, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telepon</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={editingItem.phone}
                  onChange={(e) => setEditingItem({ ...editingItem, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  value={editingItem.bio}
                  onChange={(e) => setEditingItem({ ...editingItem, bio: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="photo">Foto</Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {imagePreview && (
                  <div className="relative aspect-square w-full max-w-md border rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Urutan</Label>
                <Input
                  id="order"
                  type="number"
                  value={editingItem.order}
                  onChange={(e) => setEditingItem({ ...editingItem, order: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={saving || uploading}>
                  {uploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Mengupload...
                    </>
                  ) : saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan"
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => {
                  setIsEditing(false);
                  setEditingItem(null);
                  setFile(null);
                  setImagePreview("");
                }}>
                  Batal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Karyawan</h1>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Karyawan
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item: any) => (
          <Card key={item.id}>
            <div className="relative aspect-square w-full">
              {item.photo ? (
                <Image
                  src={item.photo}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-muted">
                  <User className="h-24 w-24 text-muted-foreground/50" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-5">
                <h3 className="font-semibold mb-1 text-lg text-white">{item.name}</h3>
                <p className="text-sm text-white/90">{item.position}</p>
              </div>
            </div>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.bio}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
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
