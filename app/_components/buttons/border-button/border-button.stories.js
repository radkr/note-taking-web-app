import BorderButton from "./border-button";
import { IconArchive } from "../../icons";

export default {
  title: "Common/Buttons/BorderButton",
  component: BorderButton,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export const Default = {
  args: {
    Icon: IconArchive,
    children: "Archive Note",
    widthType: "child",
    heightType: "child",
  },
};
