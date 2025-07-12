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
}));

import {
  readAllNotesAction,
  updateNoteAction,
  readNoteAction,
  createNoteAction,
} from "@/app/_lib/notes/all-notes-actions";

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

import { useAppState, NOTES, NOTE } from "@/app/_lib/app/use-app-state";

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
  it("shows a note placeholder", async () => {
    /*
    GIVEN I have not created any notes yet
    AND the list of my notes is available on the client
    WHEN I read my note
    THEN I can see an empty placeholder where the note details should be
    */
    readAllNotesAction.mockResolvedValueOnce([]);
    render(
      <NotesPageWrapper>
        <NotesPage />
      </NotesPageWrapper>
    );
    await waitFor(() => {
      // TODO: change the placeholder
      expect(
        screen.getByText(/You don’t have any notes yet/i)
      ).toBeInTheDocument();
    });
  });

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
      isArchived: true,
    });
    readAllNotesAction.mockResolvedValueOnce(archivedNotes);
    readNoteAction.mockResolvedValueOnce(archivedNotes[0]);

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
