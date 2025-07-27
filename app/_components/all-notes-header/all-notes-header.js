"use client";

import styles from "./all-notes-header.module.css";
import {
  useAppState,
  NOTES,
  ARCHIVED,
  ACTIVE,
  SEARCH,
} from "@/app/_lib/app/use-app-state";

export default function AllNotesHeader() {
  const { page, subPage } = useAppState();

  return (
    <div className={styles.header}>
      <h1
        className={`text-preset-1 text-color-neutral-950 ${styles.home} ${
          page === NOTES ? styles.visible : ""
        }`}
      >
        {page === NOTES && subPage === ACTIVE ? "All Notes" : null}
        {page === NOTES && subPage === ARCHIVED ? "Archived Notes" : null}
        {page === NOTES && subPage === SEARCH ? "Search" : null}
      </h1>
    </div>
  );
}
