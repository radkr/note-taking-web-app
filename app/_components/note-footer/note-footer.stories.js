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

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "App/Note/NoteFooter",
  component: NoteFooter,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
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
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  args: {
    parentHPadding: 0,
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
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
