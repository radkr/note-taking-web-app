import { fn } from "storybook/test";

import AllTags from "./all-tags";
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

const tags = [
  {
    _id: "1",
    name: "Cooking",
  },
  {
    _id: "2",
    name: "Dev",
  },
  {
    _id: "3",
    name: "Fitness",
  },
  {
    _id: "4",
    name: "Health",
  },
  {
    _id: "5",
    name: "Personal",
  },
  {
    _id: "6",
    name: "React",
  },
  {
    _id: "7",
    name: "Recipes",
  },
  {
    _id: "8",
    name: "Shopping",
  },
  {
    _id: "9",
    name: "Travel",
  },
  {
    _id: "10",
    name: "TypeScript",
  },
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "App/AllTags",
  component: AllTags,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  /*globals: {
    viewport: { value: "mobile1", isRotated: false },
  },*/

  beforeEach: async () => {
    // 👇 Force known, consistent behavior for mocked modules
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ACTIVE });
    mocked(useReadAllTags).mockReturnValue({
      allTags: { data: tags, isLoading: false },
    });
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {};

export const Loading = {
  beforeEach: async () => {
    // 👇 Force known, consistent behavior for mocked modules
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ACTIVE });
    mocked(useReadAllTags).mockReturnValue({
      allTags: { isLoading: true },
    });
  },
};

export const Empty = {
  beforeEach: async () => {
    // 👇 Force known, consistent behavior for mocked modules
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ACTIVE });
    mocked(useReadAllTags).mockReturnValue({
      allTags: { data: [], isLoading: false },
    });
  },
};

export const Selected = {
  beforeEach: async () => {
    // 👇 Force known, consistent behavior for mocked modules
    mocked(useAppState).mockReturnValue({
      page: NOTES,
      subPage: TAGGED,
      tag: "1",
    });
    mocked(useReadAllTags).mockReturnValue({
      allTags: { data: tags, isLoading: false },
    });
  },
};
