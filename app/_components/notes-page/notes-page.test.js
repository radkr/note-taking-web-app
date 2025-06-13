import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import NotesPage from "./notes-page";

// Mock server actions
jest.mock("@/app/_lib/notes/all-notes-actions", () => ({
  readAllNotesAction: jest.fn(),
  readNoteAction: jest.fn(),
}));

import { readAllNotesAction } from "@/app/_lib/notes/all-notes-actions";
import { readNoteAction } from "@/app/_lib/notes/all-notes-actions";

// Mock the useAppState hook
jest.mock("@/app/_lib/app/use-app-state", () => ({
  useAppState: () => ({
    page: "NOTES",
  }),
}));

// Import your QueryClientProvider wrapper
import MyQueryClientProvider from "@/app/_lib/my-query-client/my-query-client";

// Mock all needed next/navigation hooks in a single call
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/notes",
}));

// Mock IconPlus svg import
jest.mock("@/assets/images/icon-plus.svg", () => ({
  __esModule: true,
  default: () => <svg data-testid="mock-icon" />,
}));

describe("NotesPage - Browse all my notes", () => {
  it("shows my notes", async () => {
    /*
    GIVEN I have created some notes already
    AND the list of my notes is available on the client
    WHEN I browse the list of my notes
    THEN I can see all my notes in the list
    */
    const notes = [
      { _id: "1", title: "First Note", lastEdited: "2024-06-01T12:00:00.000Z" },
      {
        _id: "2",
        title: "Second Note",
        lastEdited: "2024-06-02T15:30:00.000Z",
      },
    ];
    readAllNotesAction.mockResolvedValueOnce(notes);
    readNoteAction.mockResolvedValueOnce(notes[0]);

    render(
      <MyQueryClientProvider>
        <NotesPage />
      </MyQueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("First Note")).toBeInTheDocument();
      expect(screen.getByText("Second Note")).toBeInTheDocument();
    });
  });
});
