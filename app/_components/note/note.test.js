import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { mockPlainNotes } from "@/__test__/utils";
import { AllNotesCtx } from "@/app/_lib/notes/all-notes-ctx";
import Note from "./note";
import { usePathname } from "next/navigation";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation");
jest.mock("@/app/_lib/notes/all-notes-model");
jest.mock("@/app/_lib/database/database");
jest.mock("@/assets/images/icon-arrow-left.svg", () => ({
  __esModule: true,
  default: () => <svg data-testid="mock-icon" />,
}));

const defaultAllNotesCtxValue = {
  note: undefined,
};

const errorAllNotesCtxValue = {
  note: {
    _id: "0",
    error: "error",
  },
};

const allNotesCtxValue = {
  note: mockPlainNotes[0],
  saveNote: jest.fn(),
};

beforeAll(() => {
  usePathname.mockReturnValue("/notes");
});

describe("Note static test", () => {
  it("renders 'Loading...'", () => {
    render(
      <AllNotesCtx value={defaultAllNotesCtxValue}>
        <Note />
      </AllNotesCtx>
    );
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    expect(screen.queryByLabelText("Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Last edited")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Content")).not.toBeInTheDocument();
  });

  it("renders 'Error'", () => {
    render(
      <AllNotesCtx value={errorAllNotesCtxValue}>
        <Note />
      </AllNotesCtx>
    );
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.queryByLabelText("Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Last edited")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Content")).not.toBeInTheDocument();
  });

  it("renders the note title", () => {
    render(
      <AllNotesCtx value={allNotesCtxValue}>
        <Note />
      </AllNotesCtx>
    );
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toHaveValue(mockPlainNotes[0].title);
  });

  it("renders the note content", () => {
    render(
      <AllNotesCtx value={allNotesCtxValue}>
        <Note />
      </AllNotesCtx>
    );
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText("Content")).toHaveValue(
      mockPlainNotes[0].content
    );
  });

  it("renders when was the note last edited", () => {
    render(
      <AllNotesCtx value={allNotesCtxValue}>
        <Note />
      </AllNotesCtx>
    );
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    const date = screen.getByText(mockPlainNotes[0].lastEdited);
    expect(date).toBeInTheDocument();
  });
});

describe("Save Note", () => {
  it("saves the note with modified title", async () => {
    render(
      <AllNotesCtx value={allNotesCtxValue}>
        <Note />
      </AllNotesCtx>
    );
    const title = screen.getByLabelText("Title");
    await userEvent.click(title);
    await userEvent.type(title, " mod");
    expect(title.value).toBe(`${mockPlainNotes[0].title} mod`);
    const footer = screen.getByTestId("NoteFooter");
    within(footer).getByText("Save Note", { selector: "button" });
  });
});
