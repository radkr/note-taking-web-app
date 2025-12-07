import "@testing-library/jest-dom";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NotesPage from "./notes-page";
import ApplicationProvider from "@/app/_lib/app/app-ctx";
import { formatDate } from "@/app/_lib/utils";

// Mock server actions
jest.mock("@/app/_lib/notes/all-notes-actions", () => ({
  readAllNotesAction: jest.fn(),
  readNoteAction: jest.fn(),
  updateNoteAction: jest.fn(),
  createNoteAction: jest.fn(),
  archiveNoteAction: jest.fn(),
  restoreNoteAction: jest.fn(),
  addTagAction: jest.fn(),
  removeTagAction: jest.fn(),
}));

import {
  readAllNotesAction,
  updateNoteAction,
  readNoteAction,
  createNoteAction,
  archiveNoteAction,
  restoreNoteAction,
  addTagAction,
  removeTagAction,
} from "@/app/_lib/notes/all-notes-actions";

// Mock server actions
jest.mock("@/app/_lib/tags/all-tags-actions", () => ({
  readAllTagsAction: jest.fn(Promise.resolve([])),
}));

import { readAllTagsAction } from "@/app/_lib/tags/all-tags-actions";

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
  TAGGED,
} from "@/app/_lib/app/use-app-state";

// Import your QueryClientProvider wrapper
import MyQueryClientProvider from "@/app/_lib/my-query-client/my-query-client";

// Mock all needed next/navigation hooks in a single call
const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  usePathname: () => "/notes",
}));

// Mock IconPlus svg import
jest.mock("@/assets/images/icon-plus.svg", () => ({
  __esModule: true,
  default: () => <svg data-testid="mock-icon" />,
}));

beforeAll(async () => {
  HTMLDialogElement.prototype.show = jest.fn();
  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
});

const notes = [
  {
    _id: "1",
    title: "First Note",
    content: "Hello",
    updatedAt: new Date("2024-06-01T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "Second Note",
    content: "World",
    updatedAt: new Date("2024-06-02T15:30:00.000Z"),
  },
];

const archivedNotes = [
  {
    _id: "1",
    title: "First Note",
    content: "Hello",
    isArchived: true,
    updatedAt: new Date("2024-06-01T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "Second Note",
    content: "World",
    isArchived: true,
    updatedAt: new Date("2024-06-02T15:30:00.000Z"),
  },
];

const taggedNotes = [
  {
    _id: "1",
    title: "First Note",
    content: "Hello",
    isArchived: true,
    tags: [],
    updatedAt: new Date("2024-06-01T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "Second Note",
    content: "World",
    isArchived: true,
    tags: [{ _id: "1", name: "tag1" }],
    updatedAt: new Date("2024-06-02T15:30:00.000Z"),
  },
];

const NotesPageWrapper = ({ children }) => {
  return (
    <MyQueryClientProvider>
      <ApplicationProvider>
        <div id="modal-root" />
        <ul id="toasts-root" />
        {children}
      </ApplicationProvider>
    </MyQueryClientProvider>
  );
};

describe("NotesPage - Browse all my notes", () => {
  it("shows my notes", async () => {
    /*
    GIVEN I have created some notes already
    AND the list of my notes is available on the client
    WHEN I browse the list of my notes
    THEN I can see all my notes in the list
    */
    readAllNotesAction.mockResolvedValueOnce(notes);
    readNoteAction.mockResolvedValueOnce(notes[0]);

    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText("First Note")).toBeInTheDocument();
      expect(screen.getByText("Second Note")).toBeInTheDocument();
    });
  });
});

