import { fn } from "storybook/test";

import NoteFooter from "./note-footer";

const parentDesktop = {
  widthType: "parent",
  parentHPadding: 400,
  heightType: "child",
};

const parentPortable = {
  widthType: "parent",
  parentHPadding: 0,
  heightType: "child",
};

export default {
  title: "App/Note/NoteFooter",
  component: NoteFooter,
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
  args: {
    parentHPadding: 0,
  },
};

export const Default = {
  args: {
    onSave: fn(),
    onCancel: fn(),
    isEdited: false,
    isDisabled: false,
  },
};

export const Edited = {
  args: {
    onSave: fn(),
    onCancel: fn(),
    isEdited: true,
    isDisabled: false,
  },
};

export const Disabled = {
  args: {
    onSave: fn(),
    onCancel: fn(),
    isEdited: false,
    isDisabled: true,
  },
};
