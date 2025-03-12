"use client";
import { Image, Input, Pagination } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { useState, useEffect, Key } from "react";
import { getServices, deleteService } from "../../lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { Button, Modal, Space } from 'antd';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaPencil } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import TextArea from "antd/es/input/TextArea";

export default function ServiceList() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getServices();
        setServices(data);
        console.log("Danh sách dịch vụ:", data);

      } catch (error) {
        console.error("Lỗi khi tải dịch vụ:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc muốn xóa dịch vụ này không?")) {
      try {
        await deleteService(id);
        setServices(services.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Lỗi khi xóa dịch vụ:", error);
      }
    }
  };

  const filteredServices = services.filter(
    (item) =>
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filteredServices.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container p-6 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow">
        <h1 className="mb-6 text-2xl font-bold text-center">Danh sách dịch vụ</h1>
        <div className="flex justify-between mb-4">
          <Input
            placeholder="Tìm kiếm dịch vụ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            prefix={<SearchOutlined />}
            className="w-1/3"
            style={{ borderRadius: '6px' }}
          />

          <Link href="/service/create">
            <Button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
              + Thêm dịch vụ
            </Button>
          </Link>
        </div>

        {loading ? (
          <p className="text-center">Đang tải...</p>
        ) : filteredServices.length === 0 ? (
          <p className="text-center">Không có dịch vụ nào phù hợp</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead className="text-center">Thumbnail</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                      <TableCell className="text-center gap-1">
                        {Array.isArray(item.image) && item.image.length > 0 ? (
                          item.image.slice(0, 2).map((img: string, index: number) => {
                            const imageUrl = img.startsWith("http") ? img : `http://localhost:5000/uploads/${img}`;
                            // console.log("Đang tải ảnh:", imageUrl);
                            return (
                              <Image
                                className="px-1"
                                key={index}
                                width={60}
                                src={imageUrl}
                                alt={`Ảnh ${index + 1}`}
                                onError={(e) => {
                                  console.error(`Lỗi tải ảnh: ${imageUrl}`, e);
                                  e.currentTarget.style.display = "/fallback-image.jpg"; // Ẩn ảnh nếu lỗi
                                }}
                              />
                            );
                          })
                        ) : (
                          <p className="text-gray-500">Không có ảnh</p>
                        )}
                      </TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>
                        <TextArea
                          value={item.content}
                          rows={3}
                          readOnly
                          className="border-none bg-gray-100 cursor-default outline-none "
                        />
                      </TableCell>
                      <TableCell>
                        <TextArea
                          value={item.description}
                          rows={3}
                          readOnly
                          className="border-none bg-gray-100 cursor-default hover:outline-none"
                        />
                      </TableCell>


                      <TableCell className="text-right">
                        <Link href={`/service/edit/${item.id}`}>
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
                total={filteredServices.length}
                pageSize={pageSize}
                onChange={(page) => setCurrentPage(page)}
                onShowSizeChange={(current, size) => {
                  setPageSize(size);
                  setCurrentPage(1);
                }}
                showSizeChanger
                showTotal={(total) => `Tổng cộng ${total} dịch vụ`}
                pageSizeOptions={['5', '10', '20', '50']}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
