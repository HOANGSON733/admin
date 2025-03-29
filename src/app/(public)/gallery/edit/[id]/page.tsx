"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { notification } from "antd"; // Import notification từ Ant Design
import { getData, getDataById, updateData } from "@/lib/api";
import BackButton from "@/components/go-back";
import { Button } from "@/components/ui/button";

export default function EditGallery() {
    const router = useRouter();
    const { id } = useParams();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
    
        const idnumber = Number(id);
        if (isNaN(idnumber)) {
            notification.error({
                message: "Lỗi",
                description: "ID không hợp lệ.",
                placement: "topRight",
            });
            return;
        }
    
        getDataById({ idnumber })
            .then(({data}) => {
                console.log("Dữ liệu nhận được:", data); // Kiểm tra dữ liệu ở đây
                if (data) {
                    setName(data.name || "");
                    setTitle(data.title || "");
                    setImage(data.image ? `http://localhost:5000/${data.image}` : null);
                    setContent(data.content || "");
                    setCategory(data.category || "");
                }
            })
            .catch((error) => {
                console.error("Lỗi khi gọi API:", error);
                notification.error({
                    message: "Lỗi tải dữ liệu",
                    description: "Không thể tải dữ liệu từ máy chủ.",
                    placement: "topRight",
                });
            });
    }, [id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("title", title);
            formData.append("content", content);
            formData.append("category", category);
            if (selectedFile) {
                formData.append("image", selectedFile);
            }

            const response = await fetch(`http://localhost:5000/gallery/${id}`, {
                method: "PATCH",
                body: formData,
            });

            if (!response.ok) throw new Error("Lỗi khi cập nhật");

            notification.success({
                message: "Cập nhật thành công",
                description: "Dữ liệu đã được cập nhật thành công!",
                placement: "topRight",
            });

            router.push("/");
        } catch (error) {
            notification.error({
                message: "Lỗi cập nhật",
                description: "Có lỗi xảy ra khi cập nhật dữ liệu.",
                placement: "topRight",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <BackButton text="Quay lại" link="/" />
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-xl font-bold mb-4 text-center">Chỉnh sửa ảnh</h1>

                <form onSubmit={handleUpdate} className="space-y-4">
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
                        type="file"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />

                    {image && (
                        <img src={image} alt="Preview" className="w-full h-40 object-cover rounded" />
                    )}

                    <textarea
                        placeholder="Nội dung"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />

                    <select
                        value={category || ""}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="" disabled>Chọn danh mục</option>
                        <option value="kieu-toc">Kiểu Tóc</option>
                        <option value="dich-vu">Dịch Vụ</option>
                        <option value="toc-nam">Tóc Nam</option>
                        <option value="phun-xam-tham-my">Phun Xăm Thẩm Mỹ</option>
                        <option value="co-so-vat-chat">Cơ Sở Vật Chất</option>
                        <option value="su-kien">Sự Kiện</option>
                    </select>

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
