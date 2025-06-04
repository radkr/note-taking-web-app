"use client";

import { use } from "react";

import styles from "./notes-page.module.css";
import { AppCtx, NOTES, NOTE } from "@/app/_lib/app/app-ctx";
import AllNotes from "@/app/_components/all-notes/all-notes";
import Note from "@/app/_components/note/note";
import { useReadNote } from "@/app/_lib/notes/hooks/use-read-note";

export default function NotesPage({}) {
  const { activePage } = use(AppCtx);
  const { allNotes, note, noteId } = useReadNote();

  return (
    <div className={styles.page}>
      <aside
        className={`${styles.allNotes} ${
          activePage === NOTES ? styles.active : ""
        }`}
      >
        <AllNotes allNotes={allNotes} id={noteId} />
      </aside>
      <article
        className={`${styles.note} ${activePage === NOTE ? styles.active : ""}`}
      >
        <Note id={noteId} note={note} />
      </article>
    </div>
  );
}
