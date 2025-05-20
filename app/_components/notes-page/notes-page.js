"use client";

import { use } from "react";

import styles from "./notes-page.module.css";
import { Application, HOME, NOTE } from "@/app/_lib/application/application";
import AllNotes from "@/app/_components/all-notes/all-notes";
import AllNotesProvider from "@/app/_lib/notes/all-notes-ctx";
import Note from "@/app/_components/note/note";

export default function NotesPage({}) {
  const { pageState } = use(Application);

  return (
    <div className={styles.page}>
      <AllNotesProvider>
        <aside
          className={`${styles.allNotes} ${
            pageState.activeFragment === HOME ? styles.active : ""
          }`}
        >
          <AllNotes />
        </aside>
        <article
          className={`${styles.note} ${
            pageState.activeFragment === NOTE ? styles.active : ""
          }`}
        >
          <Note />
        </article>
      </AllNotesProvider>
    </div>
  );
}
