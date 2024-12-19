import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import FullBlogSkeleton from "../skeletons/FullBlogSkeleton";
import SideSkeleton from "../skeletons/SideSkeleton";
import Avatar from "../components/Avatar";
import AppBar from "../components/AppBar";

function FullBlog() {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id: id || "" });
  if (loading) {
    return (
      <div className="grid grid-cols-12">
        <div className="col-span-8">
          <FullBlogSkeleton />
        </div>
        <div className="col-span-4">
          <SideSkeleton />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <AppBar />
        <div className="grid grid-cols-12 mt-32">
          <div className="col-span-8 mt-10 px-40">
            <div className="text-5xl font-bold">{blog?.title}</div>
            <div className="text-lg text-slate-600 mt-5">
              posted on 3 Dec, 2024
            </div>
            <div className="text-xl mt-8">{blog?.content}</div>
          </div>
          <div className="col-span-4">
            <div className="mt-20 px-28">
              <div className="text-lg">Author</div>
              <div className="flex gap-x-4 mt-3">
                <div className="flex flex-col justify-center pr-2">
                  <Avatar initial={blog?.author.name[0] || ""} size="big" />
                </div>
                <div>
                  <div className="text-xl font-bold">{blog?.author.name}</div>
                  <div className="text-md text-slate-600">
                    Random catch phrase about the author to garner more
                    attention
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FullBlog;
