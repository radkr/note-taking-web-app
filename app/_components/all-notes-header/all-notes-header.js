"use client";

import { use } from "react";

import styles from "./all-notes-header.module.css";
import { Application, NOTES } from "@/app/_lib/application/application";

export default function AllNotesHeader() {
  const { activePage } = use(Application);

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
