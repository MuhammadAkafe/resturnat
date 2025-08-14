import { Product } from '@prisma/client';
import React, { useCallback, useEffect, useState } from 'react'

interface UseFetchProps {
    products: Product[];
    loading: boolean;
    error: string | null;
    editingId: number | null;
    editForm: Partial<Product>;
    handleDelete: (id: number) => Promise<void>;
    fetchProducts: () => Promise<void>;
    handleEdit: (product: Product) => void;
    handleSave: () => Promise<void>;
    handleCancel: () => void;
    handleInputChange: (field: keyof Product, value: string | number) => void;
    isBase64Image: (src: string) => boolean;
}

function useFetch(): UseFetchProps {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Partial<Product>>({});
  
    const fetchProducts = useCallback(async () => {
      try {
        setLoading(true);
        setError(null);
  
        const response = await fetch("/api/uploads", {
          method: "GET",
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchProducts();
    }, [fetchProducts]);
  
    const handleDelete = async (id: number) => {
      if (!confirm("Are you sure you want to delete this menu item?")) {
        return;
      }
  
      try {
        const response = await fetch(`/api/uploads/${id}`, {
          method: "DELETE",
        });
  
        if (!response.ok) {
          throw new Error("Failed to delete item");
        }
  
        setProducts(products.filter((product) => product.id !== id));
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Failed to delete menu item");
      }
    };
  
    const handleEdit = (product: Product) => {
      setEditingId(product.id);
      setEditForm(product);
    };
  
    const handleSave = async () => {
      if (!editingId) return;
  
      try {
        const response = await fetch(`/api/uploads/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update item");
        }
  
        const updatedProduct = await response.json();
        setProducts(
          products.map((product) =>
            product.id === editingId ? updatedProduct : product
          )
        );
        setEditingId(null);
        setEditForm({});
      } catch (err) {
        console.error("Error updating product:", err);
        alert("Failed to update menu item");
      }
    };
  
    const handleCancel = () => {
      setEditingId(null);
      setEditForm({});
    };
  
    const handleInputChange = (field: keyof Product, value: string | number) => {
      setEditForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    };
  
    // Check if image is a base64 data URL
    const isBase64Image = (src: string) => {
      return src.startsWith("data:image");
    };

    return {
        products,
        loading,
        error,
        handleDelete,
        fetchProducts,
        handleEdit,
        handleSave,
        handleCancel,
        handleInputChange,
        isBase64Image,
        editingId,
        editForm,
    }
}

export default useFetch