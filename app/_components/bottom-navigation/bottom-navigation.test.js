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
  NOTE,
  NOTES,
  SETTINGS,
  useAppState,
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
      noteId: "123",
    });

    render(<BottomNavigation />);
    const homeButton = screen.getByText("Home").closest("a");
    expect(homeButton).toHaveAttribute("href", "/notes");
  });

  it("shows the home button selected", () => {
    useAppState.mockReturnValue({
      page: NOTES,
      isArchived: false,
    });

    render(<BottomNavigation />);
    const homeButton = screen.getByText("Home").closest("a");
    expect(homeButton).toHaveClass("selected");
    const archivedButton = screen.getByText("Archived").closest("a");
    expect(archivedButton).not.toHaveClass("selected");
  });

  it("shows the archived button selected", () => {
    useAppState.mockReturnValue({
      page: NOTES,
      isArchived: true,
    });

    render(<BottomNavigation />);
    const homeButton = screen.getByText("Home").closest("a");
    expect(homeButton).not.toHaveClass("selected");
    const archivedButton = screen.getByText("Archived").closest("a");
    expect(archivedButton).toHaveClass("selected");
  });

  it("does not show the home button selected", () => {
    useAppState.mockReturnValue({
      page: NOTE,
      noteId: "123",
    });

    render(<BottomNavigation />);
    const homeButton = screen.getByText("Home").closest("a");
    expect(homeButton).not.toHaveClass("selected");
  });
});
