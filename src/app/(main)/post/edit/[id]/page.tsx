"use client";
import BackButton from "@/components/go-back";
import { z } from "zod";
import Posts from "@/data/posts";
import { use } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "sonner";  // ✅ Đúng cách

const fromSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    body: z.string().min(1, { message: 'Body is required' }),
    author: z.string().min(1, { message: 'Author is required' }),
    date: z.string().min(1, { message: 'Date is required' })
});

const PostEditPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const post = Posts.find((post) => post.id === parseInt(id));

    const form = useForm<z.infer<typeof fromSchema>>({
        resolver: zodResolver(fromSchema),
        defaultValues: {
            title: post?.title || '',
            body: post?.body || '',
            author: post?.author || '',
            date: post?.date || '',
        }
    });

    const handleSubmit = (data: z.infer<typeof fromSchema>) => {
        console.log(data);
        toast.success('Post updated successfully');  // ✅ Hiển thị thông báo
    };

    return (
        <div className="mt-10 bg-white p-6">
            <Toaster />  {/* ✅ Đảm bảo toast hiển thị */}
            <div className="flex mb-4">
                <BackButton text="Back" link="/post" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Edit Post</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 font-medium">Title</FormLabel>
                                <FormControl>
                                    <Input
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                                        placeholder="Enter Title..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="body"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 font-medium">Body</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                                        placeholder="Enter Body..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 font-medium">Author</FormLabel>
                                <FormControl>
                                    <Input
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                                        placeholder="Enter Author..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 font-medium">Date</FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 rounded-md transition"
                    >
                        Update Post
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default PostEditPage;
