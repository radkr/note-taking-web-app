import FloatingButton from "./floating-button";
import { IconPlus } from "@/app/_components/icons";

export default {
  title: "Common/Buttons/FloatingButton",
  component: FloatingButton,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export const Default = {
  args: {
    Icon: IconPlus,
    variant: false,
  },
};

export const Variant = {
  args: {
    Icon: IconPlus,
    variant: true,
  },
};
