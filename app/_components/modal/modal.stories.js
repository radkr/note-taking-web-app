import { fn } from "storybook/test";

import Modal from "./modal";
import { IconArchive } from "@/app/_components/icons";
import { IconDelete } from "@/app/_components/icons";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Common/Modal",
  component: Modal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  decorators: [
    (Story) => (
      <div id="modal-root" height="100px" width="100px">
        <Story />
      </div>
    ),
  ],
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
    open: true,
    onClose: fn(),
    variant: false,
    Icon: IconArchive,
    title: "Archive Note",
    content:
      "Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.",
    onConfirm: fn(),
  },
};

export const Variant = {
  args: {
    open: true,
    onClose: fn(),
    variant: true,
    Icon: IconDelete,
    title: "Delete Note",
    content:
      "Are you sure you want to permanently delete this note? This action cannot be undone.",
    onConfirm: fn(),
  },
};
