import { fn } from "storybook/test";

import BorderButton from "./border-button";
import { IconArchive } from "../../icons";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Common/Buttons/BorderButton",
  component: BorderButton,
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
    //Icon: () => <img width="24px" height="24px" src={IconHome.src} />,
    Icon: IconArchive,
    children: "Archive Note",
  },
};
