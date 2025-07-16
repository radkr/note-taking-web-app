import "@testing-library/jest-dom";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NoteHeader from "./note-header";

// Mock IconDelete svg import
jest.mock("@/assets/images/icon-delete.svg", () => ({
  __esModule: true,
  default: () => <svg data-testid="mock-delete-icon" />,
}));

// Mock IconArchive svg import
jest.mock("@/assets/images/icon-archive.svg", () => ({
  __esModule: true,
  default: () => <svg data-testid="mock-archive-icon" />,
}));

// Mock IconLeft svg import
jest.mock("@/assets/images/icon-arrow-left.svg", () => ({
  __esModule: true,
  default: () => <svg data-testid="mock-arrow-left-icon" />,
}));

// Mock usePathName
jest.mock("next/navigation", () => {
  const originalModule = jest.requireActual("next/navigation");
  return {
    __esModule: true,
    ...originalModule,
    usePathname: jest.fn(() => "/notes/123"),
  };
});

describe("NoteHeader - Archive one of my notes", () => {
  it("shows the archive note button", () => {
    /*
    GIVEN I am on the page of a specific note
    AND the note is not archived yet
    WHEN I read my note
    THEN I can see the archive note button
    */

    render(<NoteHeader />);
    expect(screen.getByLabelText("Archive Note")).toBeInTheDocument();
  });
});
