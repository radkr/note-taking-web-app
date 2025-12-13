import { fn } from "storybook/test";

import NoteSiderbar from "./note-sidebar";

export default {
  title: "App/Note/NoteSiderbar",
  component: NoteSiderbar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export const ForActiveNote = {
  args: {
    onArchive: fn(),
    onRestore: fn(),
    onDelete: fn(),
    isDisabled: false,
    isArchived: false,
  },
};

export const ForArchivedNote = {
  args: {
    onArchive: fn(),
    onRestore: fn(),
    onDelete: fn(),
    isDisabled: false,
    isArchived: true,
  },
};

export const Disabled = {
  args: {
    onArchive: fn(),
    onRestore: fn(),
    onDelete: fn(),
    isDisabled: true,
    isArchived: false,
  },
};
