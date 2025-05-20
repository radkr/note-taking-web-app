"use client";

import { createContext } from "react";
import { usePathname } from "next/navigation";

export const HOME = "HOME";
export const NOTE = "NOTE";

function getPageState(path) {
  const pathSegments = path.substring(1, path.length).split("/");
  let activeFragment;
  let noteId;

  if (pathSegments.length == 1 && pathSegments[0] === "notes") {
    activeFragment = HOME;
  }

  if (0 < pathSegments.length) {
    switch (pathSegments[0]) {
      case "notes":
        activeFragment = HOME;
        if (pathSegments.length == 1) {
          break;
        } else {
          switch (pathSegments[1]) {
            default:
              activeFragment = NOTE;
              noteId = pathSegments[1];
          }
        }
    }
  }

  return {
    activeFragment,
    noteId,
  };
}

export const Application = createContext({
  pageState: {
    activeFragment: "",
    noteId: "",
  },
});

export default function ApplicationProvider({ children }) {
  const pageState = getPageState(usePathname());

  const applicationValue = {
    pageState: pageState,
  };

  return <Application value={applicationValue}>{children}</Application>;
}
