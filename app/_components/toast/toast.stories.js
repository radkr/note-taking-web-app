import { fn } from "storybook/test";

import Toast from "./toast";

export default {
  title: "Common/Toast",
  component: Toast,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <ul id="toasts-root" height="100px" width="100px">
        <Story />
      </ul>
    ),
  ],
};

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
