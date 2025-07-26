import CheckList from "@editorjs/checklist";
import Code from "@editorjs/code";
import Embed from "@editorjs/embed";
import InlineCode from "@editorjs/inline-code";
import Hyperlink from "editorjs-hyperlink";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import Image from "@editorjs/image";

const EDITOR_CONFIG = {
  header: {
    class: Header,
    config: {
      placeholder: "Enter a Heading",
      levels: [1, 2, 3, 4],
      defaultLevel: 1,
    },
  },
  code: Code,
  hyperlink: {
    class: Hyperlink,
    config: {
      shortcut: "CMD+k",
      target: "_blank",
      rel: "nofollow",
      availableTargets: ["_blank", "_self"],
      availableRels: ["author", "noreferrer"],
      validate: false,
    },
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  checklist: CheckList,
  embed: Embed,
  inlineCode: InlineCode,
  list: {
    class: List,
    inlineToolbar: true,
  },
  qoute: Quote,
};

export { EDITOR_CONFIG };
