

// src/components/Banner/BannerForm.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createBanner, updateBanner, getBannerById } from '@/lib/api/banner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/toast';

interface BannerFormProps {
  id?: number;
  isEdit?: boolean;
}

const BannerForm: React.FC<BannerFormProps> = ({ id, isEdit = false }) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      const fetchBanner = async () => {
        try {
          const data = await getBannerById(id);
          setTitle(data.title);
          setPreviewImage(data.image);
        } catch (error) {
          toast({
            title: 'Error',
            description: 'Failed to load banner data',
            variant: 'destructive',
          });
        }
      };
      fetchBanner();
    }
  }, [id, isEdit]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview
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
      formData.append('title', title);
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (isEdit && id) {
        await updateBanner(id, formData);
        toast({
          title: 'Success',
          description: 'Banner updated successfully',
        });
      } else {
        await createBanner(formData);
        toast({
          title: 'Success',
          description: 'Banner created successfully',
        });
      }
      
      router.push('/banners');
    } catch (error) {
      toast({
        title: 'Error',
        description: isEdit ? 'Failed to update banner' : 'Failed to create banner',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>{isEdit ? 'Edit Banner' : 'Create New Banner'}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter banner title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
              
              {previewImage && (
                <div className="mt-4">
                  <p className="text-sm mb-2">Preview:</p>
                  <div className="relative h-40 w-full">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="object-contain w-full h-full border rounded"
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/banners')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Processing...' : isEdit ? 'Update Banner' : 'Create Banner'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default BannerForm;