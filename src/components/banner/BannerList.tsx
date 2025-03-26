// src/components/Banner/BannerList.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { getBanners, deleteBanner } from '@/lib/banner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from 'antd';
import { notification } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';

export interface Banner {
  id: number;
  title: string;
  image: string;
}

const BannerList: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [api, contextHolder] = notification.useNotification();
   
    
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const data = await getBanners();
      console.log("data",data);
      
      setBanners(data);
    } catch (error) {
      api.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách banner.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa banner này?')) {
      try {
        await deleteBanner(id);
        api.success({
          message: 'Thành công',
          description: 'Banner đã được xóa thành công.',
        });
        fetchBanners();
      } catch (error) {
        api.error({
          message: 'Lỗi',
          description: 'Không thể xóa banner.',
        });
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Đang tải danh sách banner...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {contextHolder}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Banners</h1>
        <Link href="/banner/create">
          <Button type="primary">Thêm Banner</Button>
        </Link>
      </div>

      {banners.length === 0 ? (
        <p className="text-center text-gray-500">Không có banner nào</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <Card key={banner.id} className="overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{banner.title}</CardTitle>
                <div className="text-sm text-gray-500">ID: {banner.id}</div>
              </CardHeader>
              <CardContent className="p-0">
                {banner.image ? (
                  <div className="relative h-48 w-full">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-100 h-48 w-full flex items-center justify-center">
                    <p className="text-gray-400">Không có hình ảnh</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2 p-4">
                <Link href={`/banner/edit/${banner.id}`}>
                  <Button type="default" size="small" icon={<Pencil className="h-4 w-4" />}>
                    Sửa
                  </Button>
                </Link>
                <Button
                  type="primary"
                  danger
                  size="small"
                  icon={<Trash2 className="h-4 w-4" />}
                  onClick={() => handleDelete(banner.id)}
                >
                  Xóa
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerList;
