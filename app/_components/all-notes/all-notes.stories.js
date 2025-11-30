import { fn } from "storybook/test";

import AllNotes from "./all-notes";
import {
  NOTES,
  ARCHIVED,
  ACTIVE,
  TAGGED,
  SEARCH,
} from "@/app/_lib/app/use-app-state";
import { useAppState } from "@/app/_lib/app/use-app-state";
import { useReadAllTags } from "@/app/_lib/tags/hooks/use-read-all-tags";
import { useCreateNote } from "@/app/_lib/notes/hooks/use-create-note";
import { expect, mocked } from "storybook/test";
import { AppCtx } from "@/app/_lib/app/app-ctx";

const notes = [
  {
    _id: "1",
    title: "React Performance Optimization",
    tags: [
      {
        _id: "1",
        name: "Dev",
      },
      {
        _id: "2",
        name: "React",
      },
    ],
    updatedAt: new Date("2024-10-29T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "Japan Travel Planning",
    tags: [
      {
        _id: "1",
        name: "Travel",
      },
      {
        _id: "2",
        name: "Personal",
      },
    ],
    updatedAt: new Date("2024-10-28T12:00:00.000Z"),
  },
  {
    _id: "3",
    title: "Favorite Pasta Recipes",
    tags: [
      {
        _id: "1",
        name: "Cooking",
      },
      {
        _id: "2",
        name: "Recipes",
      },
    ],
    updatedAt: new Date("2024-10-27T12:00:00.000Z"),
  },
  {
    _id: "4",
    title: "Weekly Workout Plan",
    updatedAt: new Date("2024-10-25T12:00:00.000Z"),
  },
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "App/AllNotes/AllNotes",
  component: AllNotes,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  /*globals: {
    viewport: { value: "mobile1", isRotated: false },
  },*/
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },

  decorators: [
    (Story) => (
      <AppCtx value={{ displayToast: () => {} }}>
        <Story />
      </AppCtx>
    ),
  ],

  beforeEach: async () => {
    // 👇 Force known, consistent behavior for mocked modules
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ACTIVE });
    mocked(useReadAllTags).mockReturnValue({});
    mocked(useCreateNote).mockReturnValue({ createNote: fn() });
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
    allNotes: { data: notes, isLoading: false },
    id: "1",
  },
};

export const Loading = {
  args: {
    allNotes: { isLoading: true },
    id: "1",
  },
};

export const Empty = {
  args: {
    allNotes: { data: [], isLoading: false },
    id: "1",
  },
};

export const Archived = {
  args: {
    allNotes: { data: notes, isLoading: false },
    id: "1",
  },
  beforeEach: async () => {
    // 👇 Force known, consistent behavior for mocked modules
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ARCHIVED });
    mocked(useReadAllTags).mockReturnValue({});
    mocked(useCreateNote).mockReturnValue({ createNote: fn() });
  },
};

export const Tagged = {
  args: {
    allNotes: { data: notes, isLoading: false },
    id: "1",
  },
  beforeEach: async () => {
    // 👇 Force known, consistent behavior for mocked modules
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: TAGGED });
    mocked(useReadAllTags).mockReturnValue({ tag: { data: { name: "Dev" } } });
    mocked(useCreateNote).mockReturnValue({ createNote: fn() });
  },
};

export const Search = {
  args: {
    allNotes: { data: notes, isLoading: false },
    id: "1",
  },
  beforeEach: async () => {
    // 👇 Force known, consistent behavior for mocked modules
    mocked(useAppState).mockReturnValue({
      page: NOTES,
      subPage: SEARCH,
      term: "Dev",
    });
    mocked(useReadAllTags).mockReturnValue({ tag: {} });
    mocked(useCreateNote).mockReturnValue({ createNote: fn() });
  },
};
