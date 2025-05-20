"use client";

import { createContext } from "react";

export const HOME = "HOME";
export const NOTE = "NOTE";

export const Application = createContext({
  activeFragment: "",
});

export default function ApplicationProvider({ children }) {
  const applicationValue = {
    activeFragment: HOME,
  };

  return <Application value={applicationValue}>{children}</Application>;
}
