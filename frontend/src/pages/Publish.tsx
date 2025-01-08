import { useState } from "react";
import AppBar from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import PublishSkeleton from "../skeletons/PublishSkeleton";
import { useNavigate } from "react-router-dom";

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

function Publish() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [openNode, setOpenNode] = useState(false);
  const [openLink, setOpenLink] = useState(false);

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
    return <PublishSkeleton />;
  }
  const sendData = async () => {
    const title = titleEditor.getHTML();
    const content = contentEditor.getHTML();
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
    } catch (error) {
      //show a pop-up
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-y-32 ">
      <AppBar sendData={sendData} publish={true} label="Publish" />
      <div className="px-32 ">
        <div className="fixed top-44">
          <SideMenu editor={contentEditor} />
        </div>
        <div className="ml-28  border-l border-gray-200">
          <EditorContent editor={titleEditor} />
          <div className="h-screen">
            <EditorContent editor={contentEditor} />

            <BubbleMenu
              editor={contentEditor}
              className={`flex w-fit max-w-[90vw] border border-gray-100 bg-background shadow-xl`}
            >
              {/* <PopUpMenu editor={editor} /> */}
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
      {loading && <PublishSkeleton />}
    </div>
  );
}

export default Publish;
