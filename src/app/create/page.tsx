"use client";

import { useState } from "react";
import { postData } from "../../lib/api";
import { useRouter } from "next/navigation";
import BackButton from "@/components/go-back";

export default function CreateGallery() {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const data = {
            title,
            image: [image], // Chuyển thành mảng chứa chuỗi
            content: "Nội dung mẫu", // Nội dung bắt buộc
            category: "Danh mục mẫu", // Danh mục bắt buộc
        };

        console.log("Dữ liệu gửi lên API:", data);

        try {
            const response = await postData(data);
            console.log("Phản hồi từ API:", response);

            if (response.error) {
                setError("Lỗi: " + response.error);
            } else {
                router.push("/");
            }
        } catch (err) {
            setError("Có lỗi xảy ra khi gửi dữ liệu.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    return (
        // Thêm form vào đây
        <div>
            <BackButton text="Back" link="/"/>
            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-xl font-bold mb-4 text-center">Thêm ảnh mới</h1>

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
                    <input
                        type="text"
                        placeholder="URL ảnh"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
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
                    <input
                        type="text"
                        placeholder="Danh mục"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
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
