import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { mockPlainNotes } from "@/__test__/utils";
import AllNotesItem from "./all-notes-item";

jest.mock("@/app/_lib/notes/all-notes-model");
jest.mock("@/app/_lib/database/database");

describe("NoteItem static test", () => {
  it("renders the note title", () => {
    render(<AllNotesItem note={mockPlainNotes[0]} />);
    const title = screen.getByText(mockPlainNotes[0].title);
    expect(title).toBeInTheDocument();
  });

  it("renders when was the note las edited", () => {
    render(<AllNotesItem note={mockPlainNotes[0]} />);
    const date = screen.getByText(mockPlainNotes[0].lastEdited);
    expect(date).toBeInTheDocument();
  });

  it("renders as selected", () => {
    render(<AllNotesItem note={mockPlainNotes[0]} />);
    const listitem = screen.getByRole("listitem");
    expect(listitem).toHaveClass("selected");
  });

  it("renders as not selected", () => {
    render(<AllNotesItem note={mockPlainNotes[1]} />);
    const listitem = screen.getByRole("listitem");
    expect(listitem).not.toHaveClass("selected");
  });
});
