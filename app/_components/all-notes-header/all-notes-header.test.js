import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AllNotesHeader from "./all-notes-header";
import MyQueryClientProvider from "@/app/_lib/my-query-client/my-query-client";

// Mock server actions
jest.mock("@/app/_lib/tags/all-tags-actions", () => ({
  readAllTagsAction: jest.fn(Promise.resolve([])),
  readTagAction: jest.fn(Promise.resolve({})),
}));

import {
  readAllTagsAction,
  readTagAction,
} from "@/app/_lib/tags/all-tags-actions";

jest.mock("@/app/_lib/app/use-app-state", () => {
  const originalModule = jest.requireActual("@/app/_lib/app/use-app-state");
  return {
    __esModule: true,
    ...originalModule,
    useAppState: jest.fn(() => ({ page: originalModule.NOTES })),
  };
});

import {
  ACTIVE,
  ARCHIVED,
  NOTES,
  SEARCH,
  TAGGED,
  useAppState,
} from "@/app/_lib/app/use-app-state";

const push = jest.fn();

jest.mock("next/navigation", () => {
  const originalModule = jest.requireActual("next/navigation");
  return {
    __esModule: true,
    ...originalModule,
    useRouter: () => {
      return {
        push,
      };
    },
  };
});

// Mock IconPlus svg import
jest.mock("@/assets/images/icon-search.svg", () => ({
  __esModule: true,
  default: () => <svg data-testid="mock-icon-search" />,
}));

const NotesPageWrapper = ({ children }) => {
  return <MyQueryClientProvider>{children}</MyQueryClientProvider>;
};

describe("AllNotesHeader - Browse my notes", () => {
  it("shows the All Notes title", () => {
    /*
    GIVEN I opened the archived notes page
    WHEN I look at the page
    THEN I can see the "Archived Notes" title
    */

    useAppState.mockReturnValue({
      page: NOTES,
      subPage: ACTIVE,
    });

    render(
      <NotesPageWrapper>
        <AllNotesHeader />
      </NotesPageWrapper>
    );
    expect(screen.getByText("All Notes")).toBeInTheDocument();
  });
});

describe("AllNotesHeader - Browse my archived notes", () => {
  it("shows the Archived Notes title", () => {
    /*
    GIVEN I opened the archived notes page
    WHEN I look at the page
    THEN I can see the "Archived Notes" title
    */

    useAppState.mockReturnValue({
      page: NOTES,
      subPage: ARCHIVED,
    });

    render(
      <NotesPageWrapper>
        <AllNotesHeader />
      </NotesPageWrapper>
    );
    expect(screen.getByText("Archived Notes")).toBeInTheDocument();
  });
});

describe("AllNotesHeader - Browse my notes with a specific search term", () => {
  it("shows the Search Notes title", () => {
    /*
    GIVEN I opened the serach notes page
    WHEN I look at the page
    THEN I can see the "Search" title
    */

    useAppState.mockReturnValue({
      page: NOTES,
      subPage: SEARCH,
    });

    render(
      <NotesPageWrapper>
        <AllNotesHeader />
      </NotesPageWrapper>
    );
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("opens the search notes page for a specific term - on portable", async () => {
    /*
    GIVEN I opened the search notes page
    WHEN I type a specific search term into the search field
    AND I hit enter
    THEN I get to the search notes page for that specific term
    */

    useAppState.mockReturnValue({
      page: NOTES,
      subPage: SEARCH,
    });

    render(
      <NotesPageWrapper>
        <AllNotesHeader />
      </NotesPageWrapper>
    );
    const searchField = screen.getByLabelText("Search");
    await userEvent.type(searchField, "myTerm{enter}");
    expect(push).toHaveBeenCalledWith("/notes/search?term=myTerm");
  });

  it("shows the current term in the search field - on portable", () => {
    /*
    GIVEN I opened the search notes page for a specific term
    WHEN I look at the search field
    THEN I can see that specific term typed in
    */

    useAppState.mockReturnValue({
      page: NOTES,
      subPage: SEARCH,
      term: "myTerm",
    });
    render(
      <NotesPageWrapper>
        <AllNotesHeader />
      </NotesPageWrapper>
    );
    const searchField = screen.getByLabelText("Search");
    expect(searchField).toHaveValue("myTerm");
  });

  it("shows hint about for what specific term showing results currently - on portable", () => {
    /*
    GIVEN I opened the search notes page for a specific term
    WHEN I look at the page
    THEN I can see a hint about for what specific term showing results currently
    */

    useAppState.mockReturnValue({
      page: NOTES,
      subPage: SEARCH,
      term: "myTerm",
    });
    render(
      <NotesPageWrapper>
        <AllNotesHeader />
      </NotesPageWrapper>
    );
    const hint = screen.getByText(
      "All notes matching ”myTerm” are displayed below."
    );
    expect(hint).toBeInTheDocument();
  });
});

describe("AllNotesHeader - Browse my notes with a specific tag", () => {
  it("shows the Search Notes title", () => {
    /*
    GIVEN I opened the tagged notes page for a specific tag
    WHEN I look at the page
    THEN I can see the "Notes Tagged:..." title for that spacific tag
    */

    readTagAction.mockResolvedValue({ _id: "2", name: "myTag" });
    useAppState.mockReturnValue({
      page: NOTES,
      subPage: TAGGED,
      tag: "1",
    });

    render(
      <NotesPageWrapper>
        <AllNotesHeader />
      </NotesPageWrapper>
    );

    waitFor(() => {
      expect(screen.getByText(/Notes Tagged: myTag/i)).toBeInTheDocument();
    });
  });
  it("shows hint about for what specific tag showing results currently - on portable", () => {
    /*
    GIVEN I opened the tagged notes page for a specific tag
    WHEN I look at the page
    THEN I can see a hint about for what specific tag showing results currently
    */

    readTagAction.mockResolvedValue({ _id: "2", name: "myTag" });
    useAppState.mockReturnValue({
      page: NOTES,
      subPage: TAGGED,
      tag: "1",
    });

    render(
      <NotesPageWrapper>
        <AllNotesHeader />
      </NotesPageWrapper>
    );

    waitFor(() => {
      expect(
        screen.getByText(/All notes with the ”myTag” tag are shown here./i)
      ).toBeInTheDocument();
    });
  });
});
