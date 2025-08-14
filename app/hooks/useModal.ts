import React, { useState } from "react";

interface FormDataType {
  title: string;
  description: string;
  category: string;
  url: string; // This will hold the uploaded image URL or base64 string
  price: string;
  file?: File | null; // Store the actual file
}

interface UseModalReturn {
  isModalOpen: boolean;
  formData: FormDataType;
  handleSubmit: (e: React.FormEvent) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  setIsModalOpen: (value: boolean) => void;
  imagePreview: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setImagePreview: (value: string | null) => void;
  resetForm: () => void;
  isModalLoading: boolean;
}

function useModal(): UseModalReturn {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    description: "",
    category: "",
    url: "",
    price: "",
    file: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      url: "",
      price: "",
      file: null,
    });
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Local preview
      setImagePreview(URL.createObjectURL(file));

      // Save file + name in formData
      setFormData((prev) => ({
        ...prev,
        file: file,
        url: file.name, // or keep a real uploaded URL later
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalLoading(true);
    const Form_Data = new FormData();
    Form_Data.append("title", formData.title);
    Form_Data.append("description", formData.description);
    Form_Data.append("category", formData.category);
    Form_Data.append("price", formData.price);

    // Append file if exists
    if (formData.file) {
      Form_Data.append("image", formData.file);
    }

    try {
      const response = await fetch("/api/uploads", {
        method: "POST",
        body: Form_Data,
      });
      
      const data = await response.json();
      
      if (response.ok) {
        resetForm();
        setIsModalOpen(false);
      }
       else {
        console.error("Failed to submit form:", data.message);
      }

    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsModalLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    isModalOpen,
    formData,
    handleSubmit,
    handleInputChange,
    setIsModalOpen,
    imagePreview,
    handleImageChange,
    setImagePreview,
    resetForm,
    isModalLoading,
  };
}

export default useModal;
