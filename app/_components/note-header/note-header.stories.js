import { fn } from "storybook/test";

import NoteHeader from "./note-header";
import { NOTES, ACTIVE } from "@/app/_lib/app/use-app-state";
import { useAppState } from "@/app/_lib/app/use-app-state";
import { mocked } from "storybook/test";

const parentDesktop = {
  widthType: "parent",
  parentHPadding: 500,
  heightType: "child",
};

const parentPortable = {
  widthType: "parent",
  parentHPadding: 20,
  heightType: "child",
};

export default {
  title: "App/Note/NoteHeader",
  component: NoteHeader,
  parameters: {
    layout: "fullscreen",
    parent: {
      default: parentDesktop,
      mobile1: parentPortable,
      mobile2: parentPortable,
      tablet1: parentPortable,
      tablet2: parentPortable,
      desktop: parentDesktop,
    },
  },
  tags: ["autodocs"],
  beforeEach: async () => {
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ACTIVE });
  },
  args: {
    parentHPadding: 0,
  },
};

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
