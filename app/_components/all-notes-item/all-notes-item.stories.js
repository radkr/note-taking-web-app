import { fn } from "storybook/test";

import AllNotesItem from "./all-notes-item";
import { NOTES, ACTIVE } from "@/app/_lib/app/use-app-state";
import { useAppState } from "@/app/_lib/app/use-app-state";
import { expect, mocked } from "storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "App/AllNotes/AllNotesItem",
  component: AllNotesItem,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
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
    // 👇 Force known, consistent behavior for mocked modules
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ACTIVE });
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
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
