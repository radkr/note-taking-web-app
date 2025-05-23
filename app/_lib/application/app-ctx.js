"use client";

import { createContext } from "react";
import { usePathname } from "next/navigation";
import Toast from "@/app/_components/toast/toast";

export const NOTES = "HOME";
export const NOTE = "NOTE";

function getPageState(path) {
  const pathSegments = path.substring(1, path.length).split("/");
  let activePage;
  let noteId;

  if (pathSegments.length == 1 && pathSegments[0] === "notes") {
    activePage = NOTES;
  }

  if (0 < pathSegments.length) {
    switch (pathSegments[0]) {
      case "notes":
        activePage = NOTES;
        if (pathSegments.length == 1) {
          break;
        } else {
          switch (pathSegments[1]) {
            default:
              activePage = NOTE;
              noteId = pathSegments[1];
          }
        }
    }
  }

  return {
    activePage,
    noteId,
  };
}

export const AppCtx = createContext({
  activePage: "",
  noteId: "",
});

export default function ApplicationProvider({ children }) {
  const pageState = getPageState(usePathname());

  const applicationValue = { ...pageState };

  return (
    <AppCtx value={applicationValue}>
      {children}
      <Toast
        onClose={() => {}}
        message="Note restored to active notes."
        link="All Notes"
        href="#"
      />
    </AppCtx>
  );
}
