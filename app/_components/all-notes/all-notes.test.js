import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AllNotes from "./all-notes";

// Mock server actions if used in AllNotes
jest.mock("@/app/_lib/notes/all-notes-model", () => ({}));
jest.mock("@/app/_lib/database/database", () => ({}));

// Mock the createNoteAction action
jest.mock("@/app/_lib/notes/all-notes-actions", () => ({
  createNoteAction: jest.fn(),
}));

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the useAppState hook
jest.mock("@/app/_lib/app/use-app-state", () => ({
  useAppState: () => ({
    page: "NOTES",
  }),
}));

// Mock IconPlus svg import
jest.mock("@/assets/images/icon-plus.svg", () => ({
  __esModule: true,
  default: () => <svg data-testid="mock-icon" />,
}));

// Import your QueryClientProvider wrapper
import MyQueryClientProvider from "@/app/_lib/my-query-client/my-query-client";

describe("AllNotes - Browse all my notes", () => {
  it("indicates that the list of my notes is loading", () => {
    /*
    GIVEN the list of my notes is not yet available on the client
    WHEN I browse the list of my notes
    THEN I can see a loading message
    */
    render(
      <MyQueryClientProvider>
        <AllNotes allNotes={{ data: undefined, isLoading: true }} />
      </MyQueryClientProvider>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows empty message", () => {
    /*
    GIVEN I have not created any notes yet
    AND the list of my notes is available on the client
    WHEN I browse the list of my notes
    THEN I can see an info message of not having any notes yet
    */
    render(
      <MyQueryClientProvider>
        <AllNotes allNotes={{ data: [], isLoading: false }} />
      </MyQueryClientProvider>
    );
    expect(
      screen.getByText(
        "You don’t have any notes yet. Start a new note to capture your thoughts and ideas."
      )
    ).toBeInTheDocument();
  });
});
