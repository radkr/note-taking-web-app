import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AllNotesItem from "./all-notes-item";

const date = new Date("2024-06-01T12:00:00.000Z");

// Mock the useAppState hook
jest.mock("@/app/_lib/app/use-app-state", () => {
  const originalModule = jest.requireActual("@/app/_lib/app/use-app-state");
  return {
    __esModule: true,
    ...originalModule,
    useAppState: jest.fn(() => ({
      page: originalModule.NOTES,
    })),
  };
});

import {
  useAppState,
  NOTES,
  NOTE,
  ACTIVE,
  ARCHIVED,
  SEARCH,
} from "@/app/_lib/app/use-app-state";

describe("AllNotesItem - Browse all my notes", () => {
  it("shows if the notes are untitled", () => {
    /*
    GIVEN I have created some notes already
    AND the list of my notes is available on the client
    AND some notes do not have a title yet
    WHEN I browse the list of my notes
    THEN I can read "Untitled note" in the place of the title on the notes without one
    */

    useAppState.mockReturnValue({
      page: NOTES,
      subPage: ACTIVE,
    });

    const note = { _id: "1", updatedAt: date };
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

    useAppState.mockReturnValue({
      page: NOTES,
      subPage: ACTIVE,
    });

    const note = {
      _id: "2",
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

    useAppState.mockReturnValue({
      page: NOTES,
      subPage: ACTIVE,
    });

    const note = {
      _id: "3",
      title: "Another Note",
      updatedAt: date,
    };
    render(<AllNotesItem note={note} />);
    expect(screen.getByText("01 Jun 2024")).toBeInTheDocument();
  });

  it("opens my note", async () => {
    /*
      GIVEN I have created some notes already
      AND the list of my notes is available on the client
      WHEN I click on one of my note in the list
      THEN I get to the page of that specific note
      */

    useAppState.mockReturnValue({
      page: NOTES,
      subPage: ACTIVE,
    });

    const note = {
      _id: "3",
      title: "Another Note",
      updatedAt: date,
    };
    render(<AllNotesItem note={note} />);
    // Should navigate to the note's page
    expect(screen.getByText(note.title).closest("a")).toHaveAttribute(
      "href",
      "/notes/3"
    );
  });
});

describe("AllNotesItem - Browse my notes with a specific search term", () => {
  it("opens my note", async () => {
    /*
      GIVEN I have created some notes already
      AND the list of my notes is available on the client
      WHEN I click on one of my note in the list
      THEN I get to the page of that specific note
      */

    useAppState.mockReturnValue({
      page: NOTES,
      subPage: SEARCH,
      term: "myTerm",
    });

    const note = {
      _id: "3",
      title: "Another Note",
      updatedAt: date,
    };
    render(<AllNotesItem note={note} />);
    // Should navigate to the note's page
    expect(screen.getByText(note.title).closest("a")).toHaveAttribute(
      "href",
      "/notes/search/3?term=myTerm"
    );
  });
});

describe("AllNotesItem - Add or remove tags to or from my note", () => {
  it("shows the tags on all notes", () => {
    /*
    GIVEN the note is available on the client
    AND the note has some tags
    WHEN I browse the list of my notes
    THEN I can see the tags of each note that has one
    */

    useAppState.mockReturnValue({
      page: NOTES,
      subPage: ACTIVE,
    });

    const note = {
      _id: "3",
      title: "Another Note",
      tags: [{ _id: "1", name: "myTag" }],
      updatedAt: date,
    };
    render(<AllNotesItem note={note} />);
    // Should navigate to the note's page
    expect(screen.getByText("myTag")).toBeInTheDocument();
  });
});
