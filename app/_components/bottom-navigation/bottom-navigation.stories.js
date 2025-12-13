import BottomNavigation from "./bottom-navigation";
import { NOTES, ACTIVE } from "@/app/_lib/app/use-app-state";
import { useAppState } from "@/app/_lib/app/use-app-state";
import { mocked } from "storybook/test";

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

export default {
  title: "App/Navigation/BottomNavigation",
  component: BottomNavigation,
  parameters: {
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
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ACTIVE });
  },
};

export const Default = {};