describe("NotesPage - Read my note", () => {
  it("highlights the first note as opened", async () => {
    /*
    GIVEN I have created some notes already
    AND I opened the notes page
    AND the list of my notes is available on the client
    WHEN I browse the list of my notes
    THEN I can see that the first one of my notes in the list is opened
    */
    readAllNotesAction.mockResolvedValueOnce(notes);
    readNoteAction.mockResolvedValueOnce(notes[0]);
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );
    await waitFor(() => {
      const firstNote = screen.getByText("First Note").closest("li");
      expect(firstNote).toHaveClass("selected");
    });
  });

  it("shows the details of the first note", async () => {
    /*
    GIVEN I have created some notes already
    AND I opened the notes page
    AND the list of my notes is available on the client
    AND the first one of my notes is available on the client
    WHEN I read my note
    THEN I can see the details of the first one of my notes in the list
    */
    readAllNotesAction.mockResolvedValueOnce(notes);
    readNoteAction.mockResolvedValueOnce(notes[0]);
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );
    await waitFor(() => {
      expect(screen.getByDisplayValue("First Note")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Hello")).toBeInTheDocument();
    });
  });

  it("highlights the opened note", async () => {
    /*
    GIVEN I have created some notes already
    AND I opened the page of a specific note
    WHEN I browse the list of my notes
    THEN I can see that the specific note is opened
    */
    readAllNotesAction.mockResolvedValueOnce(notes);
    readNoteAction.mockResolvedValueOnce(notes[1]);
    useAppState.mockReturnValue({ page: NOTE, noteId: "2" });
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );
    await waitFor(() => {
      const secondNote = screen.getByText("Second Note").closest("li");
      expect(secondNote).toHaveClass("selected");
    });
  });

  it("shows the opened note", async () => {
    /*
    GIVEN I have created some notes already
    AND I opened the page of a specific note
    AND the note is available on the client
    WHEN I read my note
    THEN I can see the details of that specific note
    */
    readAllNotesAction.mockResolvedValueOnce(notes);
    readNoteAction.mockResolvedValueOnce(notes[1]);
    useAppState.mockReturnValue({ page: NOTE, noteId: "2" });
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );
    await waitFor(() => {
      expect(screen.getByDisplayValue("Second Note")).toBeInTheDocument();
      expect(screen.getByDisplayValue("World")).toBeInTheDocument();
    });
  });
});

describe("Note - Update my note", () => {
  it("shows the new title in the list of notes for the modified one", async () => {
    /*
    GIVEN I have just saved my note with modified title
    WHEN I browse the list of my notes
    THEN I can see the new title in the list of my notes for the modified one
    */

    // Arrange
    readAllNotesAction.mockResolvedValue(notes);
    readNoteAction.mockResolvedValue(notes[1]);
    useAppState.mockReturnValue({ page: NOTE, noteId: "2" });
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    await waitFor(() => {
      expect(screen.getAllByText("Save Note").length).toBeGreaterThan(0);
    });
    const saveButtonsForAct = screen.getAllByText("Save Note");
    for (let i = 0; i < 2; i++) {
      // Act
      const saveButtonForAct = saveButtonsForAct[i];
      const title = screen.getByLabelText("Title");
      const titleOld = title.value;
      await userEvent.type(title, "a");
      const titleNew = `${titleOld}a`;

      const dateNew = new Date();
      readAllNotesAction.mockResolvedValue([
        notes[0],
        {
          ...notes[1],
          title: titleNew,
        },
      ]);
      updateNoteAction.mockResolvedValue({
        ...notes[1],
        updatedAt: dateNew,
      });

      await userEvent.click(saveButtonForAct);

      // Assert
      await waitFor(() => {
        const allNotes = screen.getByTestId("All Notes");
        expect(within(allNotes).getByText(titleNew)).toBeInTheDocument();
      });
    }
  });

  it("shows that the note was just updated in the note list", async () => {
    /*
    GIVEN I saved my note yesterday
    AND I have just saved my note again
    WHEN I browse the list of my notes
    THEN I can see that the note was last edited today
    */

    // Arrange
    readAllNotesAction.mockResolvedValue(notes);
    readNoteAction.mockResolvedValue(notes[1]);
    useAppState.mockReturnValue({ page: NOTE, noteId: "2" });
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    await waitFor(() => {
      expect(screen.getAllByText("Save Note").length).toBeGreaterThan(0);
    });
    const saveButtonsForAct = screen.getAllByText("Save Note");
    for (let i = 0; i < 2; i++) {
      // Act
      const saveButtonForAct = saveButtonsForAct[i];
      const content = screen.getByLabelText("Content");
      await userEvent.type(content, "a");

      const dateNew = new Date();
      readAllNotesAction.mockResolvedValue([
        notes[0],
        {
          ...notes[1],
          updatedAt: dateNew,
        },
      ]);
      updateNoteAction.mockResolvedValue({
        ...notes[1],
        updatedAt: dateNew,
      });

      await userEvent.click(saveButtonForAct);

      // Assert
      await waitFor(() => {
        const allNotes = screen.getByTestId("All Notes");
        expect(
          within(allNotes).getByText(formatDate(dateNew))
        ).toBeInTheDocument();
      });
    }
  });

  it("shows that the note was just updated in the note details", async () => {
    /*
    GIVEN I saved my note yesterday
    AND I have just saved my note again
    WHEN I read my note
    THEN I can see that the note was last edited today
    */

    // Arrange
    readAllNotesAction.mockResolvedValue(notes);
    readNoteAction.mockResolvedValue(notes[1]);
    useAppState.mockReturnValue({ page: NOTE, noteId: "2" });
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    await waitFor(() => {
      expect(screen.getAllByText("Save Note").length).toBeGreaterThan(0);
    });
    const saveButtonsForAct = screen.getAllByText("Save Note");
    for (let i = 0; i < 2; i++) {
      // Act
      const saveButtonForAct = saveButtonsForAct[i];
      const content = screen.getByLabelText("Content");
      await userEvent.type(content, "a");

      const dateNew = new Date();
      readNoteAction.mockResolvedValue({
        ...notes[1],
        updatedAt: dateNew,
      });
      updateNoteAction.mockResolvedValue({
        ...notes[1],
        updatedAt: dateNew,
      });

      await userEvent.click(saveButtonForAct);

      // Assert
      await waitFor(() => {
        const note = screen.getByTestId("Note");
        expect(within(note).getByText(formatDate(dateNew))).toBeInTheDocument();
      });
    }
  });
});

