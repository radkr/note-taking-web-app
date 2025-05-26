import { use } from "react";
import "@testing-library/jest-dom";
import {
  render,
  renderHook,
  screen,
  waitFor,
  act,
} from "@testing-library/react";

import { getAllNotes, getNoteWithId } from "@/app/_lib/notes/all-notes-db";
import { AppCtx, NOTE, NOTES } from "@/app/_lib/application/app-ctx";
import AllNotesProvider, { AllNotesCtx } from "@/app/_lib/notes/all-notes-ctx";
import { mockPlainNotes } from "@/__test__/utils";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";

jest.mock("@/assets/images/icon-delete.svg", () => ({
  __esModule: true,
  default: () => <svg data-testid="mock-icon" />,
}));

const router = {
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
};

jest.mock("next/navigation", () => ({
  // Keep other actual exports intact (optional)
  ...jest.requireActual("next/navigation"),

  useRouter: () => router,

  usePathname: jest.fn(),
}));

jest.mock("@/app/_lib/notes/all-notes-db");

beforeAll(() => {
  HTMLDialogElement.prototype.show = jest.fn();
  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
});

describe("AllNotesCtx browse notes", () => {
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
      expect(allNotes.result.current.note._id).toBe("0");
    });

    // Navigate to /notes/1
    appCtxValue.activePage = NOTE;
    appCtxValue.noteId = "1";
    allNotes.rerender();

    await waitFor(() => {
      expect(allNotes.result.current.note._id).toBe("1");
    });

    // Navigate to /notes
    appCtxValue.activePage = NOTES;
    appCtxValue.noteId = undefined;
    allNotes.rerender();

    await waitFor(() => {
      expect(allNotes.result.current.note._id).not.toBe("0");
    });
  });
});

describe("AllNotesCtx delete notes", () => {
  it("fetches the proper notes and note after deletion", async () => {
    getAllNotes.mockResolvedValue(mockPlainNotes);
    getNoteWithId.mockResolvedValue(mockPlainNotes[0]);

    // Navigate to /notes/0
    let appCtxValue = {
      activePage: NOTE,
      noteId: "0",
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
      expect(allNotes.result.current.note._id).toBe("0");
    });

    // Delete the note
    getAllNotes.mockResolvedValue(mockPlainNotes.slice(1));
    getNoteWithId.mockResolvedValue(mockPlainNotes[1]);

    act(() => {
      allNotes.result.current.deleteNote();
    });

    const confirmButton = screen.getByText("Delete Note", {
      selector: "button",
    });
    await userEvent.click(confirmButton);

    await waitFor(() => {
      expect(router.push).toHaveBeenCalled();
    });

    appCtxValue.activePage = NOTES;
    appCtxValue.noteId = undefined;
    allNotes.rerender();

    await waitFor(() => {
      expect(allNotes.result.current.notes.length).toBe(1);
    });
    await waitFor(() => {
      expect(allNotes.result.current.note._id).toBe("1");
    });
  });
});
