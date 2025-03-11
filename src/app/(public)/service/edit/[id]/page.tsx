"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getServices, updateService } from "@/lib/api";
import BackButton from "@/components/go-back";
import { Button } from "@/components/ui/button";

export default function EditService() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>(); // Ép kiểu id thành string
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<string>(""); // URL ảnh hiện tại
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    getServices()
      .then((data) => {
        console.log("Dữ liệu nhận được:", data);
        const service = data.find((item:any) => item.id === Number(id));

        if (service) {
          setTitle(service.title || "");
          setImage(service.image || ""); // Kiểm tra ảnh có tồn tại
          setContent(service.content || "");
          setDescription(service.description || "");
        } else {
          setError("Không tìm thấy dịch vụ.");
        }
      })
      .catch((err) => {
        console.error("Lỗi khi tải dữ liệu:", err);
        setError("Không thể tải dữ liệu.");
      });
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("description", description);

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const response = await fetch(`http://localhost:5000/services/${id}`, {
        method: "PATCH",
        body: formData,
      });

      const data = await response.json();
      console.log("Response cập nhật:", data);

      if (!response.ok) {
        throw new Error(data.message || "Lỗi khi cập nhật");
      }

      router.push("/service");
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      setError("Có lỗi xảy ra khi cập nhật.");
    } finally {
      setLoading(false);
    }
  };

  if (!title && !content && !image && !description) {
    return <p className="text-center">Đang tải dữ liệu...</p>;
  }

  return (
    <div>
      <BackButton text="Quay lại" link="/" />
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-xl font-bold mb-4 text-center">Chỉnh Sửa Dịch Vụ</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            placeholder="Tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          {/* Input chọn file ảnh */}
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="w-full p-2 border border-gray-300 rounded"
          />

          {/* Hiển thị ảnh nếu có */}
          {image && <img src={image} alt="Preview" className="w-full h-40 object-cover rounded" />}

          <textarea
            placeholder="Nội dung"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          <textarea
            placeholder="Mô tả"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </Button>
        </form>
      </div>
    </div>
  );
}
