import { Post } from "../types/post";

const Posts: Post[] = [
  {
    id: 1,
    title: "Hướng dẫn sử dụng React hiệu quả",
    author: "Nguyễn Văn A",
    body: "React là một thư viện JavaScript phổ biến nhất hiện nay, giúp xây dựng các ứng dụng web hiện đại. Trong bài viết này, chúng ta sẽ tìm hiểu cách sử dụng React hiệu quả nhất.",
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
    body: "Next.js là một framework React phổ biến giúp xây dựng các ứng dụng web hiệu quả. Trong bài viết này, chúng ta sẽ tìm hiểu cách tối ưu hiệu suất với Next.js.",
    date: "2025-02-25",
    comments: [
      { id: 3, text: "Mình đã thử và rất hiệu quả!", username: "devhieu" },
    ],
  },
  {
    id: 3,
    title: "Lập trình TypeScript cho người mới",
    author: "Phạm C",
    body: "TypeScript là một ngôn ngữ lập trình phổ biến hiện nay, giúp xây dựng các ứng dụng JavaScript lớn. Trong bài viết này, chúng ta sẽ tìm hiểu cách bắt đầu lập trình TypeScript cho người mới.",
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
    body: "Tailwind CSS là một thư viện CSS phổ biến giúp thiết kế giao diện web nhanh chóng. Trong bài viết này, chúng ta sẽ tìm hiểu cách sử dụng Tailwind CSS trong dự án React.",
    date: "2025-02-15",
    comments: [
      { id: 6, text: "Tailwind rất tiện lợi!", username: "tuanle" },
    ],
  },
  {
    id: 5,
    title: "Xây dựng REST API với NestJS",
    author: "Vũ E",
    body: "NestJS là một framework Node.js phổ biến giúp xây dựng các REST API mạnh mẽ. Trong bài viết này, chúng ta sẽ tìm hiểu cách xây dựng REST API với NestJS.",
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
    body: "Prisma là một ORM phổ biến giúp quản lý database dễ dàng hơn. Trong bài viết này, chúng ta sẽ tìm hiểu cách sử dụng Prisma trong dự án của bạn.",
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
    body: "Redux Toolkit và Zustand là hai thư viện quản lý state phổ biến trong React. Trong bài viết này, chúng ta sẽ so sánh Redux Toolkit và Zustand để chọn ra thư viện phù hợp với dự án của bạn.",
    comments: [
      { id: 10, text: "Mình thích Zustand hơn, gọn hơn Redux!", username: "tientran" },
      { id: 11, text: "Redux Toolkit vẫn mạnh hơn ở dự án lớn.", username: "hoangnam" },
    ],
  },
  {
    id: 8,
    title: "Hướng dẫn cài đặt ESLint & Prettier trong VSCode",
    author: "Hoàng H",
    body: "ESLint và Prettier là hai công cụ giúp kiểm tra và format code JavaScript hiệu quả. Trong bài viết này, chúng ta sẽ tìm hiểu cách cài đặt ESLint & Prettier trong VSCode.",
    date: "2025-01-28",
    comments: [
      { id: 12, text: "Nhờ bài viết này mà code mình sạch hơn.", username: "longvu" },
    ],
  },
  {
    id: 9,
    title: "Lập trình Backend với Express.js",
    author: "Bùi I",
    body: "Express.js là một framework Node.js phổ biến giúp xây dựng các ứng dụng backend hiệu quả. Trong bài viết này, chúng ta sẽ tìm hiểu cách lập trình backend với Express.js.",
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
    body: "Next.js App Router là một tính năng mới giúp tạo trang web động dễ dàng hơn. Trong bài viết này, chúng ta sẽ tìm hiểu cách tạo trang web động với Next.js App Router.",
    date: "2025-01-15",
    comments: [
      { id: 15, text: "Cảm ơn bài viết rất chi tiết!", username: "thanhhai" },
    ],
  },
];

export default Posts;
