"use client";

import { use, useCallback, useState } from "react";

import styles from "./notes-page.module.css";
import { AppCtx, NOTES, NOTE } from "@/app/_lib/application/app-ctx";
import AllNotes from "@/app/_components/all-notes/all-notes";
import AllNotesProvider from "@/app/_lib/notes/all-notes-ctx";
import Note from "@/app/_components/note/note";

export default function NotesPage({}) {
  const { activePage, noteId } = use(AppCtx);
  const [firstNoteId, setFirstNoteId] = useState();
  const id = noteId || firstNoteId;

  console.log("Id in NotesPage: ", firstNoteId);

  const handleIdChange = useCallback((id) => setFirstNoteId(id), []);

  return (
    <div className={styles.page}>
      <AllNotesProvider>
        <aside
          className={`${styles.allNotes} ${
            activePage === NOTES ? styles.active : ""
          }`}
        >
          <AllNotes onIdChange={handleIdChange} />
        </aside>
        <article
          className={`${styles.note} ${
            activePage === NOTE ? styles.active : ""
          }`}
        >
          <Note id={id} />
        </article>
      </AllNotesProvider>
    </div>
  );
}
