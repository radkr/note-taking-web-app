import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Note from "./note";
import { deleteNoteAction } from "@/app/_lib/notes/all-notes-actions";
import MyQueryClientProvider from "@/app/_lib/my-query-client/my-query-client";

jest.mock("@/app/_lib/notes/all-notes-actions.js", () => ({
  deleteNoteAction: jest.fn(),
  updateNoteAction: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
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
      <div id="modal-root" />
      <ul id="toasts-root" />
      {children}
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
