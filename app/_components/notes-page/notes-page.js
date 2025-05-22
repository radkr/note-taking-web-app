"use client";

import { use } from "react";

import styles from "./notes-page.module.css";
import { AppCtx, NOTES, NOTE } from "@/app/_lib/application/app-ctx";
import AllNotes from "@/app/_components/all-notes/all-notes";
import AllNotesProvider from "@/app/_lib/notes/all-notes-ctx";
import Note from "@/app/_components/note/note";

export default function NotesPage({}) {
  const { activePage } = use(AppCtx);

  return (
    <div className={styles.page}>
      <AllNotesProvider>
        <aside
          className={`${styles.allNotes} ${
            activePage === NOTES ? styles.active : ""
          }`}
        >
          <AllNotes />
        </aside>
        <article
          className={`${styles.note} ${
            activePage === NOTE ? styles.active : ""
          }`}
        >
          <Note />
        </article>
      </AllNotesProvider>
    </div>
  );
}
