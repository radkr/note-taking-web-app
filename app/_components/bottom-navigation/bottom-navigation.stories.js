import { fn } from "storybook/test";

import BottomNavigation from "./bottom-navigation";
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
  fixedWidth: 768,
  heightType: "child",
  parentVPadding: 0,
};

const parentPortable = {
  widthType: "parent",
  parentHPadding: 0,
  heightType: "child",
  parentVPadding: 0,
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "App/Navigation/BottomNavigation",
  component: BottomNavigation,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fulscreen",
    parent: {
      default: parentDesktop,
      mobile1: parentPortable,
      mobile2: parentPortable,
      tablet1: parentPortable,
      tablet2: parentPortable,
      desktop: parentDesktop,
    },
  },

  beforeEach: async () => {
    // 👇 Force known, consistent behavior for mocked modules
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ACTIVE });
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {};
