"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function GalleryAdmin() {
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
      const response = await fetch("/api/gallery");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      toast.error("Gagal memuat galeri");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = () => {
    setEditingItem({ id: null, title: "", description: "", image: "", active: true, order: 0 });
    setImagePreview("");
    setFile(null);
    setIsEditing(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setImagePreview(item.image);
    setFile(null);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus item galeri ini?")) return;
    
    try {
      const response = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Galeri berhasil dihapus");
        fetchItems();
      } else {
        toast.error("Gagal menghapus galeri");
      }
    } catch (error) {
      toast.error("Gagal menghapus galeri");
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
      toast.error("Pilih file gambar terlebih dahulu");
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
        toast.success("Gambar berhasil diupload");
        return data.url;
      } else {
        toast.error("Gagal mengupload gambar");
        return null;
      }
    } catch (error) {
      toast.error("Gagal mengupload gambar");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let imageUrl = editingItem.image;
    
    if (file) {
      const uploadedUrl = await handleUpload();
      if (!uploadedUrl) return;
      imageUrl = uploadedUrl;
    } else if (!editingItem.image && !file) {
      toast.error("Upload gambar terlebih dahulu");
      return;
    }

    setSaving(true);
    
    try {
      const url = editingItem.id ? `/api/gallery/${editingItem.id}` : "/api/gallery";
      const method = editingItem.id ? "PUT" : "POST";
      
      const payload = editingItem.id ? {
        title: editingItem.title,
        description: editingItem.description,
        image: imageUrl,
        active: editingItem.active,
        order: editingItem.order,
      } : { ...editingItem, image: imageUrl };
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(`Galeri berhasil ${editingItem.id ? "diperbarui" : "ditambahkan"}`);
        setIsEditing(false);
        setEditingItem(null);
        setFile(null);
        setImagePreview("");
        fetchItems();
      } else {
        toast.error("Gagal menyimpan galeri");
      }
    } catch (error) {
      toast.error("Gagal menyimpan galeri");
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
        <h1 className="text-3xl font-bold">{editingItem.id ? "Edit Galeri" : "Tambah Galeri"}</h1>
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul</Label>
                <Input
                  id="title"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Input
                  id="description"
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Gambar</Label>
                <Input
                  id="image"
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
        <h1 className="text-3xl font-bold">Galeri</h1>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Galeri
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item: any) => (
          <Card key={item.id}>
            <div className="relative aspect-square w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
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
