"use client";

import { useState } from "react";
import { postService } from "@/lib/api";
import { useRouter } from "next/navigation";
import BackButton from "@/components/go-back";

export default function CreateService() {
    const [title, setTitle] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]); // Lưu danh sách URL xem trước
    const [content1, setContent] = useState("");
    const [description1, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content1", content1);
        formData.append("description1", description1);

        images.forEach((file) => {
            formData.append(`image`, file); // Gửi từng ảnh vào form
        });

        try {
            const response = await postService(formData);
            if (response?.error) {
                setError("Lỗi: " + response.error);
            } else {
                router.push("/services");
            }
        } catch (err) {
            setError("Có lỗi xảy ra khi gửi dữ liệu.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setImages(filesArray); // Lưu danh sách file ảnh

            // Tạo danh sách URL xem trước
            const previewUrls = filesArray.map((file) => URL.createObjectURL(file));
            setPreviewImages(previewUrls);
        }
    };

    return (
        <div>
            <BackButton text="Back" link="/services" />
            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-xl font-bold mb-4 text-center">Thêm Dịch Vụ Mới</h1>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Tiêu đề"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />

                    <p className="block text-gray-700">Vui Lòng Chọn 2 Ảnh</p>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />

                    {previewImages.length > 0 && (
                        <div className="mt-4">
                            <p className="text-sm mb-2">Xem trước:</p>
                            <div className="grid grid-cols-2 gap-2">
                                {previewImages.map((src, index) => (
                                    <img
                                        key={index}
                                        src={src}
                                        alt={`Xem trước ${index + 1}`}
                                        className="object-cover w-full h-32 border rounded"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <textarea
                        placeholder="Nội dung"
                        value={content1}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <textarea
                        placeholder="Mô tả"
                        value={description1}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                    >
                        {loading ? "Đang thêm..." : "Thêm ảnh"}
                    </button>
                </form>
            </div>
        </div>
    );
}
