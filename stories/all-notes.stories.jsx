import { fn } from "storybook/test";

import AllNotes from "@/app/_components/all-notes/all-notes";
import { AppCtx } from "@/app/_lib/app/app-ctx";
import { NOTES } from "@/app/_lib/app/use-app-state";

jest.mock("../app/_lib/notes/hooks/use-create-note", () => ({
  __esModule: true,
  default: () => ({
    createNote: (data) => console.log("Mock createNote:", data),
  }),
}));

jest.mock("../app/_lib/app/use-app-state", () => ({
  __esModule: true,
  default: () => ({
    createNote: (data) => console.log("Mock createNote:", data),
  }),
}));

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Example/AllNotes",
  component: AllNotes,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AllNotesDefault = {
  render: () => (
    <AppCtx.Provider value={{ displayToast: () => {} }}>
      <AllNotes allNotes={{ data: [], isLoading: false }} id={"1"} />
    </AppCtx.Provider>
  ),
};
