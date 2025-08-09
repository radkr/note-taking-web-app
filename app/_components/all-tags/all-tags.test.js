import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AllTags from "./all-tags";

// Mock the useAppState hook
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
  useAppState,
  NOTES,
  NOTE,
  ACTIVE,
  ARCHIVED,
  SEARCH,
  TAGS,
} from "@/app/_lib/app/use-app-state";

// Import your QueryClientProvider wrapper
import MyQueryClientProvider from "@/app/_lib/my-query-client/my-query-client";

describe("AllTags - Browse my tags", () => {
  it("shows the Tags title", () => {
    /*
    GIVEN I opened the tags page
    WHEN I look at the page
    THEN I can see the "Tags" title
    */
    useAppState.mockReturnValueOnce({ page: TAGS });

    render(
      <MyQueryClientProvider>
        <AllTags />
      </MyQueryClientProvider>
    );
    expect(screen.getAllByText("Tags")).toHaveLength(2);
  });

  it("indicates that the list of my tags is loading", () => {
    /*
    GIVEN the list of my tags is not yet available on the client
    WHEN I browse the list of my tags
    THEN I can see a loading message
    */
    // The loading message should be: "Loading..."
    useAppState.mockReturnValueOnce({ page: TAGS });
    render(
      <MyQueryClientProvider>
        <AllTags />
      </MyQueryClientProvider>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
