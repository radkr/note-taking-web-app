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

import { NOTES, useAppState } from "@/app/_lib/app/use-app-state";

describe("AllNotesHeader - Browse my notes", () => {
  it("shows the All Notes title", () => {
    /*
    GIVEN I opened the archived notes page
    WHEN I look at the page
    THEN I can see the "Archived Notes" title
    */

    useAppState.mockReturnValue({
      page: NOTES,
      isArchived: false,
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
      isArchived: true,
    });

    render(<AllNotesHeader />);
    expect(screen.getByText("Archived Notes")).toBeInTheDocument();
  });
});
