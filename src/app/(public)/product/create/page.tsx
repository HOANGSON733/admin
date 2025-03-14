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
    Tag
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function CreateProductPage() {
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

    const handleSubmit = async (values: any) => {
        setLoading(true);
        setError("");

        try {
            // Create FormData object
            const formData = new FormData();

            // Append basic fields
            const excludedKeys = ['images', 'gallery', 'features', 'ingredients'];
            Object.entries(values).forEach(([key, value]) => {
                if (!excludedKeys.includes(key) && value !== undefined) {
                    formData.append(key, value as string);
                }
            });

            // Append images
            fileList.forEach(file => {
                if (file.originFileObj) {
                    formData.append('images', file.originFileObj);
                }
            });

            // Append gallery images
            galleryFileList.forEach(file => {
                if (file.originFileObj) {
                    formData.append('gallery', file.originFileObj);
                }
            });

            // Append features
            features.forEach(feature => {
                formData.append('features', feature);
            });

            // Append ingredients
            ingredients.forEach(ingredient => {
                formData.append('ingredients', ingredient);
            });

            console.log("Dữ liệu gửi lên API:", formData);

            const response = await postProduct(formData);
            if (!response || response.error) {
                throw new Error(response?.error || 'Có lỗi xảy ra khi gửi dữ liệu.');
            }
            
            notification.success({
                message: 'Thành công',
                description: 'Sản phẩm đã được tạo thành công.',
            });
            
            router.push("/products");
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Có lỗi xảy ra khi gửi dữ liệu.');
            notification.error({
                message: 'Lỗi',
                description: err.message || 'Có lỗi xảy ra khi gửi dữ liệu.',
            });
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
                                name="oirginalPrice"
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

                        <div style={{ marginBottom: 16 }}>
                            <Input
                                placeholder="Nhập tính năng sản phẩm"
                                value={featureInput}
                                onChange={(e) => setFeatureInput(e.target.value)}
                                onPressEnter={handleFeatureAdd}
                                style={{ width: 'calc(100% - 110px)' }}
                            />
                            <Button
                                type="primary"
                                onClick={handleFeatureAdd}
                                style={{ marginLeft: 8 }}
                                icon={<PlusOutlined />}
                            >
                                Thêm
                            </Button>
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            {features.map((feature, index) => (
                                <Tag
                                    key={index}
                                    closable
                                    onClose={() => removeFeature(index)}
                                    style={{ marginBottom: 8 }}
                                >
                                    {feature}
                                </Tag>
                            ))}
                        </div>

                        <Divider orientation="left">Thành phần</Divider>

                        <div style={{ marginBottom: 16 }}>
                            <Input
                                placeholder="Nhập thành phần sản phẩm"
                                value={ingredientInput}
                                onChange={(e) => setIngredientInput(e.target.value)}
                                onPressEnter={handleIngredientAdd}
                                style={{ width: 'calc(100% - 110px)' }}
                            />
                            <Button
                                type="primary"
                                onClick={handleIngredientAdd}
                                style={{ marginLeft: 8 }}
                                icon={<PlusOutlined />}
                            >
                                Thêm
                            </Button>
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            {ingredients.map((ingredient, index) => (
                                <Tag
                                    key={index}
                                    closable
                                    onClose={() => removeIngredient(index)}
                                    style={{ marginBottom: 8 }}
                                >
                                    {ingredient}
                                </Tag>
                            ))}
                        </div>

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