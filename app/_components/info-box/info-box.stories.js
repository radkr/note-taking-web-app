import { fn } from "storybook/test";

import InfoBox from "./info-box";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Common/InfoBox",
  component: InfoBox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
    children: (
      <p className="text-preset-5 text-color-neutral-950">
        No notes have been archived yet. Move notes here for safekeeping, or{" "}
        <a href="#">create a new note</a>.
      </p>
    ),
  },
};
