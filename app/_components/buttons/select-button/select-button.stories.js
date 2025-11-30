import { fn } from "storybook/test";

import SelectButton from "./select-button";
import IconHome from "../../icons/IconHome";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Common/Buttons/SelectButton",
  component: SelectButton,
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
    //Icon: () => <img width="24px" height="24px" src={IconHome.src} />,
    Icon: IconHome,
    label: "All Notes",
    selected: false,
    big: false,
  },
};

export const Selected = {
  args: {
    //Icon: () => <img width="24px" height="24px" src={IconHome.src} />,
    Icon: IconHome,
    label: "All Notes",
    selected: true,
    big: false,
  },
};

export const Big = {
  args: {
    //Icon: () => <img width="24px" height="24px" src={IconHome.src} />,
    Icon: IconHome,
    label: "All Notes",
    selected: false,
    big: true,
  },
};

export const BigSelected = {
  args: {
    //Icon: () => <img width="24px" height="24px" src={IconHome.src} />,
    Icon: IconHome,
    label: "All Notes",
    selected: true,
    big: true,
  },
};
