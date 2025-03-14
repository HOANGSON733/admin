"use client";
import { Image, Input, Pagination } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../../lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaPencil } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import TextArea from "antd/es/input/TextArea";

export default function ProductList() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                console.log("Danh sách sản phẩm:", data);
            } catch (error) {
                console.error("Lỗi khi tải sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
            try {
                await deleteProduct(id);
                setProducts(products.filter((item) => item.id !== id));
            } catch (error) {
                console.error("Lỗi khi xóa sản phẩm:", error);
            }
        }
    };

    const filteredProducts = products.filter(
        (item) =>
            item.title?.toLowerCase().includes(search.toLowerCase()) ||
            item.description?.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedData = filteredProducts.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="container p-6 mx-auto">
            <div className="p-6 bg-white rounded-lg shadow">
                <h1 className="mb-6 text-2xl font-bold text-center">Danh sách sản phẩm</h1>
                <div className="flex justify-between mb-4">
                    <Input
                        placeholder="Tìm kiếm sản phẩm..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        prefix={<SearchOutlined />}
                        className="w-1/3"
                        style={{ borderRadius: '6px' }}
                    />

                    <Link href="/product/create">
                        <Button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                            + Thêm Sản Phẩm
                        </Button>
                    </Link>
                </div>

                {loading ? (
                    <p className="text-center">Đang tải...</p>
                ) : filteredProducts.length === 0 ? (
                    <p className="text-center">Không có sản phẩm nào phù hợp</p>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead className="text-center">Image</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>price</TableHead>
                                        <TableHead>originalPrice</TableHead>
                                        <TableHead>gallery</TableHead>
                                        <TableHead>category</TableHead>
                                        <TableHead>features</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>origin</TableHead>
                                        <TableHead>holdLevel</TableHead>
                                        <TableHead>shineLevel</TableHead>
                                        <TableHead>ingredients</TableHead>
                                        <TableHead>expiry</TableHead>
                                        <TableHead>slug</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedData.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                                            <TableCell className="text-center">
                                                {item.image ? (
                                                    <Image
                                                        width={60}
                                                        src={item.image.startsWith("http") ? item.image : `http://localhost:5000/uploads/${item.image}`}
                                                        alt="Ảnh sản phẩm"
                                                        onError={(e) => {
                                                            console.error(`Lỗi tải ảnh: ${item.image}`, e);
                                                            e.currentTarget.src = "/fallback-image.jpg"; // Thay ảnh lỗi bằng ảnh mặc định
                                                        }}
                                                    />
                                                ) : (
                                                    <p className="text-gray-500">Không có ảnh</p>
                                                )}
                                            </TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.price}</TableCell>
                                            <TableCell>{item.originalPrice}</TableCell>
                                            <TableCell className="text-center">
                                                {Array.isArray(item.gallery) && item.gallery.length > 0 ? (
                                                    <div className="flex gap-2">
                                                        {item.gallery.slice(0, 5).map((img: string, index: number) => {
                                                            const imageUrl = img.startsWith("http") ? img : `http://localhost:5000/uploads/${img}`;
                                                            return (
                                                                <Image
                                                                    key={index}
                                                                    width={50}
                                                                    src={imageUrl}
                                                                    alt={`Ảnh ${index + 1}`}
                                                                    onError={(e) => {
                                                                        console.error(`Lỗi tải ảnh: ${imageUrl}`, e);
                                                                        e.currentTarget.src = "/fallback-image.jpg"; // Ảnh mặc định nếu lỗi
                                                                    }}
                                                                />
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-500">Không có ảnh</p>
                                                )}
                                            </TableCell>
                                            <TableCell>{item.category}</TableCell>
                                            <TableCell>{item.features}</TableCell>
                                            <TableCell>
                                                <TextArea
                                                    value={item.description}
                                                    rows={3}
                                                    readOnly
                                                    className="border-none bg-gray-100 cursor-default hover:outline-none"
                                                />
                                            </TableCell>
                                            <TableCell>{item.origin}</TableCell>
                                            <TableCell>{item.holdLevel}</TableCell>
                                            <TableCell>{item.shineLevel}</TableCell>
                                            <TableCell>{item.ingredients}</TableCell>
                                            <TableCell>{item.expiry}</TableCell>
                                            <TableCell>{item.slug}</TableCell>
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
                                total={filteredProducts.length}
                                pageSize={pageSize}
                                onChange={(page) => setCurrentPage(page)}
                                onShowSizeChange={(current, size) => {
                                    setPageSize(size);
                                    setCurrentPage(1);
                                }}
                                showSizeChanger
                                showTotal={(total) => `Tổng cộng ${total} sản phẩm`}
                                pageSizeOptions={['5', '10', '20', '50']}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}