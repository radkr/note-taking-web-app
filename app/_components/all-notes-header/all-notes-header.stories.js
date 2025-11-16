import { fn } from "storybook/test";

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
import { expect, mocked } from "storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "App/AllNotes/AllNotesHeader",
  component: AllNotesHeader,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "padded",
  },
  globals: {
    viewport: { value: "mobile1", isRotated: false },
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },

  beforeEach: async () => {
    // 👇 Force known, consistent behavior for mocked modules
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ACTIVE });
    mocked(useReadAllTags).mockReturnValue({});
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {};

export const Archived = {
  beforeEach: async () => {
    // 👇 Force known, consistent behavior for mocked modules
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ARCHIVED });
    mocked(useReadAllTags).mockReturnValue({});
  },
};

export const Tagged = {
  beforeEach: async () => {
    // 👇 Force known, consistent behavior for mocked modules
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: TAGGED });
    mocked(useReadAllTags).mockReturnValue({ tag: { data: { name: "Dev" } } });
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
    mocked(useReadAllTags).mockReturnValue({ tag: {} });
  },
};
