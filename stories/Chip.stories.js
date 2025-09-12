import { fn } from "storybook/test";

import Chip from "@/app/_components/chip/chip";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Example/Chip",
  component: Chip,
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  render: ({ name }) => <Chip name={name} />,
  args: {
    name: "MyChip",
  },
};
