import { fn } from "storybook/test";

import TagInput from "./tag-input";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Common/Fields/TagInput",
  component: TagInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
    tags: [
      { _id: 1, name: "Cooking" },
      { _id: 2, name: "Helth" },
      { _id: 3, name: "Recipes" },
    ],
    onAddTag: fn(),
    onRemoveTag: fn(),
  },
};
