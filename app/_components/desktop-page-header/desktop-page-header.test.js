import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DesktopPageHeader from "./desktop-page-header";

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
  useAppState,
} from "@/app/_lib/app/use-app-state";

jest.mock("@/assets/images/icon-settings.svg", () => ({
  __esModule: true,
  default: () => <svg data-testid="logo" />,
}));

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

    render(<DesktopPageHeader />);
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

    render(<DesktopPageHeader />);
    expect(screen.getByText("Archived Notes")).toBeInTheDocument();
  });
});
