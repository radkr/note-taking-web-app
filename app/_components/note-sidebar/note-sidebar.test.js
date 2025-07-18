import "@testing-library/jest-dom";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import NoteSiderbar from "./note-sidebar";

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

describe("NoteSidebar - Archive one of my notes", () => {
  it("shows the archive note button", async () => {
    /*
    GIVEN I am on the page of a specific note
    AND the note is not archived yet
    WHEN I read my note
    THEN I can see the archive note button
    */

    const onArchive = jest.fn();
    render(<NoteSiderbar isArchived={false} onArchive={onArchive} />);
    //
    expect(screen.queryByText("Restore Note")).not.toBeInTheDocument();
    //
    const button = screen.getByText("Archive Note");
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    expect(onArchive).toHaveBeenCalledTimes(1);
  });
});

describe("NoteSidebar - Restore one of my archived notes", () => {
  it("shows the restore note button", async () => {
    /*
    GIVEN I am on the page of a specific note
    AND the note is not archived yet
    WHEN I read my note
    THEN I can see the archive note button
    */

    const onRestore = jest.fn();
    render(<NoteSiderbar isArchived={true} onRestore={onRestore} />);
    //
    expect(screen.queryByText("Archive Note")).not.toBeInTheDocument();
    //
    const button = screen.getByText("Restore Note");
    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    expect(onRestore).toHaveBeenCalledTimes(1);
  });
});
