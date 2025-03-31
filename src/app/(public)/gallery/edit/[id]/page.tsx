"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { notification } from "antd"; // Import notification từ Ant Design
import { getDataById } from "@/lib/api";
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
    const [category1, setCategory1] = useState("");
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null); // Xem trước ảnh

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
            .then(({ data }) => {
                console.log("Dữ liệu nhận được:", data); // Kiểm tra dữ liệu
                if (data) {
                    setName(data.name || "");
                    setTitle(data.title || "");
                    setImage(data.image || null);
                    setContent(data.content || "");
                    setCategory(data.category || "");
                    setCategory1(data.category1 || "");
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
            formData.append("category1", category1);
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

            router.push("/gallery");
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file); // Cập nhật file

            // Đọc file và tạo URL để xem trước
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target && typeof event.target.result === "string") {
                    setPreviewImage(event.target.result); // Hiển thị ảnh mới
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <BackButton text="Quay lại" link="/gallery" />
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
                        onChange={handleImageChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />

                    {/* Nếu có ảnh mới từ input, hiển thị nó */}
                    {previewImage ? (
                        <div className="mt-4">
                            <p className="text-sm mb-2">Xem trước:</p>
                            <img
                                src={previewImage}
                                alt="Xem trước"
                                className="object-contain w-full h-40 border rounded"
                            />
                        </div>
                    ) : (
                        // Nếu không có ảnh mới, hiển thị ảnh từ API
                        image && (
                            <img
                                src={image}
                                alt="Ảnh hiện tại"
                                className="w-full h-40 object-cover rounded"
                            />
                        )
                    )}

                    <textarea
                        placeholder="Nội dung"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />

                    <select
                        value={category1}
                        onChange={(e) => setCategory1(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="" disabled>
                            Kiểu Tóc Dịch Vụ Tóc Nam Phun Xăm Thẩm Mỹ
                        </option>
                        <option value="kieu-toc-nam">Kiểu Tóc Nam</option>
                        <option value="kieu-toc-nu">Kiểu tóc nữ</option>
                        <option value="phun-xam-tham-my">Phun Xăm Thẩm Mỹ</option>
                        <option value="nail">Nail</option>
                    </select>

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
