import {
  ChevronDown,
  Heading2,
  TextQuote,
  ListOrdered,
  TextIcon,
  Code,
  CheckSquare,
  type LucideIcon,
  Heading1,
  List,
} from "lucide-react";
import { Editor } from "@tiptap/core";

import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components//ui/popover";
import { Button } from "@/components//ui/button";

export type SelectorItem = {
  name: string;
  icon: LucideIcon;
  command: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
};

const items: SelectorItem[] = [
  {
    name: "Text",
    icon: TextIcon,
    command: (editor) => editor.chain().focus().clearNodes().run(),
    isActive: (editor) => editor.isActive("paragraph"),
  },
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
    name: "To-do List",
    icon: CheckSquare,
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleTaskList().run(),
    isActive: (editor) => editor.isActive("taskItem"),
  },
  {
    name: "Bullet List",
    icon: ListOrdered,
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleBulletList().run(),
    isActive: (editor) => editor.isActive("bulletList"),
  },
  {
    name: "Numbered List",
    icon: List,
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
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive("codeBlock"),
  },
];

interface NodeSelectorProps {
  open: boolean;
  editor: Editor;
  onOpenChange: (open: boolean) => void;
}

export const NodeSelector = ({
  open,
  onOpenChange,
  editor,
}: NodeSelectorProps) => {
  if (!editor) return null;
  const activeItem = items.filter((item) => item.isActive(editor)).pop() ?? {
    name: "Multiple",
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger
        asChild
        className="gap-2 rounded-none border-none hover:bg-accent focus:ring-0"
      >
        <Button size="sm" variant="ghost" className="gap-2">
          <span className="whitespace-nowrap text-sm">{activeItem.name}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={10} align="start" className="w-48 p-1">
        <div className="flex flex-col gap-y-1">
          {items.map((item) => (
            <button
              className="hover:bg-accent px-1 py-1 rounded-md"
              onClick={() => {
                item.command(editor);
                onOpenChange(false);
              }}
            >
              <div className="flex items-center gap-x-2 gap-y-2">
                <div className="rounded-sm border p-1">
                  <item.icon className="h-3 w-3" />
                </div>
                <span>{item.name}</span>
              </div>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
