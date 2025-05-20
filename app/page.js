"use client";

import { use } from "react";

import styles from "./page.module.css";
import { Application, HOME, NOTE } from "./_lib/application/application";
import AllNotes from "@/app/_components/all-notes/all-notes";
import AllNotesProvider from "@/app/_lib/notes/all-notes-ctx";

export default function Home() {
  const application = use(Application);

  return (
    <div className={styles.page}>
      <AllNotesProvider>
        <aside
          className={`${styles.allNotes} ${
            application.activeFragment === HOME ? styles.active : ""
          }`}
        >
          <AllNotes />
        </aside>
        <article
          className={`${styles.note} ${
            application.activeFragment === NOTE ? styles.active : ""
          }`}
        ></article>
      </AllNotesProvider>
    </div>
  );
}
