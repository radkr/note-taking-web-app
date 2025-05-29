"use client";

import { createContext, useState } from "react";
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
    displayToast: () => {},
  };
}

export const AppCtx = createContext({
  activePage: "",
  noteId: "",
});

export default function ApplicationProvider({ children }) {
  const pageState = getPageState(usePathname());
  const [toast, setToast] = useState();

  function displayToast(toast) {
    setToast(toast);
  }

  const applicationValue = { ...pageState, displayToast: displayToast };

  return (
    <AppCtx value={applicationValue}>
      {children}
      <Toast
        open={toast}
        onClose={() => {
          setToast(undefined);
        }}
        message={toast?.message}
      />
    </AppCtx>
  );
}