describe("NotesPage - Create a new note", () => {
  it("creates a new note on notes page - on desktop", async () => {
    /*
    GIVEN I opened the notes page
    WHEN I click on the create new note button
    THEN a new note is stored in the database
    AND I can see a new untitled note in the list of my notes
    */

    // Arrange
    readAllNotesAction.mockResolvedValue([]);
    readNoteAction.mockResolvedValue({});
    useAppState.mockReturnValue({ page: NOTES });
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Untitled Note/i)).not.toBeInTheDocument();
    });

    // Act
    const createButton = screen.getByText(/Create New Note/i).closest("button");

    const newNote = { _id: "1", updatedAt: new Date() };
    createNoteAction.mockResolvedValue(newNote);
    readAllNotesAction.mockResolvedValue([newNote]);
    readNoteAction.mockResolvedValue(newNote);

    await userEvent.click(createButton);

    // Assert
    await waitFor(() => {
      expect(createNoteAction).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText(/Untitled Note/i)).toBeInTheDocument();
    });
  });
  it("creates a new note on notes page - on portable", async () => {
    /*
    GIVEN I opened the notes page
    WHEN I click on the create new note button
    THEN a new note is stored in the database
    AND I can see a new untitled note in the list of my notes
    */

    // Arrange
    readAllNotesAction.mockResolvedValue([]);
    readNoteAction.mockResolvedValue({});
    useAppState.mockReturnValue({ page: NOTES });
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Untitled Note/i)).not.toBeInTheDocument();
    });

    // Act
    const createButton = screen
      .getByLabelText(/Create New Note/i)
      .closest("button");

    const newNote = { _id: "1", updatedAt: new Date() };
    createNoteAction.mockResolvedValue(newNote);
    readAllNotesAction.mockResolvedValue([newNote]);
    readNoteAction.mockResolvedValue(newNote);

    await userEvent.click(createButton);

    // Assert
    await waitFor(() => {
      expect(createNoteAction).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText(/Untitled Note/i)).toBeInTheDocument();
    });
  });

  it("navigate to the page of the new note from notes page - on desktop", async () => {
    /*
    GIVEN I opened the notes page
    WHEN I click on the create new note button
    THEN I get to the page of the new note
    */

    // Arrange
    readAllNotesAction.mockResolvedValue([]);
    readNoteAction.mockResolvedValue({});
    useAppState.mockReturnValue({ page: NOTES });
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    // Act
    const createButton = screen.getByText(/Create New Note/i).closest("button");

    const newNote = { _id: "1", updatedAt: new Date() };
    createNoteAction.mockResolvedValue(newNote);

    await userEvent.click(createButton);

    // Assert
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/notes/1");
    });
  });

  it("navigate to the page of the new note from notes page - on portable", async () => {
    /*
    GIVEN I opened the notes page
    WHEN I click on the create new note button
    THEN I get to the page of the new note
    */

    // Arrange
    readAllNotesAction.mockResolvedValue([]);
    readNoteAction.mockResolvedValue({});
    useAppState.mockReturnValue({ page: NOTES });
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    // Act
    const createButton = screen
      .getByLabelText(/Create New Note/i)
      .closest("button");

    const newNote = { _id: "1", updatedAt: new Date() };
    createNoteAction.mockResolvedValue(newNote);

    await userEvent.click(createButton);

    // Assert
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/notes/1");
    });
  });

  it("creates a new note on the page of a specific note - on desktop", async () => {
    /*
    GIVEN I opened the page of a specific note
    WHEN I click on the create new note button
    THEN a new note is stored in the database
    AND I can see a new untitled note in the list of my notes
    */

    // Arrange
    readAllNotesAction.mockResolvedValue(notes);
    readNoteAction.mockResolvedValue(notes[0]);
    useAppState.mockReturnValue({ page: NOTE, noteId: "1" });
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Untitled Note/i)).not.toBeInTheDocument();
    });

    // Act
    const createButton = screen.getByText(/Create New Note/i).closest("button");

    const newNote = { _id: "3", updatedAt: new Date() };
    createNoteAction.mockResolvedValue(newNote);
    readAllNotesAction.mockResolvedValue([...notes, newNote]);
    readNoteAction.mockResolvedValue(newNote);

    await userEvent.click(createButton);

    // Assert
    await waitFor(() => {
      expect(createNoteAction).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText(/Untitled Note/i)).toBeInTheDocument();
    });
  });

  it("creates a new note on the page of a specific note - on portable", async () => {
    /*
    GIVEN I opened the page of a specific note
    WHEN I click on the create new note button
    THEN a new note is stored in the database
    AND I can see a new untitled note in the list of my notes
    */

    // Arrange
    readAllNotesAction.mockResolvedValue(notes);
    readNoteAction.mockResolvedValue(notes[0]);
    useAppState.mockReturnValue({ page: NOTE, noteId: "1" });
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    await waitFor(() => {
      expect(screen.queryByText(/Untitled Note/i)).not.toBeInTheDocument();
    });

    // Act
    const createButton = screen
      .getByLabelText(/Create New Note/i)
      .closest("button");

    const newNote = { _id: "3", updatedAt: new Date() };
    createNoteAction.mockResolvedValue(newNote);
    readAllNotesAction.mockResolvedValue([...notes, newNote]);
    readNoteAction.mockResolvedValue(newNote);

    await userEvent.click(createButton);

    // Assert
    await waitFor(() => {
      expect(createNoteAction).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText(/Untitled Note/i)).toBeInTheDocument();
    });
  });

  it("navigate to the page of the new note from the page of a specific note - on desktop", async () => {
    /*
    GIVEN I opened the page of a specific note
    WHEN I click on the create new note button
    THEN I get to the page of the new note
    */

    // Arrange
    readAllNotesAction.mockResolvedValue(notes);
    readNoteAction.mockResolvedValue(notes[0]);
    useAppState.mockReturnValue({ page: NOTE, noteId: "1" });
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    // Act
    const createButton = screen.getByText(/Create New Note/i).closest("button");

    const newNote = { _id: "3", updatedAt: new Date() };
    createNoteAction.mockResolvedValue(newNote);

    await userEvent.click(createButton);

    // Assert
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/notes/3");
    });
  });

  it("navigate to the page of the new note from the page of a specific note - on portable", async () => {
    /*
    GIVEN I opened the page of a specific note
    WHEN I click on the create new note button
    THEN I get to the page of the new note
    */

    // Arrange
    readAllNotesAction.mockResolvedValue(notes);
    readNoteAction.mockResolvedValue(notes[0]);
    useAppState.mockReturnValue({ page: NOTE, noteId: "1" });
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    // Act
    const createButton = screen
      .getByLabelText(/Create New Note/i)
      .closest("button");

    const newNote = { _id: "3", updatedAt: new Date() };
    createNoteAction.mockResolvedValue(newNote);

    await userEvent.click(createButton);

    // Assert
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/notes/3");
    });
  });
});

