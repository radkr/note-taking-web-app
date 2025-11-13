import { fn } from "storybook/test";

import SelectButton from "./select-button";
import IconHome from "../../../../assets/images/icon-home.svg";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Buttons/SelectButton",
  component: SelectButton,
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
    Icon: IconHome,
    label: "Home",
    selected: false,
  },
};
