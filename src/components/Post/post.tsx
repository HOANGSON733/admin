import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption,
    TableCell
} from "@/components/ui/table";
import Posts from "@/data/posts";
import { Post } from "@/types/post";
import { Button } from "../ui/button";
import Link from "next/link";

interface PostTableProps {
    limit?: number;
    title?: string;
}

const PostTable = ({ title, limit }: PostTableProps) => {
    const sortedPosts = [...Posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const displayedPosts = limit ? sortedPosts.slice(0, limit) : sortedPosts;

    return (
        <div className="mt-10">
            <h3 className="text-2xl mb-4 font-semibold">{title ? title : "Posts"}</h3>
            <Table className="border border-gray-200 w-full">
                <TableCaption>Danh sách các bài viết</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-16">ID</TableHead>
                        <TableHead>Tiêu đề</TableHead>
                        <TableHead className="hiden md:table-cell">Tác giả</TableHead>
                        <TableHead className="hiden md:table-cell text-right">Ngày đăng</TableHead>
                        <TableHead className="text-center">View</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {displayedPosts.map((post: Post) => (
                        <TableRow key={post.id}>
                            <TableCell>{post.id}</TableCell>
                            <TableCell>{post.title}</TableCell>
                            <TableCell className="hiden md:table-cell">{post.author}</TableCell>
                            <TableCell className="hiden md:table-cell text-right">{post.date}</TableCell>
                            <TableCell className="text-center">
                                <Link href={`/post/edit/${post.id}`}>
                                    <Button className="bg-amber-600 hover:bg-amber-700">Edit</Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default PostTable;
