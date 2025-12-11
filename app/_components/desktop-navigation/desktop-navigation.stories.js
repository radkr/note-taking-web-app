import { fn } from "storybook/test";

import DesktopNavigation from "./desktop-navigation";
import {
  NOTES,
  ARCHIVED,
  ACTIVE,
  TAGGED,
  SEARCH,
} from "@/app/_lib/app/use-app-state";
import { useAppState } from "@/app/_lib/app/use-app-state";
import { expect, mocked } from "storybook/test";

const parentDesktop = {
  widthType: "fixed",
  fixedWidth: 272,
  heightType: "child",
  parentVPadding: 0,
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "App/Navigation/DesktopNavigation",
  component: DesktopNavigation,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
    parent: {
      default: parentDesktop,
      mobile1: parentDesktop,
      mobile2: parentDesktop,
      tablet1: parentDesktop,
      tablet2: parentDesktop,
      desktop: parentDesktop,
    },
  },

  beforeEach: async () => {
    // 👇 Force known, consistent behavior for mocked modules
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: TAGGED });
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {};

export const Selected = {
  beforeEach: async () => {
    // 👇 Force known, consistent behavior for mocked modules
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ACTIVE });
  },
};
