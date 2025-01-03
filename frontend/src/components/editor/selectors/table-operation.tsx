import {
  Heading,
  ChevronDown,
  TableCellsMerge,
  TableCellsSplit,
  type LucideIcon,
} from "lucide-react";
import { IconType } from "react-icons";
import {
  TbColumnInsertLeft,
  TbColumnInsertRight,
  TbRowInsertBottom,
  TbRowInsertTop,
} from "react-icons/tb";
import { RiDeleteColumn, RiDeleteRow } from "react-icons/ri";
import { Editor } from "@tiptap/core";

import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components//ui/popover";
import { Button } from "@/components//ui/button";

export type SelectorItem = {
  name: string;
  icon: LucideIcon | IconType;
  command: (editor: Editor) => void;
};

const items: SelectorItem[] = [
  {
    name: "Insert Column Left",
    icon: TbColumnInsertLeft,
    command: (editor) => editor.chain().focus().addColumnBefore().run(),
  },
  {
    name: "Insert Column Right",
    icon: TbColumnInsertRight,
    command: (editor) => editor.chain().focus().addColumnAfter().run(),
  },
  {
    name: "Delete Column",
    icon: RiDeleteColumn,
    command: (editor) => editor.chain().focus().deleteColumn().run(),
  },
  {
    name: "Insert Row Up",
    icon: TbRowInsertTop,
    command: (editor) => editor.chain().focus().addRowBefore().run(),
  },
  {
    name: "Insert Row Down",
    icon: TbRowInsertBottom,
    command: (editor) => editor.chain().focus().addRowAfter().run(),
  },
  {
    name: "Delete Row",
    icon: RiDeleteRow,
    command: (editor) => editor.chain().focus().deleteRow().run(),
  },
  {
    name: "Merge Cells",
    icon: TableCellsMerge,
    command: (editor) => editor.chain().focus().mergeCells().run(),
  },
  {
    name: "Split Cells",
    icon: TableCellsSplit,
    command: (editor) => editor.chain().focus().splitCell().run(),
  },
  {
    name: "Toggle Header",
    icon: Heading,
    command: (editor) => editor.chain().focus().toggleHeaderCell().run(),
  },
];

interface NodeSelectorProps {
  open: boolean;
  editor: Editor;
  onOpenChange: (open: boolean) => void;
}

export const TableOperations = ({
  open,
  onOpenChange,
  editor,
}: NodeSelectorProps) => {
  if (!editor) return null;

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger
        asChild
        className="gap-2 rounded-none border-none hover:bg-accent focus:ring-0"
      >
        <Button size="sm" variant="ghost" className="gap-2">
          <span className="whitespace-nowrap text-sm">Table Operation</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={10} align="start" className="w-38">
        <div className="grid grid-cols-3 gap-2">
          {items.map((item, index) => (
            <button
              title={item.name}
              className="hover:bg-accent rounded-md p-1 border border-gray-200"
              onClick={() => {
                item.command(editor);
                onOpenChange(false);
              }}
              key={index}
            >
              <div className="flex w-full justify-center">
                <item.icon className={`h-7 w-7`} />
              </div>
            </button>
          ))}
          <Button variant="destructive" className="mt-1 col-span-3">
            Delete Table
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
