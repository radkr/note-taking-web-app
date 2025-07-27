import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BottomNavigation from "./bottom-navigation";

// Mock useAppState
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
  ARCHIVED,
  ACTIVE,
  NOTE,
  NOTES,
  useAppState,
  SEARCH,
} from "@/app/_lib/app/use-app-state";

// Mock IconSettings and IconHome components

jest.mock("@/assets/images/icon-home.svg", () => ({
  __esModule: true,
  default: () => <svg data-testid="icon-home" />,
}));

jest.mock("@/assets/images/icon-settings.svg", () => ({
  __esModule: true,
  default: () => <svg data-testid="icon-settings" />,
}));

describe("BottomNavigation - Read my note", () => {
  it("opens my note list", async () => {
    /*
    GIVEN I have created some notes already
    AND I opened the page of a specific note
    WHEN I click on the home button
    THEN I get to the notes page
    */

    useAppState.mockReturnValue({
      page: NOTE,
      subPage: ACTIVE,
      noteId: "123",
    });

    render(<BottomNavigation />);
    const homeButton = screen.getByText("Home").closest("a");
    expect(homeButton).toHaveAttribute("href", "/notes");
  });

  it("shows the home button selected", () => {
    useAppState.mockReturnValue({
      page: NOTES,
      subPage: ACTIVE,
    });

    render(<BottomNavigation />);
    const homeButton = screen.getByText("Home").closest("a");
    expect(homeButton).toHaveClass("selected");
    const archivedButton = screen.getByText("Archived").closest("a");
    expect(archivedButton).not.toHaveClass("selected");
  });

  it("does not show the home button selected", () => {
    useAppState.mockReturnValue({
      page: NOTE,
      subPage: ACTIVE,
      noteId: "123",
    });

    render(<BottomNavigation />);
    const homeButton = screen.getByText("Home").closest("a");
    expect(homeButton).not.toHaveClass("selected");
  });
});

describe("BottomNavigation - Browse my archived notes", () => {
  it("opens my archived note list", () => {
    /*
    GIVEN I opened the notes page
    WHEN I click on the archived notes button
    THEN I get to the archived notes page
    */

    useAppState.mockReturnValue({
      page: NOTES,
      subPage: ARCHIVED,
    });

    render(<BottomNavigation />);
    const archivedButton = screen.getByText("Archived").closest("a");
    expect(archivedButton).toHaveAttribute("href", "/notes/archived");
  });
  it("opens my note list", () => {
    /*
    GIVEN I opened the archived notes page
    WHEN I click on the home button
    THEN I get to the notes page
    */

    useAppState.mockReturnValue({
      page: NOTES,
      subPage: ARCHIVED,
    });

    render(<BottomNavigation />);
    const homeButton = screen.getByText("Home").closest("a");
    expect(homeButton).toHaveAttribute("href", "/notes");
  });
  it("opens my search note list", () => {
    /*
    GIVEN I opened the archived notes page
    WHEN I click on the search button
    THEN I get to the search notes page
    */

    useAppState.mockReturnValue({
      page: NOTES,
      subPage: ARCHIVED,
    });

    render(<BottomNavigation />);
    const homeButton = screen.getByText("Search").closest("a");
    expect(homeButton).toHaveAttribute("href", "/notes/search");
  });

  it("shows the archived button selected", () => {
    useAppState.mockReturnValue({
      page: NOTES,
      subPage: ARCHIVED,
    });

    render(<BottomNavigation />);
    const homeButton = screen.getByText("Home").closest("a");
    expect(homeButton).not.toHaveClass("selected");
    const archivedButton = screen.getByText("Archived").closest("a");
    expect(archivedButton).toHaveClass("selected");
  });
});

describe("BottomNavigation - Browse my notes with a specific search term", () => {
  it("navigates to the search page from the notes page - on portable", () => {
    /*
    GIVEN I opened the notes page
    WHEN I click on the search notes button
    THEN I get to the archived notes page
    */

    useAppState.mockReturnValue({
      page: NOTES,
      subPage: ACTIVE,
    });

    render(<BottomNavigation />);
    const searchButton = screen.getByText("Search").closest("a");
    expect(searchButton).toHaveAttribute("href", "/notes/search");
  });

  it("navigates to the search page from the archived notes page - on portable", () => {
    /*
    GIVEN I opened the notes page
    WHEN I click on the search notes button
    THEN I get to the archived notes page
    */

    useAppState.mockReturnValue({
      page: NOTES,
      subPage: ARCHIVED,
    });

    render(<BottomNavigation />);
    const searchButton = screen.getByText("Search").closest("a");
    expect(searchButton).toHaveAttribute("href", "/notes/search");
  });
  it("opens my archived note list", () => {
    /*
    GIVEN I opened the notes page
    WHEN I click on the archived notes button
    THEN I get to the archived notes page
    */

    useAppState.mockReturnValue({
      page: NOTES,
      subPage: SEARCH,
    });

    render(<BottomNavigation />);
    const archivedButton = screen.getByText("Archived").closest("a");
    expect(archivedButton).toHaveAttribute("href", "/notes/archived");
  });
  it("opens my note list", () => {
    /*
    GIVEN I opened the archived notes page
    WHEN I click on the home button
    THEN I get to the notes page
    */

    useAppState.mockReturnValue({
      page: NOTES,
      subPage: SEARCH,
    });

    render(<BottomNavigation />);
    const homeButton = screen.getByText("Home").closest("a");
    expect(homeButton).toHaveAttribute("href", "/notes");
  });

  it("shows the search button selected", () => {
    useAppState.mockReturnValue({
      page: NOTES,
      subPage: SEARCH,
    });

    render(<BottomNavigation />);
    const homeButton = screen.getByText("Home").closest("a");
    expect(homeButton).not.toHaveClass("selected");
    const searchButton = screen.getByText("Search").closest("a");
    expect(searchButton).toHaveClass("selected");
    const archivedButton = screen.getByText("Archived").closest("a");
    expect(archivedButton).not.toHaveClass("selected");
  });

  it("does not show the search button selected", () => {
    useAppState.mockReturnValue({
      page: NOTE,
      subPage: ACTIVE,
      noteId: "123",
    });

    render(<BottomNavigation />);
    const searchButton = screen.getByText("Search").closest("a");
    expect(searchButton).not.toHaveClass("selected");
  });
});
