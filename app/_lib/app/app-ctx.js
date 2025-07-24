"use client";

import { createContext, useState } from "react";
import { usePathname } from "next/navigation";
import Toast from "@/app/_components/toast/toast";

export const AppCtx = createContext({
  displayToast: () => {},
});

export default function ApplicationProvider({ children }) {
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
    setAllToasts((prev) => {
      return prev.filter((toast) => {
        return toast.id !== id;
      });
    });
  }

  const applicationValue = { displayToast: displayToast };

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
          link={toast?.link}
          href={toast?.href}
          isError={toast?.isError}
        />
      ))}
    </AppCtx>
  );
}
