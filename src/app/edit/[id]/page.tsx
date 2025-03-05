"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getData, updateData } from "../../../lib/api";
import BackButton from "@/components/go-back";
import { Button } from "@/components/ui/button";
import { set } from "zod";

export default function EditGallery() {
    const router = useRouter();
    const { id } = useParams();
    const [name, setName] = useState<string | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [content, setContent] = useState<string | null>(null);
    const [category, setCategory] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) {
            getData(id)
                .then((data) => {
                    console.log("Dữ liệu từ API:", data); // Kiểm tra dữ liệu nhận về
                    if (data) {
                        setName(data.name || "");
                        setTitle(data.title || "");
                        setImage(Array.isArray(data.image) ? data.image.join(", ") : data.image || "");
                        setContent(data.content || "");
                        setCategory(data.category || "");
                    }
                })
                .catch((err) => {
                    console.error("Lỗi khi tải dữ liệu:", err);
                    setError("Không thể tải dữ liệu.");
                });
        }
    }, [id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const updatedData = {
                name,
                title,
                image: image ? image.split(",").map((url) => url.trim()) : [],
                content,
                category,
            };

            console.log("Dữ liệu cập nhật:", updatedData);

            const response = await updateData(Number(id), updatedData);

            if (response.error) {
                setError("Lỗi: " + response.error);
            } else {
                router.push("/");
            }
        } catch (err) {
            setError("Có lỗi xảy ra khi cập nhật.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (name === null || title === null || image === null || content === null || category === null) {
        return <p className="text-center">Đang tải dữ liệu...</p>; // Tránh hiển thị form khi dữ liệu chưa tải xong
    }

    return (
        <div>
            <BackButton text="Back" link="/" />
            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-xl font-bold mb-4 text-center">Chỉnh sửa ảnh</h1>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleUpdate} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Tên"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"/>
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
                        placeholder="URL ảnh (cách nhau bởi dấu phẩy)"
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
