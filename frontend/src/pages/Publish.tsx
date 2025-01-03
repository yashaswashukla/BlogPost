import { useRef, useState } from "react";
import AppBar from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import PublishSkeleton from "../skeletons/PublishSkeleton";
import { useNavigate } from "react-router-dom";
import Editor from "../components/editor/Editor";

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
      <AppBar sendData={sendData} publish={true} label="Publish" />
      <div className="mt-40 ml-44 mr-52">
        <div className="flex divide-x-2 divide-slate-200">
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
        <Editor />
      </div>
      {loading && <PublishSkeleton />}
    </div>
  );
}

export default Publish;
