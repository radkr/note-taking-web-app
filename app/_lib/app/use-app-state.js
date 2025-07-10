import { usePathname } from "next/navigation";

export const NOTES = "NOTES";
export const NOTE = "NOTE";
export const SETTINGS = "SETTINGS";

export function useAppState() {
  const path = usePathname();

  const pathSegments = path.substring(1, path.length).split("/");
  let page;
  let isArchived;
  let noteId;

  if (0 < pathSegments.length) {
    switch (pathSegments[0]) {
      case "notes":
        page = NOTES;
        isArchived = false;
        if (1 < pathSegments.length) {
          if (pathSegments[1] === "archived") {
            isArchived = true;
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
    isArchived,
    noteId,
  };
}
