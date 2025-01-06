import { Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import "../components/editor/Editor.css";
import parse from "html-react-parser";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  update?: boolean;
}

function BlogCard({
  id,
  authorName,
  title,
  content,
  publishedDate,
  update,
}: BlogCardProps) {
  const navigate = useNavigate();
  return (
    <div className="max-w-screen-lg border-b-1 border-b border-slate-300 px-2 pt-2 pb-5 ">
      <Link to={`/blog/${id}`} className="hover:cursor-pointer">
        <div className="flex gap-x-2">
          <div className="flex flex-col justify-center">
            <Avatar initial={authorName[0].toUpperCase()} size="small" />
          </div>

          <div className="text-sm">{authorName} </div>
          <div className="text-sm font-light text-slate-600">
            • {publishedDate}
          </div>
        </div>
        <div className="text-2xl font-bold mt-4  truncate">{parse(title)}</div>
        <div className="mt-2 text-md text-slate-600 mb-6 line-clamp-3">
          {parse(content)}
        </div>
      </Link>
      <div className="flex gap-x-4">
        <div className="flex flex-col justify-center text-sm text-slate-700 bg-slate-200 rounded-lg px-2 py-0.5">{`${Math.ceil(
          content.length / 250
        )} min read`}</div>
        {update && (
          <button
            onClick={() => {
              navigate(`/updateBlog/${id}`);
            }}
            className="flex justify-center bg-slate-200 hover:bg-slate-300 rounded-lg px-3 py-1 transition ease-in-out duration-150 hover:scale-110 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default BlogCard;
