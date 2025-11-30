import { fn } from "storybook/test";

import NoteSiderbar from "./note-sidebar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "App/Note/NoteSiderbar",
  component: NoteSiderbar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
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
