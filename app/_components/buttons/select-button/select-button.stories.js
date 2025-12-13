import SelectButton from "./select-button";
import IconHome from "../../icons/IconHome";

export default {
  title: "Common/Buttons/SelectButton",
  component: SelectButton,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export const Default = {
  args: {
    Icon: IconHome,
    label: "All Notes",
    selected: false,
    big: false,
    widthType: "child",
    heightType: "child",
  },
};

export const Selected = {
  args: {
    Icon: IconHome,
    label: "All Notes",
    selected: true,
    big: false,
  },
};

export const Big = {
  args: {
    Icon: IconHome,
    label: "All Notes",
    selected: false,
    big: true,
  },
};

export const BigSelected = {
  args: {
    Icon: IconHome,
    label: "All Notes",
    selected: true,
    big: true,
  },
};
