"use client";

import { useState, useEffect } from "react";
import { getData, deleteData } from "../lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GalleryList() {
  const [galleries, setGalleries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setGalleries(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc muốn xóa ảnh này không?")) {
      try {
        await deleteData(id);
        setGalleries(galleries.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Lỗi khi xóa dữ liệu:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Thư viện ảnh</h1>

      <div className="flex justify-end mb-4">
        <Link
          href="/create"
          
        >
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">  + Thêm ảnh</Button>
        
        </Link>
      </div>

      {loading ? (
        <p className="text-center">Đang tải...</p>
      ) : galleries.length === 0 ? (
        <p className="text-center">Không có ảnh nào</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleries.map((item) => (
            <li key={item.id} className="border p-4 rounded-lg shadow-md">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <div className="flex justify-between mt-2">
                <Link
                  href={`/edit/${item.id}`}
                  
                >
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg">Sửa</Button>
                  
                </Link>
                <Button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                >
                  Xóa
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
