"use client";
import { Image, Input, Pagination } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import { getData, deleteData } from "../lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaPencil } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";

export default function GalleryList() {
  const [galleries, setGalleries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

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

  // Lọc danh sách ảnh theo từ khóa tìm kiếm
  const filteredGalleries = galleries.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.title?.toLowerCase().includes(search.toLowerCase())
  );

  // Paginate the data
  const paginatedData = filteredGalleries.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container p-6 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow">
        <h1 className="mb-6 text-2xl font-bold text-center">Thư viện ảnh</h1>
        <div className="flex justify-between mb-4">
          <Input
            placeholder="Tìm kiếm ảnh theo tên hoặc tiêu đề..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            prefix={<SearchOutlined />}
            className="w-1/3"
            style={{ borderRadius: '6px' }}
          />

          <Link href="/create">
            <Button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
              + Thêm ảnh
            </Button>
          </Link>
        </div>

        {loading ? (
          <p className="text-center">Đang tải...</p>
        ) : filteredGalleries.length === 0 ? (
          <p className="text-center">Không có ảnh nào phù hợp</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead className="text-center">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                      <TableCell className="text-center">
                        <Image 
                          width={60} 
                          src={item.image} 
                          alt={item.name || 'Image'} 
                          style={{ borderRadius: '4px' }} 
                        />
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">
                          {item.category}
                        </span>
                      </TableCell>
                      <TableCell>{item.content}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/edit/${item.id}`}>
                          <Button variant="outline" size="sm" className="mr-2">
                            <FaPencil size={16} />
                          </Button>
                        </Link>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                          <FaRegTrashAlt size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex justify-end mt-4">
              <Pagination
                current={currentPage}
                total={filteredGalleries.length}
                pageSize={pageSize}
                onChange={(page) => setCurrentPage(page)}
                onShowSizeChange={(current, size) => {
                  setPageSize(size);
                  setCurrentPage(1);
                }}
                showSizeChanger
                showTotal={(total) => `Tổng cộng ${total} ảnh`}
                pageSizeOptions={['5', '10', '20', '50']}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}