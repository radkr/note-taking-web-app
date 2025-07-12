import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DesktopNavigation from "./desktop-navigation";
import { NOTE, NOTES } from "@/app/_lib/app/use-app-state";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

jest.mock("@/app/_lib/app/use-app-state", () => {
  const originalModule = jest.requireActual("@/app/_lib/app/use-app-state");
  return {
    __esModule: true,
    ...originalModule,
    useAppState: jest.fn(() => ({ page: originalModule.NOTES })),
  };
});

jest.mock("@/assets/images/logo.svg", () => ({
  __esModule: true,
  default: () => <svg data-testid="logo" />,
}));

jest.mock("@/assets/images/icon-home.svg", () => ({
  __esModule: true,
  default: () => <svg data-testid="icon-home" />,
}));

describe("DesktopNavigation - Read my note", () => {
  it("opens my note list", async () => {
    /*
    GIVEN I have created some notes already
    AND I opened the page of a specific note
    WHEN I click on the home button
    THEN I get to the notes page
    */

    render(<DesktopNavigation />);
    const homeButton = screen.getByText(/All Notes/i).closest("button");
    await userEvent.click(homeButton);
    expect(pushMock).toHaveBeenCalledWith("/notes");
  });
});

describe("DesktopNavigation - Browse my archived notes", () => {
  it("opens my archived note list", async () => {
    /*
    GIVEN I opened the notes page
    WHEN I click on the archived notes button
    THEN I get to the archived notes page
    */

    render(<DesktopNavigation />);
    const archivedButton = screen
      .getByText(/Archived Notes/i)
      .closest("button");
    await userEvent.click(archivedButton);
    expect(pushMock).toHaveBeenCalledWith("/notes/archived");
  });
  it("opens my note list", async () => {
    /*
    GIVEN I opened the archived notes page
    WHEN I click on the home button
    THEN I get to the notes page
    */

    render(<DesktopNavigation />);
    const homeButton = screen.getByText(/All Notes/i).closest("button");
    await userEvent.click(homeButton);
    expect(pushMock).toHaveBeenCalledWith("/notes");
  });
});
