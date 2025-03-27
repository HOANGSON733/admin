"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { postBlog } from "@/lib/api";
import { useRouter } from "next/navigation";
import BackButton from "@/components/go-back";

const TiptapEditor = dynamic(() => import("@/components/TiptapEditor"), { ssr: false });

export default function CreateBlog() {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState<File | null>(null); // Lưu file ảnh
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [previewImage, setPreviewImage] = useState<string | null>(null); // Lưu URL xem trước
    const router = useRouter();

    // Đặt nội dung mặc định cho Tiptap
    useEffect(() => {
        setContent('<p>Nhập nội dung ở đây...</p>');
    }, []);

    // Xử lý khi chọn file ảnh
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file); // Lưu file để gửi lên API
            // Tạo URL xem trước
            const previewUrl = URL.createObjectURL(file);
            setPreviewImage(previewUrl);
        }
    };

    // Dọn dẹp URL khi component unmount hoặc previewImage thay đổi
    useEffect(() => {
        return () => {
            if (previewImage) {
                URL.revokeObjectURL(previewImage); // Giải phóng bộ nhớ
            }
        };
    }, [previewImage]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("description", description);
        formData.append("name", name);
        if (image) {
            formData.append("image", image);
        }

        console.log("Dữ liệu gửi lên API:", { title, content, description, name, image });

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
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-xl font-bold mb-4 text-center">Thêm Blog Mới</h1>

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
                    <input
                        type="text"
                        placeholder="Tên tác giả"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />

                    {/* Input chọn ảnh */}
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange} // Sử dụng hàm đã định nghĩa
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {previewImage && (
                            <div className="mt-4">
                                <p className="text-sm mb-2">Xem trước:</p>
                                <div className="relative h-40 w-full">
                                    <img
                                        src={previewImage}
                                        alt="Xem trước"
                                        className="object-contain w-full h-full border rounded"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Tiptap Editor */}
                    <TiptapEditor content={content} setContent={setContent} />

                    {/* Mô tả blog */}
                    <textarea
                        placeholder="Mô tả"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />

                    {/* Nút Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                    >
                        {loading ? "Đang thêm..." : "Thêm Blog"}
                    </button>
                </form>
            </div>
        </div>
    );
}