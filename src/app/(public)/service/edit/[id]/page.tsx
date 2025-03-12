"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getServices, updateService } from "@/lib/api";
import BackButton from "@/components/go-back";
import { Button } from "@/components/ui/button";

export default function EditService() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [images, setImages] = useState<string[]>([]); // Mảng URL ảnh hiện tại
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    getServices()
      .then((data) => {
        console.log("Dữ liệu nhận được:", data);
        const service = data.find((item: any) => item.id === Number(id));

        if (service) {
          setTitle(service.title || "");
          // Xử lý trường hợp image là mảng hoặc là chuỗi
          if (Array.isArray(service.image)) {
            setImages(service.image);
          } else if (typeof service.image === 'string') {
            setImages([service.image]);
          } else {
            setImages([]);
          }
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

  // Tạo preview URL cho các file mới được chọn
  useEffect(() => {
    // Xóa các URL cũ trước
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    
    const newPreviewUrls = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(newPreviewUrls);
    
    // Dọn dẹp URL khi component unmounts hoặc files thay đổi
    return () => {
      newPreviewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [selectedFiles]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const fileArray = Array.from(files);
    setSelectedFiles(fileArray);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleRemovePreview = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    
    const newPreviewUrls = [...previewUrls];
    newPreviewUrls.splice(index, 1);
    setPreviewUrls(newPreviewUrls);
    
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("description", description);
      
      // Thêm danh sách ảnh hiện tại dưới dạng chuỗi JSON
      formData.append("currentImages", JSON.stringify(images));

      // Thêm từng file ảnh mới với tên trường "image"
      selectedFiles.forEach((file) => {
        formData.append("image", file);
      });

      console.log("Form data being sent:", Object.fromEntries(formData.entries()));

      const response = await fetch(`http://localhost:5000/services/${id}`, {
        method: "PATCH",
        body: formData,
      });

      const data = await response.json();
      console.log("Response cập nhật:", data);

      if (!response.ok) {
        throw new Error(data.message || "Lỗi khi cập nhật");
      }

      router.push("/services");
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      setError("Có lỗi xảy ra khi cập nhật.");
    } finally {
      setLoading(false);
    }
  };

  if (!title && !content && images.length === 0 && !description) {
    return <p className="text-center">Đang tải dữ liệu...</p>;
  }

  return (
    <div>
      <BackButton text="Quay lại" link="/services" />
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

          {/* Input chọn file ảnh mới */}
          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <p className="text-sm text-gray-500">Chọn ảnh mới để thêm vào dịch vụ</p>
          </div>

          {/* Hiển thị ảnh mới đã chọn */}
          {previewUrls.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Ảnh mới:</p>
              <div className="grid grid-cols-2 gap-2">
                {previewUrls.map((url, index) => (
                  <div key={`preview-${index}`} className="relative">
                    <img
                      src={url}
                      alt={`Xem trước ${index + 1}`}
                      className="w-full h-40 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePreview(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hiển thị ảnh hiện tại */}
          {images.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Ảnh hiện tại:</p>
              <div className="grid grid-cols-2 gap-2">
                {images.map((img, index) => (
                  <div key={`current-${index}`} className="relative">
                    <img
                      src={img}
                      alt={`Ảnh hiện tại ${index + 1}`}
                      className="w-full h-40 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
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