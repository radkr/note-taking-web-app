"use client";

import { use } from "react";

import styles from "./notes-page.module.css";
import { Application, NOTES, NOTE } from "@/app/_lib/application/application";
import AllNotes from "@/app/_components/all-notes/all-notes";
import AllNotesProvider from "@/app/_lib/notes/all-notes-ctx";
import Note from "@/app/_components/note/note";
import NoteProvider from "@/app/_lib/notes/note-ctx";

export default function NotesPage({}) {
  const { activePage } = use(Application);

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
          <NoteProvider>
            <Note />
          </NoteProvider>
        </article>
      </AllNotesProvider>
    </div>
  );
}
