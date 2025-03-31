"use client";

import { useState } from "react";
import { postData } from "@/lib/api";
import { useRouter } from "next/navigation";
import BackButton from "@/components/go-back";
import { notification } from "antd"; // Import notification từ antd

export default function CreateGallery() {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [category1, setCategory1] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const [previewImage, setPreviewImage] = useState<string | null>(null); // Lưu URL xem trước

    // Hàm hiển thị notification
    const openNotification = (type: "success" | "error", message: string, description?: string) => {
        notification[type]({
            message,
            description,
            placement: "topRight", // Vị trí thông báo
            duration: 3, // Thời gian hiển thị (giây)
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("category", category);
        formData.append("category1", category1);
        formData.append("name", name);
        if (image) {
            formData.append("image", image);
        }

        console.log("Dữ liệu gửi lên API:", formData);

        try {
            const response = await postData(formData);
            console.log("Phản hồi từ API:", response);

            if (response.error) {
                // Thay setError bằng notification
                openNotification("error", "Lỗi", response.error);
            } else {
                // Thông báo thành công
                openNotification("success", "Thành công", "Ảnh đã được thêm thành công!");
                router.push("/gallery"); // Chuyển hướng về trang gallery
            }
        } catch (err) {
            // Thay setError bằng notification
            openNotification("error", "Lỗi", "Có lỗi xảy ra khi gửi dữ liệu.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file); // Cập nhật state image

            // Kiểm tra xem FileReader có hoạt động không
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target && typeof event.target.result === "string") {
                    setPreviewImage(event.target.result); // Cập nhật ảnh xem trước
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <BackButton text="Back" link="/gallery" />
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-xl font-bold mb-4 text-center">Thêm ảnh mới</h1>

                {/* Bỏ phần hiển thị error cũ */}
                {/* {error && <p className="text-red-500 text-center">{error}</p>} */}

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
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />

                    {previewImage && (
                        <div className="mt-4">
                            <p className="text-sm mb-2">Xem trước:</p>
                            <img
                                src={previewImage}
                                alt="Xem trước"
                                className="object-contain w-full h-40 border rounded"
                            />
                        </div>
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
                        // required
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
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        // required
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="" disabled>
                            Chọn danh mục
                        </option>
                        <option value="kieu-toc">Kiểu Tóc</option>
                        <option value="dich-vu">Dịch Vụ</option>
                        <option value="toc-nam">Tóc Nam</option>
                        <option value="phun-xam-tham-my">Phun Xăm Thẩm Mỹ</option>
                        <option value="co-so-vat-chat">Cơ Sở Vật Chất</option>
                        <option value="su-kien">Sự Kiện</option>
                    </select>

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