import { useEffect, useRef, useState } from "react";
import AppBar from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import PublishSkeleton from "../skeletons/PublishSkeleton";
import { useNavigate, useParams } from "react-router-dom";
import { useBlog, useDynamicTextArea } from "../hooks";
import FullBlogSkeleton from "../skeletons/FullBlogSkeleton";

function UpdateBlog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const titleBox = useRef<HTMLTextAreaElement>(null);
  const contentBox = useRef<HTMLTextAreaElement>(null);
  const [sendLoading, setSendLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { blog, loading } = useBlog({ id: id || "" });

  useDynamicTextArea(titleBox.current, title);
  useDynamicTextArea(contentBox.current, content);

  useEffect(() => {
    setTitle(blog?.title || "");
    setContent(blog?.content || "");
  }, [blog]);

  const updateData = async () => {
    try {
      setSendLoading(true);
      await axios.put(
        `${BACKEND_URL}/api/v1/blog`,
        {
          id,
          title,
          content,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setSendLoading(false);
      navigate(`/blog/${id}`);
    } catch (error) {}
  };

  if (loading) {
    return (
      <div className="max-w-screen-2xl px-40">
        <FullBlogSkeleton />
      </div>
    );
  }

  return (
    <div>
      <AppBar sendData={updateData} publish={true} label="Update" />
      <div className="mt-40 ml-44 mr-52">
        <div className="flex divide-x-2 divide-slate-200">
          <div className="flex flex-col justify-center mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="0.5"
              stroke="currentColor"
              className="size-12 stroke-slate-500 hover:stroke-cyan-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <textarea
            ref={titleBox}
            rows={1}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Title"
            className="w-full resize-none focus:outline-none placeholder:text-5xl placeholder:font-extralight pt-2 pl-2 text-slate-500 text-5xl overflow:hidden"
          />
        </div>
        <textarea
          ref={contentBox}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder="Enter your story here..."
          className="w-full resize-none focus:outline-none h-screen placeholder:text-xl placeholder:font-extralight text-xl resize:none mt-10 ml-14"
        />
      </div>
      {sendLoading && <PublishSkeleton />}
    </div>
  );
}

export default UpdateBlog;
