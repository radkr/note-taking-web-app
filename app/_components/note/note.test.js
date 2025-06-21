import "@testing-library/jest-dom";
import {
  render,
  screen,
  waitFor,
  within,
  fireEvent,
} from "@testing-library/react";
import Note from "./note";
import {
  deleteNoteAction,
  updateNoteAction,
} from "@/app/_lib/notes/all-notes-actions";
import MyQueryClientProvider from "@/app/_lib/my-query-client/my-query-client";
import userEvent from "@testing-library/user-event";
import ApplicationProvider from "@/app/_lib/app/app-ctx";

jest.mock("@/app/_lib/notes/all-notes-actions.js", () => ({
  deleteNoteAction: jest.fn(),
  updateNoteAction: jest.fn(),
}));

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  usePathname: () => "notes/1",
}));

// Mock IconSettings and IconHome components

jest.mock("@/assets/images/icon-arrow-left.svg", () => ({
  __esModule: true,
  default: () => <svg data-testid="icon-left-arrow" />,
}));

beforeAll(async () => {
  HTMLDialogElement.prototype.show = jest.fn();
  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
});

const NoteWrapper = ({ children }) => {
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

describe("Note - Read my note", () => {
  it("indicates that the note is loading", () => {
    /*
    GIVEN the note is not yet available on the client
    WHEN I read my note
    THEN I can see a loading message
    */
    render(
      <NoteWrapper>
        <Note
          id="1"
          note={{ data: null, isLoading: true, isError: false, error: null }}
        />
      </NoteWrapper>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows the note title placeholder", () => {
    /*
    GIVEN the note is available on the client
    AND the note does not have a title yet
    WHEN I read my note
    THEN I can see a placeholder text where the title of the note should be
    */
    render(
      <NoteWrapper>
        <Note
          id="1"
          note={{
            data: {
              _id: "1",
              title: "",
              content: "",
              updatedAt: new Date("2024-06-01T12:00:00.000Z"),
            },
            isLoading: false,
            isError: false,
            error: null,
          }}
        />
      </NoteWrapper>
    );
    expect(screen.getByPlaceholderText("Enter a title…")).toBeInTheDocument();
  });

  it("shows the note title", () => {
    /*
    GIVEN the note is available on the client
    AND the note has a title
    WHEN I read my note
    THEN I can see the title of the note
    */
    render(
      <NoteWrapper>
        <Note
          id="1"
          note={{
            data: {
              _id: "1",
              title: "My Note",
              content: "",
              updatedAt: new Date("2024-06-01T12:00:00.000Z"),
            },
            isLoading: false,
            isError: false,
            error: null,
          }}
        />
      </NoteWrapper>
    );
    expect(screen.getByDisplayValue("My Note")).toBeInTheDocument();
  });

  it("shows the note content placeholder", () => {
    /*
    GIVEN the note is available on the client
    AND the note does not have any content yet
    WHEN I read my note
    THEN I can see a placeholder text where the content of the note should be
    */
    render(
      <NoteWrapper>
        <Note
          id="1"
          note={{
            data: {
              _id: "1",
              title: "My Note",
              updatedAt: new Date("2024-06-01T12:00:00.000Z"),
            },
            isLoading: false,
            isError: false,
            error: null,
          }}
        />
      </NoteWrapper>
    );
    expect(
      screen.getByPlaceholderText("Start typing your note here…")
    ).toBeInTheDocument();
  });

  it("shows the note content", () => {
    /*
    GIVEN the note is available on the client
    AND the note has some content
    WHEN I read my note
    THEN I can see the content of the note
    */
    render(
      <NoteWrapper>
        <Note
          id="1"
          note={{
            data: {
              _id: "1",
              title: "My Note",
              content: "Some content",
              updatedAt: new Date("2024-06-01T12:00:00.000Z"),
            },
            isLoading: false,
            isError: false,
            error: null,
          }}
        />
      </NoteWrapper>
    );
    expect(screen.getByDisplayValue("Some content")).toBeInTheDocument();
  });

  it("shows when was the note last edited", () => {
    /*
    GIVEN the note is available on the client
    WHEN I read my note
    THEN I can see when was the note last edited
    */
    render(
      <NoteWrapper>
        <Note
          id="1"
          note={{
            data: {
              _id: "1",
              title: "My Note",
              content: "Some content",
              updatedAt: new Date("2024-06-01T12:00:00.000Z"),
            },
            isLoading: false,
            isError: false,
            error: null,
          }}
        />
      </NoteWrapper>
    );
    expect(screen.getByText("01 Jun 2024")).toBeInTheDocument();
  });

  it("shows error message when the note does not exists", () => {
    /*
    GIVEN I opened the page of a specific note
    AND the note does not exist in the database
    WHEN I read my note
    THEN I can see a \"couldn't find\" error message
    */
    render(
      <NoteWrapper>
        <Note
          id="1"
          note={{ data: { error: "error" }, isLoading: false, isError: false }}
        />
      </NoteWrapper>
    );
    expect(
      screen.getByText(
        /We couldn’t find this note — it may have been deleted, or you might not have permission to view it/i
      )
    ).toBeInTheDocument();
  });

  it("shows error message when user is not permitted to view the note", () => {
    /*
    GIVEN I opened the page of a specific note
    AND the user is not permitted to view the note
    WHEN I read my note
    THEN I can see a \"couldn't find\" error message
    */
    render(
      <NoteWrapper>
        <Note
          id="1"
          note={{ data: { error: "error" }, isLoading: false, isError: false }}
        />
      </NoteWrapper>
    );
    expect(
      screen.getByText(
        /We couldn’t find this note — it may have been deleted, or you might not have permission to view it/i
      )
    ).toBeInTheDocument();
  });

  it('opens the login page when clicking on "log in with a different account"', () => {
    /*
    GIVEN I opened the page of a specific note
    AND I can see a "couldn't find" error message
    WHEN I click on "log in with a different account"
    THEN I get to the login page
    */
    render(
      <NoteWrapper>
        <Note
          id="1"
          note={{ data: { error: "error" }, isLoading: false, isError: false }}
        />
      </NoteWrapper>
    );
    const loginLink = screen.getByText(/log in with a different account/i);
    expect(loginLink).toHaveAttribute("href", "/login");
  });
});

const mockNote = {
  data: {
    _id: "1",
    title: "My Note",
    content: "Some content",
    updatedAt: new Date("2024-06-01T12:00:00.000Z"),
  },
  isLoading: false,
  isError: false,
  error: null,
};

describe("Note - Delete my note", () => {
  it("opens the delete confirmation modal - on a portable", async () => {
    /*
    GIVEN I opened the page of a specific note
    AND the note is available on the client
    WHEN I click on the delete button
    THEN I can see a delete confirmation modal for the note
    */

    render(
      <NoteWrapper>
        <Note id="1" note={mockNote} />
      </NoteWrapper>
    );

    await userEvent.click(screen.getByLabelText(/Delete Note/i));

    const modal = screen.getByTestId("Delete Note Modal");
    await waitFor(() => {
      expect(
        within(modal).getByText(
          /Are you sure you want to permanently delete this note/i
        )
      ).toBeInTheDocument();
    });
  });

  it("opens the delete confirmation modal - on a desktop", async () => {
    /*
    GIVEN I opened the page of a specific note
    AND the note is available on the client
    WHEN I click on the delete button
    THEN I can see a delete confirmation modal for the note
    */

    render(
      <NoteWrapper>
        <Note id="1" note={mockNote} />
      </NoteWrapper>
    );

    await userEvent.click(screen.getByText(/Delete Note/i));

    const modal = screen.getByTestId("Delete Note Modal");
    await waitFor(() => {
      expect(
        within(modal).getByText(
          /Are you sure you want to permanently delete this note/i
        )
      ).toBeInTheDocument();
    });
  });

  it("the delete confirmation modal disappears on cancel", async () => {
    /*
    GIVEN I can see a delete confirmation modal for the note
    WHEN I click on the cancle button
    THEN I no longer see the delete confirmation modal
    */

    // Arrange
    render(
      <NoteWrapper>
        <Note id="1" note={mockNote} />
      </NoteWrapper>
    );

    const modalText = /Are you sure you want to permanently delete this note/i;

    await userEvent.click(screen.getByLabelText(/Delete Note/i));

    let modal = screen.getByTestId("Delete Note Modal");
    await waitFor(() => {
      expect(screen.getByText(modalText)).toBeInTheDocument();
    });

    // Act
    await userEvent.click(within(modal).getByText("Cancel"));

    // Assert
    fireEvent.animationEnd(modal);
    await waitFor(() => {
      expect(screen.queryByText(modalText)).not.toBeInTheDocument();
    });
  });

  it("does not delete the note on cancel", async () => {
    /*
    GIVEN I can see a delete confirmation modal for the note
    WHEN I click on the cancel button
    THEN the note is still stored in the database
    AND I can see the note in the list of my notes
    */

    // Arrange
    render(
      <NoteWrapper>
        <Note id="1" note={mockNote} />
      </NoteWrapper>
    );

    const modalText = /Are you sure you want to permanently delete this note/i;

    await userEvent.click(screen.getByLabelText(/Delete Note/i));

    let modal = screen.getByTestId("Delete Note Modal");
    await waitFor(() => {
      expect(screen.getByText(modalText)).toBeInTheDocument();
    });

    // Act
    await userEvent.click(within(modal).getByText("Cancel"));

    // Assert
    await waitFor(() => {
      expect(deleteNoteAction).not.toHaveBeenCalled();
    });
  });

  it("the delete confirmation modal disappears on confirmation", async () => {
    /*
    GIVEN I can see a delete confirmation modal for the note
    WHEN I click on the confirm button
    THEN I no longer see the delete confirmation modal
    */

    // Arrange
    render(
      <NoteWrapper>
        <Note id="1" note={mockNote} />
      </NoteWrapper>
    );

    const modalText = /Are you sure you want to permanently delete this note/i;

    await userEvent.click(screen.getByLabelText(/Delete Note/i));

    let modal = screen.getByTestId("Delete Note Modal");
    await waitFor(() => {
      expect(screen.getByText(modalText)).toBeInTheDocument();
    });

    // Act
    await userEvent.click(
      within(modal).getByText("Delete Note", { selector: "button" })
    );
    fireEvent.animationEnd(modal);

    // Assert
    await waitFor(() => {
      expect(screen.queryByText(modalText)).not.toBeInTheDocument();
    });
  });

  it("deletes the note on confirmation", async () => {
    /*
    GIVEN I can see a delete confirmation modal for the note
    WHEN I click on the confirm button
    THEN I no longer see the note in the list of my notes
    */

    // Arrange
    render(
      <NoteWrapper>
        <Note id="1" note={mockNote} />
      </NoteWrapper>
    );

    const modalText = /Are you sure you want to permanently delete this note/i;

    await userEvent.click(screen.getByLabelText(/Delete Note/i));

    let modal = screen.getByTestId("Delete Note Modal");
    await waitFor(() => {
      expect(screen.getByText(modalText)).toBeInTheDocument();
    });

    // Act
    await userEvent.click(
      within(modal).getByText("Delete Note", { selector: "button" })
    );

    // Assert
    await waitFor(() => {
      expect(deleteNoteAction).toHaveBeenCalledWith(mockNote.data._id);
    });
  });

  it("navigates to the notes page after confirming deletion", async () => {
    /*
    GIVEN I can see a delete confirmation modal for the note
    WHEN I click on the confirm button
    THEN I get to the notes page
    */

    // Arrange
    render(
      <NoteWrapper>
        <Note id="1" note={mockNote} />
      </NoteWrapper>
    );

    const modalText = /Are you sure you want to permanently delete this note/i;

    await userEvent.click(screen.getByLabelText(/Delete Note/i));

    let modal = screen.getByTestId("Delete Note Modal");
    await waitFor(() => {
      expect(screen.getByText(modalText)).toBeInTheDocument();
    });

    // Act
    await userEvent.click(
      within(modal).getByText("Delete Note", { selector: "button" })
    );

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/notes");
    });
  });

  it("shows toast message on successful deletion", async () => {
    /*
    GIVEN I can see a delete confirmation modal for the note
    WHEN I click on the confirm button
    THEN the note is no longer stored in the database
    AND I can see a successfully deleted toast message
    */
    // The successfully deleted toast message should be: "Note permanently deleted."

    // Arrange
    render(
      <NoteWrapper>
        <Note id="1" note={mockNote} />
      </NoteWrapper>
    );

    const modalText = /Are you sure you want to permanently delete this note/i;

    await userEvent.click(screen.getByLabelText(/Delete Note/i));

    let modal = screen.getByTestId("Delete Note Modal");
    await waitFor(() => {
      expect(screen.getByText(modalText)).toBeInTheDocument();
    });

    // Act
    await userEvent.click(
      within(modal).getByText("Delete Note", { selector: "button" })
    );
    fireEvent.animationEnd(modal);

    // Assert
    const toastText = /Note permanently deleted./i;
    await waitFor(() => {
      expect(screen.getByText(toastText)).toBeInTheDocument();
    });
  });
});

