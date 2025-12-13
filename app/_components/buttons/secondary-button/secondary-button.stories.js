import SecondaryButton from "./secondary-button";

export default {
  title: "Common/Buttons/SecondaryButton",
  component: SecondaryButton,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export const Default = {
  args: {
    children: "Cancel",
    widthType: "child",
    heightType: "child",
  },
};
