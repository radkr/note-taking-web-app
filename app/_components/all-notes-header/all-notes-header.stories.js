import AllNotesHeader from "@/app/_components/all-notes-header/all-notes-header";
import {
  NOTES,
  ARCHIVED,
  ACTIVE,
  TAGGED,
  SEARCH,
} from "@/app/_lib/app/use-app-state";
import { useAppState } from "@/app/_lib/app/use-app-state";
import { useReadAllTags } from "@/app/_lib/tags/hooks/use-read-all-tags";
import { mocked } from "storybook/test";

const parentPortable = {
  widthType: "parent",
  parentHPadding: 40,
  heightType: "child",
};

export default {
  title: "App/AllNotes/AllNotesHeader",
  component: AllNotesHeader,
  parameters: {
    layout: "fullscreen",
    parent: {
      mobile1: parentPortable,
    },
  },
  globals: {
    viewport: { value: "mobile1", isRotated: false },
  },

  beforeEach: async () => {
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ACTIVE });
    mocked(useReadAllTags).mockReturnValue({});
  },
};

export const Default = {};

export const Archived = {
  beforeEach: async () => {
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ARCHIVED });
    mocked(useReadAllTags).mockReturnValue({});
  },
};

export const Tagged = {
  beforeEach: async () => {
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: TAGGED });
    mocked(useReadAllTags).mockReturnValue({ tag: { data: { name: "Dev" } } });
  },
};

export const Search = {
  beforeEach: async () => {
    mocked(useAppState).mockReturnValue({
      page: NOTES,
      subPage: SEARCH,
      term: "Dev",
    });
    mocked(useReadAllTags).mockReturnValue({ tag: {} });
  },
};