describe("Note - Update my note", () => {
  it("shows disabled save and cancel button", () => {
    /*
    GIVEN the note is available on the client
    WHEN I read my note
    THEN I can see the disabled save button
    AND I can see the disabled cancel button
    */

    // Arrange
    render(
      <NoteWrapper>
        <Note id="1" note={mockNote} />
      </NoteWrapper>
    );

    // Assert
    const saveButtons = screen.getAllByText("Save Note");
    for (const saveButton of saveButtons) {
      expect(saveButton).toBeInTheDocument();
      expect(saveButton).toBeDisabled();
    }

    const cancelButtons = screen.getAllByText("Cancel");
    for (const cancelButton of cancelButtons) {
      expect(cancelButton).toBeInTheDocument();
      expect(cancelButton).toBeDisabled();
    }
  });

  it("shows enabled save and cancel button on title change", async () => {
    /*
    GIVEN the note is available on the client
    WHEN I change the title of the note
    THEN I can see the save button getting enabled
    AND I can see the cancel button getting enabled
    */

    // Arrange
    render(
      <NoteWrapper>
        <Note id="1" note={mockNote} />
      </NoteWrapper>
    );

    // Act
    const title = screen.getByLabelText("Title");
    await userEvent.type(title, "a");

    // Assert
    const saveButtons = screen.getAllByText("Save Note");
    for (const saveButton of saveButtons) {
      expect(saveButton).toBeEnabled();
    }

    const cancelButtons = screen.getAllByText("Cancel");
    for (const cancelButton of cancelButtons) {
      expect(cancelButton).toBeEnabled();
    }
  });

  it("shows enabled save and cancel button on content change", async () => {
    /*
    GIVEN the note is available on the client
    WHEN I change the content of the note
    THEN I can see the save button getting enabled
    AND I can see the cancel button getting enabled
    */
  });

  it("disables the buttons on cancel after title change", async () => {
    /*
    GIVEN I have modified the title of the note without saving
    WHEN I click on the cancel button
    THEN I can see the save button getting disabled
    AND I can see the cancel button getting disabled
    */

    // Arrange
    render(
      <NoteWrapper>
        <Note id="1" note={mockNote} />
      </NoteWrapper>
    );

    const cancelButtonsForAct = screen.getAllByText("Cancel");
    for (const cancelButtonForAct of cancelButtonsForAct) {
      // Act
      const title = screen.getByLabelText("Title");
      await userEvent.type(title, "a");
      await userEvent.click(cancelButtonForAct);

      // Assert
      const saveButtons = screen.getAllByText("Save Note");
      for (const saveButton of saveButtons) {
        expect(saveButton).toBeDisabled();
      }

      const cancelButtons = screen.getAllByText("Cancel");
      for (const cancelButton of cancelButtons) {
        expect(cancelButton).toBeDisabled();
      }
    }
  });

  it("reverts change in title", async () => {
    /*
    GIVEN I have modified the title of the note without saving
    WHEN I click on the cancel button
    THEN I can see the original title of the note again
    */

    // Arrange
    render(
      <NoteWrapper>
        <Note id="1" note={mockNote} />
      </NoteWrapper>
    );

    const cancelButtonsForAct = screen.getAllByText("Cancel");
    for (const cancelButtonForAct of cancelButtonsForAct) {
      // Act
      const title = screen.getByLabelText("Title");
      const titleOld = title.value;
      await userEvent.type(title, "a");
      expect(title).toHaveValue(`${titleOld}a`);
      await userEvent.click(cancelButtonForAct);

      // Assert
      expect(title).toHaveValue(titleOld);
    }
  });

  it("disables the buttons on cancel after content change", async () => {
    /*
    GIVEN I have modified the content of the note without saving
    WHEN I click on the cancel button
    THEN I can see the save button getting disabled
    AND I can see the cancel button getting disabled
    */

    // Arrange
    render(
      <NoteWrapper>
        <Note id="1" note={mockNote} />
      </NoteWrapper>
    );

    const cancelButtonsForAct = screen.getAllByText("Cancel");
    for (const cancelButtonForAct of cancelButtonsForAct) {
      // Act
      const content = screen.getByLabelText("Content");
      await userEvent.type(content, "a");
      await userEvent.click(cancelButtonForAct);

      // Assert
      const saveButtons = screen.getAllByText("Save Note");
      for (const saveButton of saveButtons) {
        expect(saveButton).toBeDisabled();
      }

      const cancelButtons = screen.getAllByText("Cancel");
      for (const cancelButton of cancelButtons) {
        expect(cancelButton).toBeDisabled();
      }
    }
  });

  it("reverts change in content", async () => {
    /*
    GIVEN I have modified the content of the note without saving
    WHEN I click on the cancel button
    THEN I can see the original content of the note again
    */

    // Arrange
    render(
      <NoteWrapper>
        <Note id="1" note={mockNote} />
      </NoteWrapper>
    );

    const cancelButtonsForAct = screen.getAllByText("Cancel");
    for (const cancelButtonForAct of cancelButtonsForAct) {
      // Act
      const content = screen.getByLabelText("Content");
      const contentOld = content.value;
      await userEvent.type(content, "a");
      expect(content).toHaveValue(`${contentOld}a`);
      await userEvent.click(cancelButtonForAct);

      // Assert
      expect(content).toHaveValue(contentOld);
    }
  });

  it("disables the buttons on save after title change", async () => {
    /*
    GIVEN I have modified the title of the note without saving
    WHEN I click on the save button
    THEN I can see the save button getting disabled
    AND I can see the cancel button getting disabled
    */

    // Arrange
    render(
      <NoteWrapper>
        <Note id="1" note={mockNote} />
      </NoteWrapper>
    );

    const saveButtonsForAct = screen.getAllByText("Save Note");
    for (const saveButtonForAct of saveButtonsForAct) {
      // Act
      const title = screen.getByLabelText("Title");
      await userEvent.type(title, "a");
      await userEvent.click(saveButtonForAct);

      // Assert
      const saveButtons = screen.getAllByText("Save Note");
      for (const saveButton of saveButtons) {
        expect(saveButton).toBeDisabled();
      }

      const cancelButtons = screen.getAllByText("Cancel");
      for (const cancelButton of cancelButtons) {
        expect(cancelButton).toBeDisabled();
      }
    }
  });

  it("saves the new title", async () => {
    /*
    GIVEN I have modified the title of the note without saving
    WHEN I click on the save button
    THEN the new title of the note is stored in the database
    AND I can see a successfully saved toast message
    */
    // The successfully saved toast message should be: "Note saved successfully!"

    // Arrange
    render(
      <NoteWrapper>
        <Note id="1" note={mockNote} />
      </NoteWrapper>
    );

    const saveButtonsForAct = screen.getAllByText("Save Note");
    for (const saveButtonForAct of saveButtonsForAct) {
      // Act
      const title = screen.getByLabelText("Title");
      const titleOld = title.value;

      await userEvent.type(title, "a");
      const titleNew = `${titleOld}a`;
      expect(title).toHaveValue(titleNew);

      await userEvent.click(saveButtonForAct);

      updateNoteAction.mockResolvedValue({
        ...mockNote.data,
        title: titleNew,
      });

      // Assert
      await waitFor(() => {
        expect(updateNoteAction).toHaveBeenCalledWith({
          ...mockNote.data,
          title: titleNew,
        });
      });
      /*const toastText = /Note saved successfully/i;
      await waitFor(() => {
        expect(screen.getByText(toastText)).toBeInTheDocument();
      });*/
    }
  });

  it("saves the new content", async () => {
    /*
    GIVEN I have modified the content of the note without saving
    WHEN I click on the save button
    THEN the new content of the note is stored in the database
    AND I can see a successfully saved toast message
    */
    // The successfully saved toast message should be: "Note saved successfully!"

    // Arrange
    render(
      <NoteWrapper>
        <Note id="1" note={mockNote} />
      </NoteWrapper>
    );

    const saveButtonsForAct = screen.getAllByText("Save Note");
    for (const saveButtonForAct of saveButtonsForAct) {
      // Act
      const content = screen.getByLabelText("Content");
      const contentOld = content.value;

      await userEvent.type(content, "a");
      const contentNew = `${contentOld}a`;
      expect(content).toHaveValue(contentNew);

      await userEvent.click(saveButtonForAct);

      updateNoteAction.mockResolvedValue({
        ...mockNote.data,
        content: contentNew,
      });

      // Assert
      await waitFor(() => {
        expect(updateNoteAction).toHaveBeenCalledWith({
          ...mockNote.data,
          content: contentNew,
        });
      });
      /*const toastText = /Note saved successfully/i;
      await waitFor(() => {
        expect(screen.getByText(toastText)).toBeInTheDocument();
      });*/
    }
  });
});
