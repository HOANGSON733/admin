import { Post } from "../types/post";

const Posts: Post[] = [
  {
    id: 1,
    title: "Hướng dẫn sử dụng React hiệu quả",
    author: "Nguyễn Văn A",
    date: "2025-03-03",
    comments: [
      { id: 1, text: "Bài viết rất hữu ích!", username: "hoang123" },
      { id: 2, text: "Cảm ơn tác giả đã chia sẻ.", username: "linhnguyen" },
    ],
  },
  {
    id: 2,
    title: "Tối ưu hiệu suất với Next.js",
    author: "Trần B",
    date: "2025-02-25",
    comments: [
      { id: 3, text: "Mình đã thử và rất hiệu quả!", username: "devhieu" },
    ],
  },
  {
    id: 3,
    title: "Lập trình TypeScript cho người mới",
    author: "Phạm C",
    date: "2025-03-20",
    comments: [
      { id: 4, text: "Rất chi tiết và dễ hiểu!", username: "anhlaptrinh" },
      { id: 5, text: "Cần thêm ví dụ về interface!", username: "baonguyen" },
    ],
  },
  {
    id: 4,
    title: "Sử dụng Tailwind CSS trong dự án React",
    author: "Lê D",
    date: "2025-02-15",
    comments: [
      { id: 6, text: "Tailwind rất tiện lợi!", username: "tuanle" },
    ],
  },
  {
    id: 5,
    title: "Xây dựng REST API với NestJS",
    author: "Vũ E",
    date: "2025-02-10",
    comments: [
      { id: 7, text: "NestJS giúp code backend nhanh hơn hẳn!", username: "khanhpham" },
      { id: 8, text: "Có phần nào hướng dẫn bảo mật không?", username: "minhdao" },
    ],
  },
  {
    id: 6,
    title: "Sử dụng Prisma để quản lý Database",
    author: "Ngô F",
    date: "2025-02-05",
    comments: [
      { id: 9, text: "Prisma rất dễ dùng!", username: "huytran" },
    ],
  },
  {
    id: 7,
    title: "So sánh Redux Toolkit và Zustand",
    author: "Đặng G",
    date: "2025-02-01",
    comments: [
      { id: 10, text: "Mình thích Zustand hơn, gọn hơn Redux!", username: "tientran" },
      { id: 11, text: "Redux Toolkit vẫn mạnh hơn ở dự án lớn.", username: "hoangnam" },
    ],
  },
  {
    id: 8,
    title: "Hướng dẫn cài đặt ESLint & Prettier trong VSCode",
    author: "Hoàng H",
    date: "2025-01-28",
    comments: [
      { id: 12, text: "Nhờ bài viết này mà code mình sạch hơn.", username: "longvu" },
    ],
  },
  {
    id: 9,
    title: "Lập trình Backend với Express.js",
    author: "Bùi I",
    date: "2025-01-20",
    comments: [
      { id: 13, text: "Express rất linh hoạt, mình thích!", username: "hanhphuc" },
      { id: 14, text: "Bạn có bài viết nào về Middleware không?", username: "baohoang" },
    ],
  },
  {
    id: 10,
    title: "Tạo trang web động với Next.js App Router",
    author: "Trịnh K",
    date: "2025-01-15",
    comments: [
      { id: 15, text: "Cảm ơn bài viết rất chi tiết!", username: "thanhhai" },
    ],
  },
];

export default Posts;
