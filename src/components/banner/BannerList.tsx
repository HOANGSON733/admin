// src/components/Banner/BannerList.tsx
import React, { useEffect, useState } from 'react';
import { getBanners, deleteBanner } from '@/lib/api/banner';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/toast';
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

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const data = await getBanners();
      setBanners(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load banners",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      try {
        await deleteBanner(id);
        toast({
          title: "Success",
          description: "Banner deleted successfully",
        });
        fetchBanners();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete banner",
          variant: "destructive",
        });
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading banners...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Banners</h1>
        <Link href="/banners/create">
          <Button>Add New Banner</Button>
        </Link>
      </div>

      {banners.length === 0 ? (
        <p className="text-center text-gray-500">No banners found</p>
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
                    <p className="text-gray-400">No image</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2 p-4">
                <Link href={`/banners/edit/${banner.id}`}>
                  <Button variant="outline" size="sm">
                    <Pencil className="h-4 w-4 mr-2" /> Edit
                  </Button>
                </Link>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleDelete(banner.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
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