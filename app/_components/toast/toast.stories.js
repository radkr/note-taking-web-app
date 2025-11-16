import { fn } from "storybook/test";

import Toast from "./toast";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Common/Toast",
  component: Toast,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  decorators: [
    (Story) => (
      <ul id="toasts-root" height="100px" width="100px">
        <Story />
      </ul>
    ),
  ],
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
    open: true,
    onClose: fn(),
    onHidden: fn(),
    message: "Note archived.",
    link: "Archived Notes",
    href: "#",
    isError: false,
  },
};

export const Error = {
  args: {
    open: true,
    onClose: fn(),
    onHidden: fn(),
    message: "Note archived.",
    link: "Archived Notes",
    href: "#",
    isError: true,
  },
};
