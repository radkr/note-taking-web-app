import { use } from "react";
import "@testing-library/jest-dom";
import { render, renderHook, screen, waitFor } from "@testing-library/react";

import { getAllNotes, getNoteWithId } from "@/app/_lib/notes/all-notes-db";
import { AppCtx, NOTE, NOTES } from "@/app/_lib/application/app-ctx";
import AllNotesProvider, { AllNotesCtx } from "@/app/_lib/notes/all-notes-ctx";
import { mockPlainNotes } from "@/__test__/utils";

jest.mock("@/app/_lib/notes/all-notes-db");

beforeAll(() => {
  HTMLDialogElement.prototype.show = jest.fn();
  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
});

describe("AllNotesCtx", () => {
  it("fetches the proper notes and note as navigating between /notes and /notes/1 back and forth", async () => {
    getAllNotes.mockResolvedValue(mockPlainNotes);
    getNoteWithId.mockResolvedValue(mockPlainNotes[0]);

    // Navigate to /notes
    let appCtxValue = {
      activePage: NOTES,
      noteId: undefined,
    };

    const wrapper = ({ children }) => (
      <>
        <div id="modal-root" />
        <AppCtx value={appCtxValue}>
          <AllNotesProvider>{children}</AllNotesProvider>
        </AppCtx>
      </>
    );

    const allNotes = renderHook(() => use(AllNotesCtx), { wrapper });

    await waitFor(() => {
      expect(allNotes.result.current.notes.length).toBe(2);
    });
    await waitFor(() => {
      expect(allNotes.result.current.note._id).toBe(0);
    });

    // Navigate to /notes/1
    appCtxValue.activePage = NOTE;
    appCtxValue.noteId = 1;
    allNotes.rerender();

    await waitFor(() => {
      expect(allNotes.result.current.note._id).toBe(1);
    });

    // Navigate to /notes
    appCtxValue.activePage = NOTES;
    appCtxValue.noteId = undefined;
    allNotes.rerender();

    await waitFor(() => {
      expect(allNotes.result.current.note._id).not.toBe(0);
    });
  });
});
