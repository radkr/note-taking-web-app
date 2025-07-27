import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AllNotesHeader from "./all-notes-header";

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

    render(<AllNotesHeader />);
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

    render(<AllNotesHeader />);
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

    render(<AllNotesHeader />);
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

    render(<AllNotesHeader />);
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
    render(<AllNotesHeader />);
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
    render(<AllNotesHeader />);
    const hint = screen.getByText(
      "All notes matching ”myTerm” are displayed below."
    );
    expect(hint).toBeInTheDocument();
  });
});
