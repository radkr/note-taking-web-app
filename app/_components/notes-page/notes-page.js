"use client";

import styles from "./notes-page.module.css";
import AllNotes from "@/app/_components/all-notes/all-notes";
import Note from "@/app/_components/note/note";
import { useReadNote } from "@/app/_lib/notes/hooks/use-read-note";
import { useAppState, NOTES, NOTE } from "@/app/_lib/app/use-app-state";

export default function NotesPage({}) {
  const { page, isArchived } = useAppState();
  const { allNotes, note, noteId } = useReadNote();

  return (
    <div className={styles.page}>
      <aside
        className={`${styles.allNotes} ${page === NOTES ? styles.active : ""}`}
      >
        <AllNotes allNotes={allNotes} isArchived={isArchived} id={noteId} />
      </aside>
      <article
        className={`${styles.note} ${page === NOTE ? styles.active : ""}`}
      >
        <Note id={noteId} note={note} />
      </article>
    </div>
  );
}
