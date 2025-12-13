import AllNotesItem from "./all-notes-item";
import { NOTES, ACTIVE } from "@/app/_lib/app/use-app-state";
import { useAppState } from "@/app/_lib/app/use-app-state";
import { mocked } from "storybook/test";

const parentDesktop = {
  widthType: "fixed",
  fixedWidth: 290,
  heightType: "child",
};

const parentPortable = {
  widthType: "parent",
  parentHPadding: 0,
  heightType: "child",
};

export default {
  title: "App/AllNotes/AllNotesItem",
  component: AllNotesItem,
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
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ul
        style={{
          listStyle: "none",
          backgroundColor: "white",
        }}
      >
        <Story />
      </ul>
    ),
  ],
  beforeEach: async () => {
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ACTIVE });
  },
};

export const Default = {
  args: {
    note: {
      _id: "1",
      title: "Meal Prep Ideas",
      tags: [
        {
          _id: "1",
          name: "Cooking",
        },
        {
          _id: "2",
          name: "Health",
        },
        {
          _id: "3",
          name: "Recipes",
        },
      ],
      updatedAt: new Date("2024-10-12T12:00:00.000Z"),
    },
    id: "2",
  },
};

export const Selected = {
  args: {
    note: {
      _id: "1",
      title: "Meal Prep Ideas",
      tags: [
        {
          _id: "1",
          name: "Cooking",
        },
        {
          _id: "2",
          name: "Health",
        },
        {
          _id: "3",
          name: "Recipes",
        },
      ],
      updatedAt: new Date("2024-10-12T12:00:00.000Z"),
    },
    id: "1",
  },
};

export const WithoutTags = {
  args: {
    note: {
      _id: "1",
      title: "Meal Prep Ideas",
      updatedAt: new Date("2024-10-12T12:00:00.000Z"),
    },
    id: "2",
  },
};
