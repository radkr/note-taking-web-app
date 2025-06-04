import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import {
  readAllNotesAction,
  readNoteAction,
} from "@/app/_lib/notes/all-notes-actions";
import { mockNotes, mockPlainNotes } from "@/__test__/utils";
import Note from "./all-notes-model";

jest.mock("@/app/_lib/database/__mocks__/database");
jest.mock("./all-notes-model");
jest.mock("@/app/_lib/database/database");

describe("getAllNotes", () => {
  beforeEach(() => {
    Note.find.mockResolvedValue(mockNotes);
  });

  it("fetch all notes", async () => {
    const allNotes = await readAllNotesAction();
    expect(Note.find).toHaveBeenCalled();
    expect(allNotes.length).toBe(2);
  });

  it("returns notes with _id of string", async () => {
    const allNotes = await readAllNotesAction();
    expect(typeof allNotes[0]._id).toBe("string");
    expect(allNotes[0]._id).toBe("0");
  });

  it("returns notes with title", async () => {
    const allNotes = await readAllNotesAction();
    expect(allNotes[0].title).toBe(mockPlainNotes[0].title);
  });

  it("returns notes with content", async () => {
    const allNotes = await readAllNotesAction();
    expect(allNotes[0].content).toBe(mockPlainNotes[0].content);
  });

  it("returns notes with lastEdited of proper format", async () => {
    const allNotes = await readAllNotesAction();
    expect(allNotes[0].lastEdited).toBe("29 Oct 2024");
  });
});

describe("getNoteWithId", () => {
  beforeEach(() => {
    Note.findById.mockResolvedValue(mockNotes[0]);
  });

  it("fetch note with _id of '0'", async () => {
    const note = await readNoteAction("0");
    expect(Note.findById).toHaveBeenCalledWith("0");
  });

  it("returns note with _id of string", async () => {
    const note = await readNoteAction("0");
    expect(typeof note._id).toBe("string");
    expect(note._id).toBe("0");
  });

  it("returns note with title", async () => {
    const note = await readNoteAction("0");
    expect(note.title).toBe(mockPlainNotes[0].title);
  });

  it("returns note with content", async () => {
    const note = await readNoteAction("0");
    expect(note.content).toBe(mockPlainNotes[0].content);
  });

  it("returns note with lastEdited of proper format", async () => {
    const note = await readNoteAction("0");
    expect(note.lastEdited).toBe(mockPlainNotes[0].lastEdited);
  });
});

describe("getNoteWithId", () => {
  it("returns note with error if any", async () => {
    Note.findById.mockRejectedValue(null);
    const note = await readNoteAction("0");
    expect(note._id).toBe("0");
    expect(note).not.toHaveProperty("title");
    expect(note).not.toHaveProperty("content");
    expect(note).not.toHaveProperty("lastEdited");
    expect(note.error).toBe("The note can not be found.");
  });
});
