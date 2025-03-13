"use client";

import { useState } from "react";
import { postBlog } from "@/lib/api";
import { useRouter } from "next/navigation";
import BackButton from "@/components/go-back";

export default function CreateBlog() {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // 🟢 Dùng FormData
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("description", description);
        formData.append("name", name);

        if (image) {
            formData.append("image", image);
        }

        console.log("Dữ liệu gửi lên API:", formData);

        try {
            const response = await postBlog(formData);
            console.log("Phản hồi từ API:", response);

            if (response.error) {
                setError("Lỗi: " + response.error);
            } else {
                router.push("/blogs");
            }
        } catch (err) {
            setError("Có lỗi xảy ra khi gửi dữ liệu.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <BackButton text="Back" link="/blogs" />
            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-xl font-bold mb-4 text-center">Thêm Blog Mới</h1>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Tên"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Tiêu đề"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {/* Sửa input file */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setImage(e.target.files[0]);
                            }
                        }}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
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
