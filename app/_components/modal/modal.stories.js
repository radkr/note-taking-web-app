import { fn } from "storybook/test";

import Modal from "./modal";
import { IconArchive } from "@/app/_components/icons";
import { IconDelete } from "@/app/_components/icons";

export default {
  title: "Common/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div id="modal-root" height="100px" width="100px">
        <Story />
      </div>
    ),
  ],
};

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
