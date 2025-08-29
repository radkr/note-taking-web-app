import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DesktopPageHeader from "./desktop-page-header";
import MyQueryClientProvider from "@/app/_lib/my-query-client/my-query-client";

jest.mock("@/app/_lib/app/use-app-state", () => {
  const originalModule = jest.requireActual("@/app/_lib/app/use-app-state");
  return {
    __esModule: true,
    ...originalModule,
    useAppState: jest.fn(() => ({ page: originalModule.NOTES })),
  };
});

import {
  NOTES,
  ACTIVE,
  ARCHIVED,
  SEARCH,
  useAppState,
  TAGGED,
} from "@/app/_lib/app/use-app-state";

// Mock server actions
jest.mock("@/app/_lib/tags/all-tags-actions", () => ({
  readAllTagsAction: jest.fn(Promise.resolve([])),
  readTagAction: jest.fn(Promise.resolve({})),
}));

import {
  readAllTagsAction,
  readTagAction,
} from "@/app/_lib/tags/all-tags-actions";

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

jest.mock("@/assets/images/icon-settings.svg", () => ({
  __esModule: true,
  default: () => <svg data-testid="logo" />,
}));

const NotesPageWrapper = ({ children }) => {
  return <MyQueryClientProvider>{children}</MyQueryClientProvider>;
};

describe("DesktopPageHeader - Browse my notes", () => {
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
        <DesktopPageHeader />
      </NotesPageWrapper>
    );
    expect(screen.getByText("All Notes")).toBeInTheDocument();
  });
});

describe("DesktopPageHeader - Browse my archived notes", () => {
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
        <DesktopPageHeader />
      </NotesPageWrapper>
    );
    expect(screen.getByText("Archived Notes")).toBeInTheDocument();
  });
});

describe("DesktopPageHeader - Browse my notes with a specific search term", () => {
  it("opens the search notes page for a specific term - on desktop", async () => {
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
        <DesktopPageHeader />
      </NotesPageWrapper>
    );
    const searchField = screen.getByLabelText("Search");
    await userEvent.type(searchField, "myTerm{enter}");
    expect(push).toHaveBeenCalledWith("/notes/search?term=myTerm");
  });

  it("shows the current term in the search field - on desktop", () => {
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
        <DesktopPageHeader />
      </NotesPageWrapper>
    );
    const searchField = screen.getByLabelText("Search");
    expect(searchField).toHaveValue("myTerm");
  });

  it("shows hint about for what specific term showing results currently - on desktop", () => {
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
        <DesktopPageHeader />
      </NotesPageWrapper>
    );
    const title = screen.getByText("Showing results for: myTerm");
    expect(title).toBeInTheDocument();
  });
});

describe("DesktopPageHeader - Browse my notes with a specific tag", () => {
  it("shows the Tagged Notes title", () => {
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
        <DesktopPageHeader />
      </NotesPageWrapper>
    );

    waitFor(() => {
      expect(screen.getByText(/Notes Tagged: myTag/i)).toBeInTheDocument();
    });
  });
});
