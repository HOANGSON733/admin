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
    const [features, setFeatures] = useState<string[]>([]);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [featureInput, setFeatureInput] = useState('');
    const [ingredientInput, setIngredientInput] = useState('');
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
            if (features.length > 0) {
                features.forEach(feature => {
                    formData.append("features[]", feature);
                });
            }

            // Thêm danh sách thành phần
            if (ingredients.length > 0) {
                ingredients.forEach(ingredient => {
                    formData.append("ingredients[]", ingredient);
                });
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

    const handleFeatureAdd = useCallback(() => {
        if (!featureInput.trim()) return;
        setFeatures(prev => [...prev, featureInput]);
        setFeatureInput('');
    }, [featureInput]);

    const handleIngredientAdd = useCallback(() => {
        if (!ingredientInput.trim()) return;
        setIngredients(prev => [...prev, ingredientInput]);
        setIngredientInput('');
    }, [ingredientInput]);

    const removeFeature = useCallback((index: number) => {
        setFeatures(prev => prev.filter((_, i) => i !== index));
    }, []);

    const removeIngredient = useCallback((index: number) => {
        setIngredients(prev => prev.filter((_, i) => i !== index));
    }, []);

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

                        <Row gutter={16}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="weight"
                                    label="Trọng lượng"
                                    rules={[{ required: true, message: 'Vui lòng nhập trọng lượng!' }]}
                                >
                                    <Input placeholder="Ví dụ: 100g" />
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
                                        <Select.Option value="weak">Yếu</Select.Option>
                                        <Select.Option value="medium">Trung bình</Select.Option>
                                        <Select.Option value="strong">Mạnh</Select.Option>
                                        <Select.Option value="very_strong">Rất mạnh</Select.Option>
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
                                        <Select.Option value="matte">Lì</Select.Option>
                                        <Select.Option value="low_shine">Ánh nhẹ</Select.Option>
                                        <Select.Option value="medium_shine">Bóng vừa</Select.Option>
                                        <Select.Option value="high_shine">Rất bóng</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>


                        <Form.Item
                            name="expiry"
                            label="Hạn sử dụng"
                            rules={[{ required: true, message: 'Vui lòng nhập hạn sử dụng!' }]}
                        >
                            <Input placeholder="Ví dụ: 36 tháng kể từ ngày sản xuất" />
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

                        <Divider orientation="left">Tính năng</Divider>
                        <Space style={{ marginBottom: 16, width: '100%' }}>
                            <Input
                                placeholder="Nhập tính năng sản phẩm"
                                value={featureInput}
                                onChange={(e) => setFeatureInput(e.target.value)}
                                onPressEnter={handleFeatureAdd}
                                style={{ flex: 1 }}
                            />
                            <Button
                                type="primary"
                                onClick={handleFeatureAdd}
                                icon={<PlusOutlined />}
                            >
                                Thêm
                            </Button>
                        </Space>
                        <Space wrap>
                            {features.map((feature, index) => (
                                <Tag
                                    key={index}
                                    closable
                                    onClose={() => removeFeature(index)}
                                >
                                    {feature}
                                </Tag>
                            ))}
                        </Space>

                        <Divider orientation="left">Thành phần</Divider>
                        <Space style={{ marginBottom: 16, width: '100%' }}>
                            <Input
                                placeholder="Nhập thành phần sản phẩm"
                                value={ingredientInput}
                                onChange={(e) => setIngredientInput(e.target.value)}
                                onPressEnter={handleIngredientAdd}
                                style={{ flex: 1 }}
                            />
                            <Button
                                type="primary"
                                onClick={handleIngredientAdd}
                                icon={<PlusOutlined />}
                            >
                                Thêm
                            </Button>
                        </Space>
                        <Space wrap>
                            {ingredients.map((ingredient, index) => (
                                <Tag
                                    key={index}
                                    closable
                                    onClose={() => removeIngredient(index)}
                                >
                                    {ingredient}
                                </Tag>
                            ))}
                        </Space>

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