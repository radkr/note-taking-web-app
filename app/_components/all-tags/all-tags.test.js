import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import AllTags from "./all-tags";

// Mock server actions
jest.mock("@/app/_lib/tags/all-tags-actions", () => ({
  readAllTagsAction: jest.fn(),
}));

import { readAllTagsAction } from "@/app/_lib/tags/all-tags-actions";

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

// Mock IconTag svg import
jest.mock("@/assets/images/icon-tag.svg", () => ({
  __esModule: true,
  default: () => <svg data-testid="mock-icon-tag" />,
}));

const tags = [
  {
    _id: "1",
    name: "tag1",
  },
  {
    _id: "2",
    name: "tag2",
  },
];

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

  it("shows my tags", async () => {
    /*
    GIVEN I have created some tags already
    AND the list of my tags is available on the client
    WHEN I browse the list of my tags
    THEN I can see all my tags in the list
    */

    readAllTagsAction.mockResolvedValueOnce(tags);
    useAppState.mockReturnValueOnce({ page: TAGS });
    render(
      <MyQueryClientProvider>
        <AllTags />
      </MyQueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("tag1")).toBeInTheDocument();
      expect(screen.getByText("tag2")).toBeInTheDocument();
    });
  });
});
