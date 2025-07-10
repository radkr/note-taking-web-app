"use client";

import styles from "./all-notes-header.module.css";
import { useAppState, NOTES, ARCHIVED } from "@/app/_lib/app/use-app-state";

export default function AllNotesHeader() {
  const { page, isArchived } = useAppState();

  return (
    <div className={styles.header}>
      <h1
        className={`text-preset-1 text-color-neutral-950 ${styles.home} ${
          page === NOTES || page === ARCHIVED ? styles.visible : ""
        }`}
      >
        {page === NOTES && isArchived === false
          ? "All Notes"
          : "Archived notes"}
      </h1>
    </div>
  );
}
