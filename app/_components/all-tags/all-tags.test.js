import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AllTags from "./all-tags";

describe("AllTags - Browse my tags", () => {
  it("shows the Tags title", () => {
    /*
    GIVEN I opened the tags page
    WHEN I look at the page
    THEN I can see the "Tags" title
    */

    render(<AllTags />);
    expect(screen.getAllByText("Tags")).toHaveLength(2);
  });
});
