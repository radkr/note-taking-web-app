import { fn } from "storybook/test";

import NoteHeader from "./note-header";
import { NOTES, ACTIVE } from "@/app/_lib/app/use-app-state";
import { useAppState } from "@/app/_lib/app/use-app-state";
import { expect, mocked } from "storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "App/Note/NoteHeader",
  component: NoteHeader,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  beforeEach: async () => {
    // 👇 Force known, consistent behavior for mocked modules
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ACTIVE });
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ForActiveNote = {
  args: {
    onSave: fn(),
    onCancel: fn(),
    onDelete: fn(),
    onArchive: fn(),
    onRestore: fn(),
    isEdited: false,
    isDisabled: false,
    isArchived: false,
  },
};

export const ForEditedActiveNote = {
  args: {
    onSave: fn(),
    onCancel: fn(),
    onDelete: fn(),
    onArchive: fn(),
    onRestore: fn(),
    isEdited: true,
    isDisabled: false,
    isArchived: false,
  },
};

export const ForArchivedNote = {
  args: {
    onSave: fn(),
    onCancel: fn(),
    onDelete: fn(),
    onArchive: fn(),
    onRestore: fn(),
    isEdited: false,
    isDisabled: false,
    isArchived: true,
  },
};

export const Disabled = {
  args: {
    onSave: fn(),
    onCancel: fn(),
    onDelete: fn(),
    onArchive: fn(),
    onRestore: fn(),
    isEdited: false,
    isDisabled: true,
    isArchived: false,
  },
};
