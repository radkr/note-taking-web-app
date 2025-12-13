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
import { mocked } from "storybook/test";
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

const parentDesktop = {
  widthType: "fixed",
  fixedWidth: 290,
  heightType: "parent",
  parentVPadding: 0,
};

const parentPortable = {
  widthType: "parent",
  parentHPadding: 0,
  heightType: "parent",
  parentVPadding: 0,
};

export default {
  title: "App/AllNotes/AllNotes",
  component: AllNotes,
  parameters: {
    layout: "fullscreen",
    parent: {
      default: parentDesktop,
      mobile1: parentPortable,
      mobile2: parentPortable,
      tablet1: parentPortable,
      tablet2: parentPortable,
      desktop: parentDesktop,
    },
  },

  decorators: [
    (Story) => (
      <AppCtx value={{ displayToast: () => {} }}>
        <Story />
      </AppCtx>
    ),
  ],

  beforeEach: async () => {
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ACTIVE });
    mocked(useReadAllTags).mockReturnValue({});
    mocked(useCreateNote).mockReturnValue({ createNote: fn() });
  },
};

export const Default = {
  args: {
    allNotes: { data: notes, isLoading: false },
    id: "1",
    parentVPadding: 0,
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
    mocked(useAppState).mockReturnValue({
      page: NOTES,
      subPage: SEARCH,
      term: "Dev",
    });
    mocked(useReadAllTags).mockReturnValue({ tag: {} });
    mocked(useCreateNote).mockReturnValue({ createNote: fn() });
  },
};
