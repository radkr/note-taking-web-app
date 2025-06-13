import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AllNotesItem from "./all-notes-item";

const date = new Date("2024-06-01T12:00:00.000Z");

describe("AllNotesItem - Browse all my notes", () => {
  it("shows if the notes are untitled", () => {
    /*
    GIVEN I have created some notes already
    AND the list of my notes is available on the client
    AND some notes do not have a title yet
    WHEN I browse the list of my notes
    THEN I can read "Untitled note" in the place of the title on the notes without one
    */
    const note = { id: "1", updatedAt: date };
    render(<AllNotesItem note={note} />);
    expect(screen.getByText("Untitled Note")).toBeInTheDocument();
  });

  it("shows the title of the notes", () => {
    /*
    GIVEN I have created some notes already
    AND the list of my notes is available on the client
    AND some of the notes have a title
    WHEN I browse the list of my notes
    THEN I can see the title of each note that has one
    */
    const note = {
      id: "2",
      title: "Titled Note",
      updatedAt: date,
    };
    render(<AllNotesItem note={note} />);
    expect(screen.getByText("Titled Note")).toBeInTheDocument();
  });

  it("shows when was a note last edited", () => {
    /*
    GIVEN I have created some notes already
    AND the list of my notes is available on the client
    WHEN I browse the list of my notes
    THEN I can see when were the notes last edited
    */
    const note = {
      id: "3",
      title: "Another Note",
      updatedAt: date,
    };
    render(<AllNotesItem note={note} />);
    expect(screen.getByText("01 Jun 2024")).toBeInTheDocument();
  });
});
