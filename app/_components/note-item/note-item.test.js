import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { mockPlainNotes } from "@/__test__/utils";
import NoteItem from "./note-item";
import { AllNotesCtx } from "@/app/_lib/notes/all-notes-ctx";

jest.mock("@/app/_lib/notes/all-notes-model");
jest.mock("@/app/_lib/database/database");

const allNotesCtxValue = {
  note: mockPlainNotes[0],
};

describe("NoteItem static test", () => {
  it("renders the note title", () => {
    render(
      <AllNotesCtx value={allNotesCtxValue}>
        <NoteItem note={mockPlainNotes[0]} />
      </AllNotesCtx>
    );
    const title = screen.getByText(mockPlainNotes[0].title);
    expect(title).toBeInTheDocument();
  });

  it("renders when was the note las edited", () => {
    render(
      <AllNotesCtx value={allNotesCtxValue}>
        <NoteItem note={mockPlainNotes[0]} />
      </AllNotesCtx>
    );
    const date = screen.getByText(mockPlainNotes[0].lastEdited);
    expect(date).toBeInTheDocument();
  });

  it("renders as selected", () => {
    render(
      <AllNotesCtx value={allNotesCtxValue}>
        <NoteItem note={mockPlainNotes[0]} />
      </AllNotesCtx>
    );
    const listitem = screen.getByRole("listitem");
    expect(listitem).toHaveClass("selected");
  });

  it("renders as not selected", () => {
    render(
      <AllNotesCtx value={allNotesCtxValue}>
        <NoteItem note={mockPlainNotes[1]} />
      </AllNotesCtx>
    );
    const listitem = screen.getByRole("listitem");
    expect(listitem).not.toHaveClass("selected");
  });
});
