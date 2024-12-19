import { Link } from "react-router-dom";
import Avatar from "./Avatar";
interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}
function BlogCard({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
      <div className="max-w-screen-lg border-b-1 border-b border-slate-300 px-2 pt-2 pb-5 hover:cursor-pointer">
        <div className="flex gap-x-2">
          <div className="flex flex-col justify-center">
            <Avatar initial={authorName[0].toUpperCase()} size="small" />
          </div>

          <div className="text-sm">{authorName} </div>
          <div className="text-sm font-light text-slate-600">
            • {publishedDate}
          </div>
        </div>
        <div className="text-2xl font-bold mt-4">{title}</div>
        <div className="mt-2 text-md text-slate-600 mb-8">
          {content.slice(0, 250) + "....."}
        </div>
        <span className="text-sm text-slate-700 bg-slate-200 rounded-lg px-2 py-0.5">{`${Math.ceil(
          content.length / 100
        )} min read`}</span>
      </div>
    </Link>
  );
}

export default BlogCard;
