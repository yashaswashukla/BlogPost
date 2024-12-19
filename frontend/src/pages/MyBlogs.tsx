import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import { useMyBlog } from "../hooks";
import TextSkeleton from "../skeletons/CardSkeleton";

function MyBlogs() {
  const { loading, blogs } = useMyBlog();
  const getMultipleSkeletons = () => {
    const list = [];
    for (let i = 0; i < 5; i++) list.push(<TextSkeleton />);
    return list;
  };
  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="grid grid-cols-1 mt-20 px-48">
          {getMultipleSkeletons()}
        </div>
      </div>
    );
  }
  return (
    <div>
      <AppBar />
      <div className="text-5xl font-bold mt-32 flex justify-center">
        Your Blogs
      </div>
      <div className="flex justify-center mt-10">
        <div className="flex-col justify-center">
          {blogs.map((ele) => {
            return (
              <div className="mb-5">
                <BlogCard
                  id={ele.id}
                  authorName={ele.author.name}
                  title={ele.title}
                  content={ele.content}
                  publishedDate=""
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;