describe("NotesPage - Browse my archived notes", () => {
  it("shows my archived notes", async () => {
    /*
    GIVEN I have archived some notes already
    AND the list of my notes is available on the client
    WHEN I browse the list of my archived notes
    THEN I can see all my archived notes in the list
    */
    useAppState.mockReturnValue({
      page: NOTES,
      subPage: ARCHIVED,
    });
    readAllNotesAction.mockResolvedValueOnce(archivedNotes);
    readNoteAction.mockResolvedValueOnce(archivedNotes[0]);

    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    await waitFor(() => {
      expect(readAllNotesAction).toHaveBeenCalledWith(true, "", undefined);
      expect(screen.getByText("First Note")).toBeInTheDocument();
      expect(screen.getByText("Second Note")).toBeInTheDocument();
    });
  });
});

describe("NotesPage - Archive one of my notes", () => {
  it("does not show the note in the list after archivation - portable", async () => {
    /*
    GIVEN I opened the page of a specific note
    WHEN I click on the archive button
    THEN I no longer see the note in the list of my notes
    */

    // Arrange
    readAllNotesAction.mockResolvedValueOnce(notes);
    readNoteAction.mockResolvedValue(notes[1]);
    useAppState.mockReturnValue({ page: NOTE, noteId: "2" });
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Archive Note")).toBeInTheDocument();
    });

    const archiveButton = screen.getByLabelText("Archive Note");

    readAllNotesAction.mockResolvedValue([notes[0]]);
    archiveNoteAction.mockResolvedValue({});
    // Act
    await userEvent.click(archiveButton);

    // Assert
    await waitFor(() => {
      const allNotes = screen.getByTestId("All Notes");
      expect(within(allNotes).getByText("First Note")).toBeInTheDocument();
      expect(
        within(allNotes).queryByText("Second Note")
      ).not.toBeInTheDocument();
    });
  });

  it("shows toast message on successful archivation", async () => {
    /*
    GIVEN I opened the page of a specific note
    WHEN I click on the archive button
    THEN the note is stored in the database as archived note
    AND I can see a successfully archived toast message
    */

    // Arrange
    readAllNotesAction.mockResolvedValue(notes);
    readNoteAction.mockResolvedValue(notes[1]);
    useAppState.mockReturnValue({ page: NOTE, noteId: "2" });
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Archive Note")).toBeInTheDocument();
    });

    const archiveButton = screen.getByLabelText("Archive Note");

    archiveNoteAction.mockResolvedValue({});

    // Act
    await userEvent.click(archiveButton);

    // Assert
    await waitFor(() => {
      expect(archiveNoteAction).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText("Note archived.")).toBeInTheDocument();
    });
  });
});

