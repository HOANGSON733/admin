"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createBanner, updateBanner, getBannerById } from "@/lib/banner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { notification } from "antd";

interface BannerFormProps {
  id?: number;
  isEdit?: boolean;
}

const BannerForm: React.FC<BannerFormProps> = ({ id, isEdit = false }) => {
  const { id: paramId } = useParams(); // Lấy ID từ URL
  const router = useRouter(); // Thay thế next/router
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  // Lấy ID từ props hoặc từ URL (ưu tiên props)
  const bannerId = id ?? Number(paramId);

  useEffect(() => {
    if (isEdit && bannerId) {
      const fetchBanner = async () => {
        try {
          const data = await getBannerById(bannerId);
          setTitle(data.title);
          setPreviewImage(data.image);
        } catch (error) {
          api.error({
            message: "Lỗi",
            description: "Không thể tải dữ liệu banner.",
          });
        }
      };
      fetchBanner();
    }
  }, [bannerId, isEdit]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      // Hiển thị ảnh xem trước
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      if (imageFile) {
        formData.append("image", imageFile);
      }
      if (isEdit && bannerId) {
        await updateBanner(bannerId, formData);
        api.success({
          message: "Thành công",
          description: "Banner đã được cập nhật thành công.",
        });
      } else {
        await createBanner(formData);
        api.success({
          message: "Thành công",
          description: "Banner đã được tạo thành công.",
        });
      }

      router.push("/banner"); // Chuyển trang sau khi xử lý xong
    } catch (error) {
      api.error({
        message: "Lỗi",
        description: isEdit ? "Không thể cập nhật banner." : "Không thể tạo banner.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {contextHolder}
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>{isEdit ? "Chỉnh sửa Banner" : "Tạo Banner Mới"}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tiêu đề banner"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Hình ảnh</Label>
              <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer" />

              {previewImage && (
                <div className="mt-4">
                  <p className="text-sm mb-2">Xem trước:</p>
                  <div className="relative h-40 w-full">
                    <img src={previewImage} alt="Xem trước" className="object-contain w-full h-full border rounded" />
                  </div>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/banner")}>
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Đang xử lý..." : isEdit ? "Cập nhật Banner" : "Tạo Banner"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default BannerForm;
