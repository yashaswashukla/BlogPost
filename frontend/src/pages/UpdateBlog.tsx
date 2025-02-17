import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import PublishSkeleton from "../skeletons/PublishSkeleton";
import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import FullBlogSkeleton from "../skeletons/FullBlogSkeleton";

//Editor Imports
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import {
  contentExtensions,
  titleExtensions,
} from "../components/editor/extensions";
import SideMenu from "../components/editor/SideMenu";
import { Separator } from "../components/ui/separator";
import { NodeSelector } from "../components/editor/selectors/node-selector";
import { LinkSelector } from "../components/editor/selectors/link-selector";
import { TextButtons } from "../components/editor/selectors/text-button";
import { TableOperations } from "../components/editor/selectors/table-operation";
import "../components/editor/Editor.css";

function UpdateBlog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sendLoading, setSendLoading] = useState(false);

  const { blog, loading } = useBlog({ id: id || "" });

  const [openNode, setOpenNode] = useState(false);
  const [openLink, setOpenLink] = useState(false);

  useEffect(() => {
    titleEditor?.commands.setContent(blog?.title || "");
    contentEditor?.commands.setContent(blog?.content || "");
  }, [blog]);

  const titleEditor = useEditor({
    extensions: titleExtensions,
    editorProps: {
      attributes: {
        class: "prose prose-2xl focus:outline-none px-5 py-2",
      },
    },
  });
  const contentEditor = useEditor({
    extensions: contentExtensions,
    editorProps: {
      attributes: {
        class: "prose prose-2xl focus:outline-none px-5 py-2",
      },
    },
  });
  if (!contentEditor || !titleEditor) {
    return <FullBlogSkeleton />;
  }

  const updateData = async () => {
    const title = titleEditor.getHTML();
    const content = contentEditor.getHTML();
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
    } catch (err) {
      console.log(err);
    }
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
      <div className="mt-36 px-32">
        <div className="fixed top-44">
          <SideMenu editor={contentEditor} />
        </div>
        <div className="ml-28  border-l border-gray-200">
          <EditorContent editor={titleEditor} />
          <div className="">
            <EditorContent editor={contentEditor} />

            <BubbleMenu
              editor={contentEditor}
              className={`flex w-fit max-w-[90vw] border border-gray-100 bg-background shadow-xl`}
            >
              <Separator orientation="vertical" />
              {contentEditor.isActive("table") ? (
                <TableOperations
                  open={openNode}
                  onOpenChange={setOpenNode}
                  editor={contentEditor}
                />
              ) : (
                <NodeSelector
                  open={openNode}
                  onOpenChange={setOpenNode}
                  editor={contentEditor}
                />
              )}
              <Separator orientation="vertical" />
              <LinkSelector
                open={openLink}
                onOpenChange={setOpenLink}
                editor={contentEditor}
              />
              <Separator orientation="vertical" />
              <TextButtons editor={contentEditor} />
              <Separator orientation="vertical" />
            </BubbleMenu>
          </div>
        </div>
      </div>
      {sendLoading && <PublishSkeleton />}
    </div>
  );
}

export default UpdateBlog;
