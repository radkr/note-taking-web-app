"use client";

import { use } from "react";

import styles from "./settings-page.module.css";
import { AppCtx, NOTES, NOTE, SETTINGS } from "@/app/_lib/app/app-ctx";
import AllSettings from "@/app/_components/all-settings/all-settings";

export default function SettingsPage() {
  const { activePage } = use(AppCtx);

  return (
    <div className={styles.page}>
      <aside
        className={`${styles.allNotes} ${
          activePage === SETTINGS ? styles.active : ""
        }`}
      >
        <AllSettings />
      </aside>
      <article
        className={`${styles.note} ${activePage === NOTE ? styles.active : ""}`}
      ></article>
    </div>
  );
}
