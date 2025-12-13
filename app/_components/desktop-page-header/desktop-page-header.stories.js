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
import { mocked } from "storybook/test";

const tag = {
  _id: "2",
  name: "Dev",
};

const parentDesktop = {
  widthType: "parent",
  parentHPadding: 20,
  heightType: "child",
};

export default {
  title: "App/Navigation/DesktopPageHeader",
  component: DesktopPageHeader,
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
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ACTIVE });
    mocked(useReadAllTags).mockReturnValue({
      tag: { data: tag, isLoading: false },
    });
  },

  args: {
    parentHPadding: 0,
  },
};

export const Default = {};

export const Archived = {
  beforeEach: async () => {
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ARCHIVED });
  },
};

export const Search = {
  beforeEach: async () => {
    mocked(useAppState).mockReturnValue({
      page: NOTES,
      subPage: SEARCH,
      term: "Dev",
    });
  },
};

export const Tagged = {
  beforeEach: async () => {
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: TAGGED });
    mocked(useReadAllTags).mockReturnValue({
      tag: { data: tag, isLoading: false },
    });
  },
};

export const Settings = {
  beforeEach: async () => {
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: SETTINGS });
  },
};