describe("NotesPage - Restore one of my archived notes", () => {
  it("does not show the note in the archived list after restoration", async () => {
    /*
    GIVEN I opened the page of a specific note
    WHEN I click on the archive button
    THEN I no longer see the note in the list of my notes
    */

    // Arrange
    readAllNotesAction.mockResolvedValueOnce(archivedNotes);
    readNoteAction.mockResolvedValue(archivedNotes[1]);
    useAppState.mockReturnValue({ page: NOTE, noteId: "2" });
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Restore Note")).toBeInTheDocument();
    });

    const restoreButton = screen.getByLabelText("Restore Note");

    readAllNotesAction.mockResolvedValue([archivedNotes[0]]);
    restoreNoteAction.mockResolvedValue({});
    // Act
    await userEvent.click(restoreButton);

    // Assert
    await waitFor(() => {
      const allNotes = screen.getByTestId("All Notes");
      expect(within(allNotes).getByText("First Note")).toBeInTheDocument();
      expect(
        within(allNotes).queryByText("Second Note")
      ).not.toBeInTheDocument();
    });
  });

  it("shows toast message on successful restoration", async () => {
    /*
    GIVEN I opened the page of a specific note
    WHEN I click on the archive button
    THEN the note is stored in the database as archived note
    AND I can see a successfully archived toast message
    */

    // Arrange
    readAllNotesAction.mockResolvedValue(archivedNotes);
    readNoteAction.mockResolvedValue(archivedNotes[1]);
    useAppState.mockReturnValue({ page: NOTE, noteId: "2" });
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Restore Note")).toBeInTheDocument();
    });

    const restoreButton = screen.getByLabelText("Restore Note");

    restoreNoteAction.mockResolvedValue({});

    // Act
    await userEvent.click(restoreButton);

    // Assert
    await waitFor(() => {
      expect(restoreNoteAction).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(
        screen.getByText("Note restored to active notes.")
      ).toBeInTheDocument();
    });
  });
});

