"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { postProduct } from "@/lib/api";
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
    Row,
    Col
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
const { Title, Text } = Typography;
const { TextArea } = Input;

export default function CreateProduct() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [galleryFileList, setGalleryFileList] = useState<UploadFile[]>([]);
    const [features, setFeatures] = useState<string>("");
    const [ingredients, setIngredients] = useState<string>('');
    const [error, setError] = useState("");
    const router = useRouter();

    const beforeUpload = (file: File) => {
        // Ngăn chặn tự động upload
        return false;
    };

    const handleImageChange = (info: any) => {
        setFileList(info.fileList);
    };

    const handleGalleryChange = (info: any) => {
        setGalleryFileList(info.fileList);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            const values = await form.validateFields();
            const formData = new FormData();

            // Log các giá trị form trước khi gửi
            console.log("Form values:", values);

            // Thêm dữ liệu vào formData
            Object.entries(values).forEach(([key, value]) => {
                if (value !== undefined && key !== "images" && key !== "gallery") {
                    formData.append(key, String(value));
                }
            });

            // Thêm danh sách tính năng
            if (Array.isArray(features)) {
                formData.append("features", features.join(", "));
            }
            
            if (Array.isArray(ingredients)) {
                formData.append("ingredients", ingredients.join(", "));
            }

            // Thêm hình ảnh chính
            if (fileList.length > 0) {
                fileList.forEach(file => {
                    if (file.originFileObj) {
                        formData.append("image", file.originFileObj);
                    }
                });
            } else {
                throw new Error("Vui lòng tải lên ít nhất 1 hình ảnh chính");
            }

            // Thêm thư viện hình ảnh
            if (galleryFileList.length > 0) {
                galleryFileList.forEach(file => {
                    if (file.originFileObj) {
                        formData.append("gallery", file.originFileObj);
                    }
                });
            }

            // Debug: Kiểm tra dữ liệu gửi lên API
            console.log("Dữ liệu gửi lên API:");
            for (let pair of formData.entries()) {
                console.log(pair[0] + ':', pair[1]);
            }

            // Gửi API
            const response = await postProduct(formData);
            console.log("Response từ API:", response);

            if (!response) {
                throw new Error("Không nhận được phản hồi từ server");
            }

            if (response.error) {
                throw new Error(response.error);
            }

            notification.success({ message: "Thành công", description: "Sản phẩm đã được tạo thành công." });
            router.push("/products");
        } catch (err: any) {
            console.error("Lỗi chi tiết:", err);
            setError(err.message || "Có lỗi xảy ra.");
            notification.error({ message: "Lỗi", description: err.message || "Có lỗi xảy ra khi gửi dữ liệu." });
        } finally {
            setLoading(false);
        }
    };


    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <div style={{ padding: '24px' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
                <BackButton text="Quay lại" link="/products" />
                <Title level={2}>Thêm sản phẩm mới</Title>
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

                        <Form.Item
                            name="price"
                            label="Giá"
                            rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
                            style={{ flex: 1, }}
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
                            style={{ flex: 1, }}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder="Nhập giá gốc"
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>



                        <Form.Item
                            name="category"
                            label="Danh mục"
                            rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                        >
                            <Select placeholder="Chọn danh mục">
                                <Select.Option value="Sáp vuốt tóc">Sáp vuốt tóc</Select.Option>
                                <Select.Option value="Đất sét tạo kiểu tóc">Đất sét tạo kiểu tóc</Select.Option>
                                <Select.Option value="Paste tạo kiểu tóc">Paste tạo kiểu tóc</Select.Option>
                                <Select.Option value="Pomade">Pomade</Select.Option>
                                <Select.Option value="Tinh dầu">Tinh dầu</Select.Option>
                                <Select.Option value="Khác">Khác</Select.Option>
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

                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="weight"
                                    label="Trọng lượng"
                                    rules={[{ required: true, message: 'Vui lòng nhập trọng lượng!' }]}
                                >
                                    <Input placeholder="Ví dụ: 100g hoặc 100ml" />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="origin"
                                    label="Xuất xứ"
                                    rules={[{ required: true, message: 'Vui lòng nhập xuất xứ!' }]}
                                >
                                    <Input placeholder="Ví dụ: Việt Nam" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="holdLevel"
                                    label="Độ giữ nếp"
                                    rules={[{ required: true, message: 'Vui lòng nhập độ giữ nếp!' }]}
                                >
                                    <Select placeholder="Chọn độ giữ nếp">
                                        <Select.Option value="Yếu">Yếu</Select.Option>
                                        <Select.Option value="Trung bình">Trung bình</Select.Option>
                                        <Select.Option value="Mạnh">Mạnh</Select.Option>
                                        <Select.Option value="Rất mạnh">Rất mạnh</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="shineLevel"
                                    label="Độ bóng"
                                    rules={[{ required: true, message: 'Vui lòng nhập độ bóng!' }]}
                                >
                                    <Select placeholder="Chọn độ bóng">
                                        <Select.Option value="Lì">Lì</Select.Option>
                                        <Select.Option value="Ánh nhẹ">Ánh nhẹ</Select.Option>
                                        <Select.Option value="Bóng vừa">Bóng vừa</Select.Option>
                                        <Select.Option value="Rất bóng">Rất bóng</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>


                        <Form.Item
                            name="expiry"
                            label="Hạn sử dụng"
                            rules={[{ required: true, message: 'Vui lòng nhập hạn sử dụng!' }]}
                        >
                            <Input placeholder="Ví dụ: 2025-03-03" />
                        </Form.Item>

                        <Divider orientation="left">Hình ảnh sản phẩm</Divider>

                        <Form.Item
                            name="images"
                            label="Hình ảnh chính"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[{ required: true, message: 'Vui lòng tải lên ít nhất 1 hình ảnh!' }]}
                        >
                            <Upload
                                listType="picture-card"
                                beforeUpload={beforeUpload}
                                onChange={handleImageChange}
                                fileList={fileList}
                                multiple
                            >
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Tải lên</div>
                                </div>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            name="gallery"
                            label="Thư viện hình ảnh"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <Upload
                                listType="picture-card"
                                beforeUpload={beforeUpload}
                                onChange={handleGalleryChange}
                                fileList={galleryFileList}
                                multiple
                                maxCount={5}
                            >
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Tải lên</div>
                                </div>
                            </Upload>

                        </Form.Item>

                        <Form.Item
                            name="usage"
                            label="Hướng dẫn sử dụng"
                            rules={[{ required: true, message: 'Vui lòng nhập hướng dẫn sử dụng!' }]}
                        >
                            <Input placeholder="Nhập hướng dẫn sử dụng" />
                        </Form.Item>

                        <Form.Item
                            name="features"
                            label="Tính năng"
                            rules={[{ required: true, message: 'Vui lòng nhập tính năng sản phẩm!' }]}
                        >
                            <TextArea
                                rows={3}
                                placeholder="Nhập tính năng sản phẩm"
                                value={features}
                                onChange={(e) => setFeatures(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            name="ingredients"
                            label="Thành phần"
                            rules={[{ required: true, message: 'Vui lòng nhập thành phần sản phẩm!' }]}
                        >
                            <TextArea
                                rows={3}
                                placeholder="Nhập thành phần sản phẩm"
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} size="large">
                                {loading ? "Đang gửi..." : "Tạo sản phẩm"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Space>
        </div>
    );
}