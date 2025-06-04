"use client";

import { createContext, useState } from "react";
import { usePathname } from "next/navigation";
import Toast from "@/app/_components/toast/toast";

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
  const [allToasts, setAllToasts] = useState([]);

  function displayToast(toast) {
    toast.id = Math.random().toString(36).substring(2, 10);
    toast.open = true;
    setAllToasts((prev) => [toast, ...prev]);
  }

  function hideToast(id) {
    setAllToasts((prev) => {
      return prev.map((toast) => {
        if (toast.id === id) {
          return { ...toast, open: false };
        }
        return toast;
      });
    });
  }

  function clearToast(id) {
    console.log("clearToast: ", id);
    setAllToasts((prev) => {
      return prev.filter((toast) => {
        return toast.id !== id;
      });
    });
  }

  const applicationValue = { ...pageState, displayToast: displayToast };

  return (
    <AppCtx value={applicationValue}>
      {children}
      {allToasts.map((toast) => (
        <Toast
          key={toast.id}
          open={toast.open}
          onClose={() => hideToast(toast.id)}
          onHidden={() => clearToast(toast.id)}
          message={toast?.message}
        />
      ))}
    </AppCtx>
  );
}
