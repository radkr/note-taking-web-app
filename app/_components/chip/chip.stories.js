import { fn } from "storybook/test";

import Chip from "./chip";

export default {
  title: "Common/Chip",
  component: Chip,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export const Default = {
  args: {
    name: "myTag",
    removable: false,
    widthType: "child",
    heightType: "child",
  },
};

export const Removable = {
  args: {
    name: "myTag",
    removable: true,
    onRemove: fn(),
  },
};
