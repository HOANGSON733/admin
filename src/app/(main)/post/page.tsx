import PostTable from "@/components/Post/post";
import PostPagination from "@/components/Post/postPagination";
import GoBack from "@/components/go-back";

const PostPage = () => {
  return (
    <div>
      <GoBack text="Back" link="/"/>
      <PostTable />
      <PostPagination />
    </div>
  );
};
export default PostPage;