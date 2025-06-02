"use client";

import { createContext, useState } from "react";
import { usePathname } from "next/navigation";
import Toast from "@/app/_components/toast/toast";
import Settings from "@/app/dashboard/settings/page";

export const NOTES = "HOME";
export const NOTE = "NOTE";
export const SETTINGS = "SETTINGS";

function getPageState(path) {
  const pathSegments = path.substring(1, path.length).split("/");
  let activePage;
  let noteId;

  if (0 < pathSegments.length) {
    switch (pathSegments[0]) {
      case "notes":
        activePage = NOTES;
        if (1 < pathSegments.length) {
          activePage = NOTE;
          noteId = pathSegments[1];
        }
        break;
      case "settings":
        activePage = SETTINGS;
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
  displayToast: () => {},
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
