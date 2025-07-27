import { usePathname } from "next/navigation";

export const NOTES = "NOTES";
export const NOTE = "NOTE";
export const SETTINGS = "SETTINGS";
export const ACTIVE = "ACTIVE";
export const ARCHIVED = "ARCHIVED";
export const SEARCH = "SEARCH";

export function useAppState() {
  const path = usePathname();

  const pathSegments = path.substring(1, path.length).split("/");
  let page;
  let subPage;
  let noteId;

  if (0 < pathSegments.length) {
    switch (pathSegments[0]) {
      case "notes":
        page = NOTES;
        subPage = ACTIVE;
        if (1 < pathSegments.length) {
          if (pathSegments[1] === "archived") {
            subPage = ARCHIVED;
            if (2 < pathSegments.length) {
              page = NOTE;
              noteId = pathSegments[2];
            }
          } else if (pathSegments[1] === "search") {
            subPage = SEARCH;
            if (2 < pathSegments.length) {
              page = NOTE;
              noteId = pathSegments[2];
            }
          } else {
            page = NOTE;
            noteId = pathSegments[1];
          }
        }
        break;
      case "settings":
        page = SETTINGS;
        break;
    }
  }

  return {
    page,
    subPage,
    noteId,
  };
}
