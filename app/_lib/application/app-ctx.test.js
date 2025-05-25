import { use } from "react";
import "@testing-library/jest-dom";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import ApplicationProvider, {
  AppCtx,
  NOTE,
  NOTES,
} from "@/app/_lib/application/app-ctx";
import { usePathname } from "next/navigation";

jest.mock("next/navigation");

beforeAll(() => {
  HTMLDialogElement.prototype.show = jest.fn();
  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
});

const wrapper = ({ children }) => (
  <>
    <div id="modal-root" />
    <ApplicationProvider>{children}</ApplicationProvider>
  </>
);

describe("AppCtx", () => {
  it("sets activePage to NOTES", async () => {
    usePathname.mockReturnValue("/notes");
    const app = renderHook(() => use(AppCtx), { wrapper });

    expect(app.result.current.activePage).toBe(NOTES);
  });

  it("sets activePage to NOTE with proper noteId", async () => {
    usePathname.mockReturnValue("/notes/abc");
    const app = renderHook(() => use(AppCtx), { wrapper });

    expect(app.result.current.activePage).toBe(NOTE);
    expect(app.result.current.noteId).toBe("abc");
  });
});
