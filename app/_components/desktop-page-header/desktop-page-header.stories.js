import { fn } from "storybook/test";

import DesktopPageHeader from "./desktop-page-header";
import {
  NOTES,
  ARCHIVED,
  ACTIVE,
  TAGGED,
  SEARCH,
  SETTINGS,
} from "@/app/_lib/app/use-app-state";
import { useAppState } from "@/app/_lib/app/use-app-state";
import { useReadAllTags } from "@/app/_lib/tags/hooks/use-read-all-tags";
import { expect, mocked } from "storybook/test";

const tag = {
  _id: "2",
  name: "Dev",
};

const parentDesktop = {
  widthType: "parent",
  parentHPadding: 20,
  heightType: "child",
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "App/Navigation/DesktopPageHeader",
  component: DesktopPageHeader,
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
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ACTIVE });
    mocked(useReadAllTags).mockReturnValue({
      tag: { data: tag, isLoading: false },
    });
  },

  args: {
    parentHPadding: 0,
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {};

export const Archived = {
  beforeEach: async () => {
    // 👇 Force known, consistent behavior for mocked modules
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ARCHIVED });
  },
};

export const Search = {
  beforeEach: async () => {
    // 👇 Force known, consistent behavior for mocked modules
    mocked(useAppState).mockReturnValue({
      page: NOTES,
      subPage: SEARCH,
      term: "Dev",
    });
  },
};

export const Tagged = {
  beforeEach: async () => {
    // 👇 Force known, consistent behavior for mocked modules
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: TAGGED });
    mocked(useReadAllTags).mockReturnValue({
      tag: { data: tag, isLoading: false },
    });
  },
};

export const Settings = {
  beforeEach: async () => {
    // 👇 Force known, consistent behavior for mocked modules
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: SETTINGS });
  },
};
