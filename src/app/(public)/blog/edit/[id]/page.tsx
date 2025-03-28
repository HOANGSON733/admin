"use client";
import dynamic from "next/dynamic";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getBlogs, updateBlog, uploadImage, getBlogById } from "@/lib/api"; // Thêm hàm upload ảnh
import BackButton from "@/components/go-back";
import { Button } from "@/components/ui/button";
import { number } from "zod";

const TiptapEditor = dynamic(() => import("@/components/TiptapEditor"), { ssr: false });

export default function EditBlog() {
    const router = useRouter();
    const { id } = useParams();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState<string | null>(null); // URL ảnh hiện tại
    // const [newImage, setNewImage] = useState<File | null>(null); // Ảnh mới
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;
            const idnumber = Number(id)
        getBlogById(idnumber)
            .then(({data}) => {
                console.log("Dữ liệu nhận được:", data); // Kiểm tra dữ liệu API trả về
                
                console.log("id",idnumber);
                
                if (data) {
                    setName(data.name || "");
                    setTitle(data.title || "");
                    setImage(data.image || ""); // Có thể data[0].image bị undefined ở đây
                    setContent(data.content || "");
                    setDescription(data.description || "" );
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
            formData.append("name", name);
            formData.append("title", title);
            formData.append("content", content);
            formData.append("description", description);
            console.log("jhaksdhajl",formData);
            
            if (selectedFile) {
                formData.append("image", selectedFile); // Gửi file lên API
            }
    
            const response = await fetch(`http://localhost:5000/blogs/${id}`, {
                method: "PATCH",
                body: formData, // Gửi form-data thay vì JSON
            });
    
            const data = await response.json();
            console.log("Response cập nhật:", data);
    
            if (!response.ok) {
                throw new Error(data.message || "Lỗi khi cập nhật");
            }
    
            router.push("/blogs");
        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
            setError("Có lỗi xảy ra khi cập nhật.");
        } finally {
            setLoading(false);
        }
    };
    
    if (name === null || title === null || content === null || description === null || image === null) {
        return <p className="text-center">Đang tải dữ liệu...</p>;
    }

    console.log(content);
    
    return (
        <div>
            <BackButton text="Quay lại" link="/blogs" />
            <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-xl font-bold mb-4 text-center">Chỉnh sửa ảnh</h1>

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
                    <input
                        type="text"
                        placeholder="Tên"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {/* Input chọn file ảnh */}
                    <input
                        type="file"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />


                    {/* Hiển thị ảnh cũ hoặc ảnh mới nếu chọn */}
                    {image && (
                        <img src={image} alt="Preview" className="w-full h-90 object-cover rounded" />
                    )}
                         {/* 🟢 Tiptap Editor */}
                    <TiptapEditor content={content} setContent={setContent} />
                    
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
