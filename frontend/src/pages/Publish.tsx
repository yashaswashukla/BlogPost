import { ChangeEvent, useRef, useState } from "react";
import AppBar from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import PublishSkeleton from "../skeletons/PublishSkeleton";
import { useNavigate } from "react-router-dom";

function Publish() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleBox = useRef(null);
  const contentBox = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setLoading(false);
      navigate(`/blog/${response.data.id}`);
    } catch (error) {}
  };
  return (
    <div>
      <AppBar sendData={sendData} publish={true} />
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
            onChange={(e) => {
              setTitle(e.target.value);
              const curr = titleBox.current;
              curr.style.height = "auto";
              curr.style.height = `${curr.scrollHeight}px`;
            }}
            placeholder="Title"
            className="w-full resize-none focus:outline-none placeholder:text-5xl placeholder:font-extralight pt-2 pl-2 text-slate-500 text-5xl overflow:hidden"
          />
        </div>
        <textarea
          ref={contentBox}
          onChange={(e) => {
            setContent(e.target.value);
            const curr = contentBox.current;
            curr.style.height = "auto";
            curr.style.height = `${curr.scrollHeight}px`;
          }}
          placeholder="Enter your story here..."
          className="w-full resize-none focus:outline-none h-screen placeholder:text-xl placeholder:font-extralight text-xl resize:none mt-10 ml-14"
        />
      </div>
      {loading && <PublishSkeleton />}
    </div>
  );
}

export default Publish;
