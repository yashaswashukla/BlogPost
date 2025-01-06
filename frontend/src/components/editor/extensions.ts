import { Underline } from "@tiptap/extension-underline";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import StarterKit from "@tiptap/starter-kit";
import Strike from "@tiptap/extension-strike";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Link from "@tiptap/extension-link";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";

import { all, createLowlight } from "lowlight";

const contentExtensions = [
  StarterKit.configure({
    codeBlock: false,
  }),
  Strike,
  Underline,
  Subscript,
  Superscript,
  CodeBlockLowlight.configure({
    lowlight: createLowlight(all),
  }),
  Heading.configure({
    levels: [1, 2, 3],
  }),
  BulletList,
  ListItem,
  OrderedList,
  TaskList,
  TaskItem,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  Link,
  Placeholder.configure({
    placeholder: "Enter your Story...",
  }),
];
const CustomDocument = Document.extend({
  content: "heading block*",
});
const titleExtensions = [
  CustomDocument,
  StarterKit.configure({
    document: false,
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return "What’s the title?";
      }

      return "Can you add some further context?";
    },
  }),
];

export { contentExtensions, titleExtensions };
