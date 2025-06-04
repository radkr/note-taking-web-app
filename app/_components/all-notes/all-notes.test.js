import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { mockPlainNotes } from "@/__test__/utils";
import AllNotes from "./all-notes";

jest.mock("@/app/_lib/notes/all-notes-model");
jest.mock("@/app/_lib/database/database");

describe("AllNotes static test", () => {
  it("renders 'Loading...'", () => {
    render(<AllNotes />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("renders empty note list", () => {
    render(<AllNotes />);
    const listitems = screen.queryAllByRole("listitem");
    expect(listitems.length).toBe(0);
    expect(
      screen.getByText(/You don’t have any notes yet./i)
    ).toBeInTheDocument();
  });

  it("renders one note", () => {
    render(<AllNotes />);
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/You don’t have any notes yet./i)
    ).not.toBeInTheDocument();
    const listitems = screen.getAllByRole("listitem");
    expect(listitems.length).toBe(1);
    const title = screen.getByText(mockPlainNotes[0].title);
    expect(title).toBeInTheDocument();
  });

  it("renders two note", () => {
    render(<AllNotes />);
    const listitems = screen.getAllByRole("listitem");
    expect(listitems.length).toBe(2);
    /*for (const note of allNotesCtxValue.notes) {
      const title = screen.getByText(note.title);
      expect(title).toBeInTheDocument();
    }*/
  });
});
