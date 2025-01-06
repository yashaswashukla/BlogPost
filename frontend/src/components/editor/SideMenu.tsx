import { Editor } from "@tiptap/core";
import {
  CirclePlus,
  Code,
  Heading1,
  Heading2,
  ImagePlus,
  List,
  ListOrdered,
  LucideIcon,
  TextQuote,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";

interface propType {
  editor: Editor;
}
interface SelectorItem {
  name: string;
  icon: LucideIcon;
  command: (editor: Editor) => void;
  isActive: (editor: Editor) => void;
}
const items: SelectorItem[] = [
  {
    name: "Heading",
    icon: Heading1,
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleHeading({ level: 2 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 2 }),
  },
  {
    name: "Sub Heading",
    icon: Heading2,
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleHeading({ level: 3 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 3 }),
  },
  {
    name: "Bullet List",
    icon: List,
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleBulletList().run(),
    isActive: (editor) => editor.isActive("bulletList"),
  },
  {
    name: "Numbered List",
    icon: ListOrdered,
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive("orderedList"),
  },
  {
    name: "Quote",
    icon: TextQuote,
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive("blockquote"),
  },
  {
    name: "Code",
    icon: Code,
    command: (editor) => {
      editor.chain().focus().toggleCodeBlock().run();
    },
    isActive: (editor) => editor.isActive("codeBlock"),
  },
  {
    name: "Image",
    icon: ImagePlus,
    command: (editor) => editor.chain().focus().clearNodes().toggleBold().run(),
    isActive: (editor) => editor.isActive("codeBlock"),
  },
];

function SideMenu({ editor }: propType) {
  const [open, setOpen] = useState<boolean>(false);
  if (!editor) return <div>Hi from the side menu</div>;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <div className="mt-20 flex justify-center">
          <CirclePlus
            size={50}
            strokeWidth={1}
            color="#22c55e"
            className={`transition-transform duration-150 ease-in-out ${
              open ? "rotate-45" : ""
            }`}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="grid grid-cols-1 w-28 xl:w-fit p-1">
        {items.map((item) => (
          <button
            className="hover:bg-accent px-1 py-1 rounded-md"
            onClick={() => {
              item.command(editor);
            }}
          >
            <div className="flex items-center gap-x-2">
              <div className="rounded-sm border p-1">
                <item.icon className="h-5 w-5" />
              </div>
              <span className="truncate">{item.name}</span>
            </div>
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export default SideMenu;
