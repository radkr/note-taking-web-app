import DesktopNavigation from "./desktop-navigation";
import { NOTES, ACTIVE, TAGGED } from "@/app/_lib/app/use-app-state";
import { useAppState } from "@/app/_lib/app/use-app-state";
import { mocked } from "storybook/test";

const parentDesktop = {
  widthType: "fixed",
  fixedWidth: 272,
  heightType: "child",
  parentVPadding: 0,
};

export default {
  title: "App/Navigation/DesktopNavigation",
  component: DesktopNavigation,
  parameters: {
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
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: TAGGED });
  },
};

export const Default = {};

export const Selected = {
  beforeEach: async () => {
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ACTIVE });
  },
};
