import { fn } from "storybook/test";

import TagInput from "./tag-input";

export default {
  title: "Common/Fields/TagInput",
  component: TagInput,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export const Default = {
  args: {
    tags: [
      { _id: 1, name: "Cooking" },
      { _id: 2, name: "Helth" },
      { _id: 3, name: "Recipes" },
    ],
    onAddTag: fn(),
    onRemoveTag: fn(),
    widthType: "child",
    heightType: "child",
  },
};