describe("NotesPage - Browse my notes with a specific search term", () => {
  it("shows my search results", async () => {
    /*
    GIVEN I have created some notes already that contains the term
    AND the list of my notes for the ter is available on the client
    WHEN I browse the list of my notes for the term
    THEN I can see all my notes for the term in the list
    */
    readAllNotesAction.mockResolvedValueOnce(notes);
    readNoteAction.mockResolvedValueOnce(notes[0]);

    useAppState.mockReturnValue({
      page: NOTES,
      subPage: SEARCH,
      term: "myTerm",
    });

    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    expect(readAllNotesAction).toHaveBeenCalledWith(false, "myTerm", undefined);
    await waitFor(() => {
      expect(screen.getByText("First Note")).toBeInTheDocument();
      expect(screen.getByText("Second Note")).toBeInTheDocument();
    });
  });
});

describe("NotesPage - Add or remove tags to or from my note", () => {
  it("adds a tag to the note", async () => {
    /*
    GIVEN the note is available on the client
    WHEN I add a new tag to the note
    THEN I can see the new tag amongst the note's tags
    AND the note is updated in the database with the new tag
    AND I can see a successfully added toast message
    */

    // Arrange
    readAllNotesAction.mockResolvedValueOnce(taggedNotes);
    readNoteAction.mockResolvedValueOnce(taggedNotes[0]);
    useAppState.mockReturnValue({ page: NOTE, noteId: "1" });
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    let addNewTagInput;

    await waitFor(() => {
      addNewTagInput = screen.getByLabelText("Add tag");
      expect(addNewTagInput).toBeInTheDocument();
    });

    addTagAction.mockResolvedValue({ message: "Tag added successfully!" });
    readAllNotesAction.mockResolvedValue(taggedNotes);
    readNoteAction.mockResolvedValue({
      ...taggedNotes[0],
      tags: [...taggedNotes[0].tags, { _id: "2", name: "testTag" }],
    });

    // Act
    await userEvent.type(addNewTagInput, "testTag{enter}");

    await waitFor(() => {
      expect(screen.getByText("testTag")).toBeInTheDocument();
    });

    // Assert
    await waitFor(() => {
      expect(addTagAction).toHaveBeenCalledWith(
        {
          note: taggedNotes[0],
          tagName: "testTag",
        },
        { client: {}, meta: undefined, mutationKey: undefined }
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Tag added successfully!")).toBeInTheDocument();
    });
  });

  it("does not add an already added tag to the note", async () => {
    /*
    GIVEN the note is available on the client
    AND the note has some tags
    WHEN I add a tag to the note that has been added already
    THEN I can see the tag amongst the note's tags only once
    AND I can see an already added toast message
    */

    // Arrange
    readAllNotesAction.mockResolvedValueOnce(taggedNotes);
    readNoteAction.mockResolvedValueOnce(taggedNotes[1]);
    useAppState.mockReturnValue({ page: NOTE, noteId: "2" });
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    let addNewTagInput;

    await waitFor(() => {
      addNewTagInput = screen.getByLabelText("Add tag");
      expect(addNewTagInput).toBeInTheDocument();
    });

    addTagAction.mockResolvedValue({ message: "Tag added already!" });
    readAllNotesAction.mockResolvedValue(taggedNotes);
    readNoteAction.mockResolvedValue(taggedNotes[1]);

    // Act
    await userEvent.type(addNewTagInput, "tag1{enter}");

    // Assert
    await waitFor(() => {
      expect(
        within(screen.getByTestId("Note")).getAllByText("tag1").length
      ).toBe(1);
    });

    await waitFor(() => {
      expect(screen.getByText("Tag added already!")).toBeInTheDocument();
    });
  });

  it("shows an error toast message on fail to add a new tag", async () => {
    /*
    GIVEN the note is available on the client
    WHEN I add a new tag to the note
    AND the note fails to be updated in the database with the new tag
    THEN I can see a tag failed to add toast message
    */

    // Arrange
    readAllNotesAction.mockResolvedValue(taggedNotes);
    readNoteAction.mockResolvedValue(taggedNotes[1]);
    useAppState.mockReturnValue({ page: NOTE, noteId: "2" });
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    let addNewTagInput;

    await waitFor(() => {
      addNewTagInput = screen.getByLabelText("Add tag");
      expect(addNewTagInput).toBeInTheDocument();
    });

    addTagAction.mockResolvedValue({ error: "Error" });

    // Act
    await userEvent.type(addNewTagInput, "tag1{enter}");

    // Assert
    await waitFor(() => {
      expect(addTagAction).toHaveBeenCalledWith(
        {
          note: taggedNotes[1],
          tagName: "tag1",
        },
        { client: {}, meta: undefined, mutationKey: undefined }
      );
    });

    await waitFor(() => {
      expect(screen.getByText("The tag can not be added.")).toBeInTheDocument();
    });
  });

  it("removes a tag from the note", async () => {
    /*
    GIVEN the note is available on the client
    AND the note has some tags
    WHEN I remove a tag from the note
    THEN I no longer see the removed tag among the note's tags
    AND the tag is removed from the note in the database
    */

    // Arrange
    readAllNotesAction.mockResolvedValue(taggedNotes);
    readNoteAction.mockResolvedValue(taggedNotes[1]);
    useAppState.mockReturnValue({ page: NOTE, noteId: "2" });
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    let removeTagButton;

    await waitFor(() => {
      expect(
        within(screen.getByTestId("Note")).getByText("tag1")
      ).toBeInTheDocument();
      removeTagButton = screen.getByLabelText(/Remove the tag1 tag/i);
      expect(removeTagButton).toBeInTheDocument();
    });

    removeTagAction.mockResolvedValue({ message: "Tag removed successfully!" });
    readAllNotesAction.mockResolvedValue(taggedNotes);
    readNoteAction.mockResolvedValue({
      ...taggedNotes[1],
      tags: [],
    });

    // Act
    await userEvent.click(removeTagButton);

    await waitFor(() => {
      expect(
        within(screen.getByTestId("Note")).queryByText("tag1")
      ).not.toBeInTheDocument();
    });

    // Assert
    await waitFor(() => {
      expect(removeTagAction).toHaveBeenCalledWith(
        {
          note: taggedNotes[1],
          tagId: "1",
        },
        { client: {}, meta: undefined, mutationKey: undefined }
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Tag removed successfully!")).toBeInTheDocument();
    });
  });

  it("shows an error toast message on fail to remove a tag", async () => {
    /*
    GIVEN the note is available on the client
    WHEN I add a new tag to the note
    AND the note fails to be updated in the database with the new tag
    THEN I can see a tag failed to add toast message
    */

    // Arrange
    readAllNotesAction.mockResolvedValue(taggedNotes);
    readNoteAction.mockResolvedValue(taggedNotes[1]);
    useAppState.mockReturnValue({ page: NOTE, noteId: "2" });
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    let removeTagButton;

    await waitFor(() => {
      expect(
        within(screen.getByTestId("Note")).getByText("tag1")
      ).toBeInTheDocument();
      removeTagButton = screen.getByLabelText(/Remove the tag1 tag/i);
      expect(removeTagButton).toBeInTheDocument();
    });

    removeTagAction.mockResolvedValue({ error: "Error" });
    readAllNotesAction.mockResolvedValue(taggedNotes);
    readNoteAction.mockResolvedValue({
      ...taggedNotes[1],
      tags: [],
    });

    // Act
    await userEvent.click(removeTagButton);

    // Assert
    await waitFor(() => {
      expect(removeTagAction).toHaveBeenCalledWith(
        {
          note: taggedNotes[1],
          tagId: "1",
        },
        { client: {}, meta: undefined, mutationKey: undefined }
      );
    });

    await waitFor(() => {
      expect(
        within(screen.getByTestId("Note")).getByText("tag1")
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText("The tag can not be removed.")
      ).toBeInTheDocument();
    });
  });
});

describe("NotesPage - Browse my notes with a specific tag", () => {
  it("shows my tagged notes", async () => {
    /*
    GIVEN I have created some notes already that have the tag
    AND the list of my notes for the tag is available on the client
    WHEN I browse the list of my notes for the tag
    THEN I can see all my notes for the tag in the list
    */
    readAllNotesAction.mockResolvedValueOnce(notes);
    readNoteAction.mockResolvedValueOnce(notes[0]);

    useAppState.mockReturnValue({
      page: NOTES,
      subPage: TAGGED,
      tag: "1",
    });

    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );

    expect(readAllNotesAction).toHaveBeenCalledWith(false, "", "1");
    await waitFor(() => {
      expect(screen.getByText("First Note")).toBeInTheDocument();
      expect(screen.getByText("Second Note")).toBeInTheDocument();
    });
  });
});
