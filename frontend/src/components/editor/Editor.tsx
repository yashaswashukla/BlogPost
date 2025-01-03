import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import extensions from "./extensions";
import SideMenu from "./SideMenu";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { TextButtons } from "./selectors/text-button";
import { TableOperations } from "./selectors/table-operation";
import parse from "html-react-parser";
import "./Editor.css";

const content = ` <p>
          I like lists. Let’s add one:
        </p>
        <ul>
          <li>This is a bullet list.</li>
          <li>And it has three list items.</li>
          <li>Here is the third one.</li>
        </ul>`;

function Editor() {
  const [openNode, setOpenNode] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const editor = useEditor({
    content,
    extensions,

    editorProps: {
      attributes: {
        class: "prose prose-2xl focus:outline-none px-5 py-2",
      },
    },
  });
  const [data, setData] = useState<string>("");
  if (!editor) return <div>Hi from the main editor</div>;
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-2 flex flex-col gap-y-5 items-center">
        <SideMenu editor={editor} />
        <button
          className="bg-black text-white px-3 py-1 rounded-md"
          onClick={() => {
            const x = editor.getHTML();
            setData(x);
            console.log(x);
          }}
        >
          Send Data
        </button>
        <div className="prose prose-sm">{parse(data)}</div>
      </div>
      <div className="col-span-10 ">
        <EditorContent editor={editor} />

        <BubbleMenu
          editor={editor}
          className={`flex w-fit max-w-[90vw] border border-gray-100 bg-background shadow-xl`}
        >
          {/* <PopUpMenu editor={editor} /> */}
          <Separator orientation="vertical" />
          {editor.isActive("table") ? (
            <TableOperations
              open={openNode}
              onOpenChange={setOpenNode}
              editor={editor}
            />
          ) : (
            <NodeSelector
              open={openNode}
              onOpenChange={setOpenNode}
              editor={editor}
            />
          )}
          <Separator orientation="vertical" />
          <LinkSelector
            open={openLink}
            onOpenChange={setOpenLink}
            editor={editor}
          />
          <Separator orientation="vertical" />
          <TextButtons editor={editor} />
          <Separator orientation="vertical" />
        </BubbleMenu>

        {/* <button className="bg-black text-white px-5 py-2" onClick={sendData}>
        Submit
        </button> */}
      </div>
    </div>
  );
}

export default Editor;
