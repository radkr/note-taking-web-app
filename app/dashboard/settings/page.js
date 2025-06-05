"use client";

import styles from "./page.module.css";
import AllSettings from "@/app/_components/all-settings/all-settings";
import { useAppState, NOTE, SETTINGS } from "@/app/_lib/app/use-app-state";

export default function SettingsPage() {
  const { page } = useAppState();

  return (
    <div className={styles.page}>
      <aside
        className={`${styles.allNotes} ${
          page === SETTINGS ? styles.active : ""
        }`}
      >
        <AllSettings />
      </aside>
      <article
        className={`${styles.note} ${page === NOTE ? styles.active : ""}`}
      ></article>
    </div>
  );
}
