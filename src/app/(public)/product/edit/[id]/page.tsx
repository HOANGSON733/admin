"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { getProducts, updateProduct } from "@/lib/api";
import BackButton from "@/components/go-back";
import {
    Form,
    Input,
    InputNumber,
    Button,
    Upload,
    Select,
    Typography,
    Space,
    Divider,
    Card,
    notification,
    Tag,
    Spin
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface Params {
    id: string;
}

export default function EditProduct({ params }: { params: Params }) {
    const productId = params.id;
    
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [galleryFileList, setGalleryFileList] = useState<UploadFile[]>([]);
    const [features, setFeatures] = useState<string[]>([]);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [featureInput, setFeatureInput] = useState("");
    const [ingredientInput, setIngredientInput] = useState("");
    const [error, setError] = useState("");
    const [productData, setProductData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const products = await getProducts();
                const product = products.find((p: { id: number; }) => p.id === parseInt(productId));

                if (!product) {
                    throw new Error("Không tìm thấy sản phẩm");
                }

                setProductData(product);

                // Populate form với dữ liệu sản phẩm
                form.setFieldsValue({
                    name: product.name,
                    price: product.price,
                    originalPrice: product.originalPrice,
                    category: product.category,
                    description: product.description,
                    weight: product.weight,
                    origin: product.origin,
                    holdLevel: product.holdLevel,
                    shineLevel: product.shineLevel,
                    expiry: product.expiry,
                });

                // Set features và ingredients
                if (Array.isArray(product.features)) setFeatures(product.features);
                if (Array.isArray(product.ingredients)) setIngredients(product.ingredients);

                // Set hình ảnh chính
                if (product.image) {
                    setFileList([
                        {
                            uid: "-1",
                            name: "image.jpg",
                            status: "done",
                            url: product.image,
                        },
                    ]);
                }

                // Set gallery ảnh
                if (Array.isArray(product.gallery)) {
                    setGalleryFileList(
                        product.gallery.map((url:any, index:any) => ({
                            uid: `-${index + 1}`,
                            name: `gallery-${index}.jpg`,
                            status: "done",
                            url: url,
                        }))
                    );
                }
            } catch (err:any) {
                console.error("Lỗi khi tải dữ liệu sản phẩm:", err);
                setError(err.message || "Không thể tải dữ liệu sản phẩm");
                notification.error({ message: "Lỗi", description: err.message || "Không thể tải dữ liệu sản phẩm" });
            } finally {
                setInitialLoading(false);
            }
        };

        fetchProduct();
    }, [productId, form]);

    const beforeUpload = (file: File) => false;
    const handleImageChange = (info: any) => setFileList(info.fileList);
    const handleGalleryChange = (info: any) => setGalleryFileList(info.fileList);

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            const values = await form.validateFields();
            const formData = new FormData();

            Object.entries(values).forEach(([key, value]) => {
                if (value !== undefined && key !== "images" && key !== "gallery") {
                    formData.append(key, String(value));
                }
            });

            // Add features & ingredients
            features.forEach((feature) => formData.append("features[]", feature));
            ingredients.forEach((ingredient) => formData.append("ingredients[]", ingredient));

            // Add ảnh chính
            fileList.forEach((file) => {
                if (file.originFileObj) formData.append("image", file.originFileObj);
            });

            // Add ảnh gallery
            galleryFileList.forEach((file) => {
                if (file.originFileObj) formData.append("gallery[]", file.originFileObj);
            });

            // Gửi dữ liệu cập nhật
            const response = await updateProduct(parseInt(productId), formData as any);
            if (!response || response.error) {
                throw new Error(response?.error || "Có lỗi xảy ra khi cập nhật dữ liệu.");
            }

            notification.success({ message: "Thành công", description: "Sản phẩm đã được cập nhật thành công." });
            router.push("/products");
        } catch (err:any) {
            console.error(err);
            setError(err.message || "Có lỗi xảy ra.");
            notification.error({ message: "Lỗi", description: err.message || "Có lỗi xảy ra khi cập nhật dữ liệu." });
        } finally {
            setLoading(false);
        }
    };

    const handleFeatureAdd = useCallback(() => {
        if (!featureInput.trim()) return;
        setFeatures((prev) => [...prev, featureInput]);
        setFeatureInput("");
    }, [featureInput]);

    const handleIngredientAdd = useCallback(() => {
        if (!ingredientInput.trim()) return;
        setIngredients((prev) => [...prev, ingredientInput]);
        setIngredientInput("");
    }, [ingredientInput]);

    const removeFeature = useCallback((index: number) => {
        setFeatures((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const removeIngredient = useCallback((index: number) => {
        setIngredients((prev) => prev.filter((_, i) => i !== index));
    }, []);

    if (initialLoading) {
        return (
            <div style={{ padding: "24px", display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
                <Spin size="large" tip="Đang tải dữ liệu..." />
            </div>
        );
    }
    return (
        <div style={{ padding: '24px' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
                <BackButton text="Quay lại" link="/products" />
                <Title level={2}>Chỉnh sửa sản phẩm</Title>
                {error && <Text type="danger">{error}</Text>}
                <Card>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="name"
                            label="Tên sản phẩm"
                            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                        >
                            <Input placeholder="Nhập tên sản phẩm" />
                        </Form.Item>

                        <Space style={{ width: '100%' }} direction="horizontal">
                            <Form.Item
                                name="price"
                                label="Giá"
                                rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
                                style={{ width: '50%' }}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="Nhập giá bán"
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                                />
                            </Form.Item>

                            <Form.Item
                                name="originalPrice"
                                label="Giá gốc"
                                rules={[{ required: true, message: 'Vui lòng nhập giá gốc!' }]}
                                style={{ width: '50%' }}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder="Nhập giá gốc"
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                                />
                            </Form.Item>
                        </Space>

                        <Form.Item
                            name="category"
                            label="Danh mục"
                            rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                        >
                            <Select placeholder="Chọn danh mục">
                                <Select.Option value="hair_wax">Sáp vuốt tóc</Select.Option>
                                <Select.Option value="hair_clay">Đất sét tạo kiểu tóc</Select.Option>
                                <Select.Option value="hair_paste">Paste tạo kiểu tóc</Select.Option>
                                <Select.Option value="pomade">Pomade</Select.Option>
                                <Select.Option value="other">Khác</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Mô tả"
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
                        >
                            <TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
                        </Form.Item>

                        <Divider orientation="left">Thông tin chi tiết</Divider>

                        <Space style={{ width: '100%' }} direction="horizontal">
                            <Form.Item
                                name="weight"
                                label="Trọng lượng"
                                rules={[{ required: true, message: 'Vui lòng nhập trọng lượng!' }]}
                                style={{ width: '50%' }}
                            >
                                <Input placeholder="Ví dụ: 100g" />
                            </Form.Item>

                            <Form.Item
                                name="origin"
                                label="Xuất xứ"
                                rules={[{ required: true, message: 'Vui lòng nhập xuất xứ!' }]}
                                style={{ width: '50%' }}
                            >
                                <Input placeholder="Ví dụ: Việt Nam" />
                            </Form.Item>
                        </Space>

                        <Space style={{ width: '100%' }} direction="horizontal">
                            <Form.Item
                                name="holdLevel"
                                label="Độ giữ nếp"
                                rules={[{ required: true, message: 'Vui lòng nhập độ giữ nếp!' }]}
                                style={{ width: '50%' }}
                            >
                                <Select placeholder="Chọn độ giữ nếp">
                                    <Select.Option value="weak">Yếu</Select.Option>
                                    <Select.Option value="medium">Trung bình</Select.Option>
                                    <Select.Option value="strong">Mạnh</Select.Option>
                                    <Select.Option value="very_strong">Rất mạnh</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="shineLevel"
                                label="Độ bóng"
                                rules={[{ required: true, message: 'Vui lòng nhập độ bóng!' }]}
                                style={{ width: '50%' }}
                            >
                                <Select placeholder="Chọn độ bóng">
                                    <Select.Option value="matte">Lì</Select.Option>
                                    <Select.Option value="low_shine">Ánh nhẹ</Select.Option>
                                    <Select.Option value="medium_shine">Bóng vừa</Select.Option>
                                    <Select.Option value="high_shine">Rất bóng</Select.Option>
                                </Select>
                            </Form.Item>
                        </Space>

                        <Form.Item
                            name="expiry"
                            label="Hạn sử dụng"
                            rules={[{ required: true, message: 'Vui lòng nhập hạn sử dụng!' }]}
                        >
                            <Input placeholder="Ví dụ: 36 tháng kể từ ngày sản xuất" />
                        </Form.Item>

                        <Divider orientation="left">Hình ảnh sản phẩm</Divider>

                        <Form.Item
                            name="gallery"
                            label="Thư viện ảnh"
                            valuePropName="fileList"
                            getValueFromEvent={normFile => {
                                if (Array.isArray(normFile)) {
                                    return normFile;
                                }
                                return normFile?.fileList;
                            }}
                        >
                            <Upload
                                listType="picture-card"
                                beforeUpload={beforeUpload}
                                onChange={handleGalleryChange}
                                fileList={galleryFileList}
                                multiple
                            >
                                {galleryFileList.length >= 5 ? null : (
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Tải lên</div>
                                    </div>
                                )}
                            </Upload>
                        </Form.Item>

                        <Divider orientation="left">Đặc điểm nổi bật</Divider>
                        <Space>
                            <Input
                                value={featureInput}
                                onChange={e => setFeatureInput(e.target.value)}                             
                                placeholder="Nhập đặc điểm nổi bật"
                            />
                            <Button onClick={handleFeatureAdd}>Thêm</Button>
                        </Space>
                        <div style={{ marginTop: 10 }}>
                            {features.map((feature, index) => (
                                <Tag closable key={index} onClose={() => removeFeature(index)}>
                                    {feature}
                                </Tag>
                            ))}
                        </div>

                        <Divider orientation="left">Thành phần</Divider>
                        <Space>
                            <Input
                                value={ingredientInput}
                                onChange={e => setIngredientInput(e.target.value)}
                                placeholder="Nhập thành phần"
                            />
                            <Button onClick={handleIngredientAdd}>Thêm</Button>
                        </Space>
                        <div style={{ marginTop: 10 }}>
                            {ingredients.map((ingredient, index) => (
                                <Tag closable key={index} onClose={() => removeIngredient(index)}>
                                    {ingredient}
                                </Tag>
                            ))}
                        </div>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Cập nhật sản phẩm
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Space>
        </div>
    );
}