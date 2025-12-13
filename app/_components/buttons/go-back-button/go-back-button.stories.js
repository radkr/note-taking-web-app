import GoBackButton from "./go-back-button";
import { NOTES, ARCHIVED } from "@/app/_lib/app/use-app-state";
import { useAppState } from "@/app/_lib/app/use-app-state";
import { mocked } from "storybook/test";

export default {
  title: "Common/Buttons/GoBackButton",
  component: GoBackButton,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  beforeEach: async () => {
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ARCHIVED });
  },
};

export const Default = {
  args: {},
};
