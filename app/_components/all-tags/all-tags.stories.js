import AllTags from "./all-tags";
import { NOTES, ACTIVE, TAGGED } from "@/app/_lib/app/use-app-state";
import { useAppState } from "@/app/_lib/app/use-app-state";
import { useReadAllTags } from "@/app/_lib/tags/hooks/use-read-all-tags";
import { mocked } from "storybook/test";

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

const parentDesktop = {
  widthType: "fixed",
  fixedWidth: 240,
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
  title: "App/AllTags",
  component: AllTags,
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

  beforeEach: async () => {
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ACTIVE });
    mocked(useReadAllTags).mockReturnValue({
      allTags: { data: tags, isLoading: false },
    });
  },
};

export const Default = {};

export const Loading = {
  beforeEach: async () => {
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ACTIVE });
    mocked(useReadAllTags).mockReturnValue({
      allTags: { isLoading: true },
    });
  },
};

export const Empty = {
  beforeEach: async () => {
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ACTIVE });
    mocked(useReadAllTags).mockReturnValue({
      allTags: { data: [], isLoading: false },
    });
  },
};

export const Selected = {
  beforeEach: async () => {
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
