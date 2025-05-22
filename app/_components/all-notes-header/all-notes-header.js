"use client";

import { use } from "react";

import styles from "./all-notes-header.module.css";
import { AppCtx, NOTES } from "@/app/_lib/application/app-ctx";

export default function AllNotesHeader() {
  const { activePage } = use(AppCtx);

  return (
    <div className={styles.header}>
      <h1
        className={`text-preset-1 text-color-neutral-950 ${styles.home} ${
          activePage === NOTES ? styles.visible : ""
        }`}
      >
        All Notes
      </h1>
    </div>
  );
}
