import PrimaryButton from "@/app/_components/buttons/primary-button/primary-button";

export default {
  title: "Common/Buttons/PrimaryButton",
  component: PrimaryButton,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export const Default = {
  args: {
    children: "Save Note",
    variant: false,
    widthType: "child",
    heightType: "child",
  },
};

export const Variant = {
  args: {
    children: "Delete Note",
    variant: true,
  },
};
