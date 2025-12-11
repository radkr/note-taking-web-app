import { fn } from "storybook/test";

import Note from "./note";
import {
  NOTES,
  ARCHIVED,
  ACTIVE,
  TAGGED,
  SEARCH,
  useAppState,
} from "@/app/_lib/app/use-app-state";
import { AppCtx } from "@/app/_lib/app/app-ctx";
import { useDeleteNote } from "@/app/_lib/notes/hooks/use-delete-note";
import { useUpdateNote } from "@/app/_lib/notes/hooks/use-update-note";
import { useAddTag } from "@/app/_lib/notes/hooks/use-add-tag";
import { useRemoveTag } from "@/app/_lib/notes/hooks/use-remove-tag";
import useRestoreNote from "@/app/_lib/notes/hooks/use-restore-note";
import useArchiveNote from "@/app/_lib/notes/hooks/use-archive-note";
import { expect, mocked } from "storybook/test";

const parentDesktop = {
  widthType: "parent",
  parentHPadding: 40,
  heightType: "parent",
  parentVPadding: 0,
};

const parentPortable = {
  widthType: "parent",
  parentHPadding: 0,
  heightType: "parent",
  parentVPadding: 0,
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "App/Note/Note",
  component: Note,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
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
      <div id="modal-root">
        <AppCtx value={{ displayToast: () => {} }}>
          <Story />
        </AppCtx>
      </div>
    ),
  ],

  beforeEach: async () => {
    // 👇 Force known, consistent behavior for mocked modules
    mocked(useAppState).mockReturnValue({ page: NOTES, subPage: ACTIVE });
    mocked(useDeleteNote).mockReturnValue({ deleteNote: fn() });
    mocked(useUpdateNote).mockReturnValue({ saveNote: fn() });
    mocked(useAddTag).mockReturnValue({ addTag: fn() });
    mocked(useRemoveTag).mockReturnValue({ removeTag: fn() });
    mocked(useRestoreNote).mockReturnValue({ restoreNote: fn() });
    mocked(useArchiveNote).mockReturnValue({ archiveNote: fn() });
  },
  args: {
    parentHPadding: 0,
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
    note: {
      data: {
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
      isLoading: false,
    },
    id: "1",
  },
};

export const Loading = {
  args: {
    note: {
      isLoading: true,
    },
    id: "",
  },
};

export const Error = {
  args: {
    note: {
      data: {
        error: "Error occured",
      },
      isLoading: false,
    },
    id: "1",
  },
};

export const Archived = {
  args: {
    note: {
      data: {
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
        isArchived: true,
        updatedAt: new Date("2024-10-29T12:00:00.000Z"),
      },
      isLoading: false,
    },
    id: "1",
  },
};
