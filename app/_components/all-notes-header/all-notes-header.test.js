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
});
