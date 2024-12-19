import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";
import TextSkeleton from "../skeletons/CardSkeleton";

function Blogs() {
  const { blogs, loading } = useBlogs();

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
      <div className="flex justify-center mt-20">
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
          <BlogCard
            id={"12121212121"}
            authorName="Peter V"
            title="What is lorem Ipsum"
            content="ishal Mega Mart IPO Allotment: The initial public offering (IPO) of hypermarket chain operator Vishal Mega Mart Ltd received strong response from investors. After the end of bidding period, Vishal Mega Mart IPO allotment status is also in the public domain.Vishal Mega Mart Limited has finalised the basis of share allotment and in the wake of the ‘T+3’ listing rule, the public issue must be listed within three days after the end of subscription period.As Vishal Mega Mart IPO allotment status is out, the company will credit the shares into the demat accounts of eligible allottees and initiate refunds to unsuccessful bidders on Tuesday as Vishal Mega Mart IPO listing date is most likely on Wednesday, December 18, 2024."
            publishedDate=""
          />
        </div>
      </div>
    </div>
  );
}

export default Blogs;
