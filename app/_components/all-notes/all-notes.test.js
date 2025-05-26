import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { mockPlainNotes } from "@/__test__/utils";
import { AllNotesCtx } from "@/app/_lib/notes/all-notes-ctx";
import AllNotes from "./all-notes";

jest.mock("@/app/_lib/notes/all-notes-model");
jest.mock("@/app/_lib/database/database");

describe("AllNotes static test", () => {
  it("renders 'Loading...'", () => {
    const allNotesCtxValue = {
      notes: undefined,
    };
    render(
      <AllNotesCtx value={allNotesCtxValue}>
        <AllNotes />
      </AllNotesCtx>
    );
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("renders one note", () => {
    const allNotesCtxValue = {
      notes: mockPlainNotes.slice(0, 1),
    };
    render(
      <AllNotesCtx value={allNotesCtxValue}>
        <AllNotes />
      </AllNotesCtx>
    );
    const listitems = screen.getAllByRole("listitem");
    expect(listitems.length).toBe(1);
    const title = screen.getByText(mockPlainNotes[0].title);
    expect(title).toBeInTheDocument();
  });

  it("renders two note", () => {
    const allNotesCtxValue = {
      notes: mockPlainNotes.slice(0, 2),
    };
    render(
      <AllNotesCtx value={allNotesCtxValue}>
        <AllNotes />
      </AllNotesCtx>
    );
    const listitems = screen.getAllByRole("listitem");
    expect(listitems.length).toBe(2);
    for (const note of allNotesCtxValue.notes) {
      const title = screen.getByText(note.title);
      expect(title).toBeInTheDocument();
    }
  });
});
