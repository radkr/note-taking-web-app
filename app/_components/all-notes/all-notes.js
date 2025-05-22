"use client";

import { use } from "react";

import styles from "./all-notes.module.css";
import AllNotesHeader from "@/app/_components/all-notes-header/all-notes-header";
import NoteItem from "@/app/_components/note-item/note-item";
import { AllNotesCtx } from "@/app/_lib/notes/all-notes-ctx";

export default function AllNotes() {
  const { notes, isLoading: notesPending } = use(AllNotesCtx);

  return (
    <div className={styles.allNotes}>
      <AllNotesHeader />
      {notesPending ? (
        <p>Loading...</p>
      ) : (
        <ul className={styles.noteList}>
          {notes.map((note, index) => {
            return <NoteItem key={note._id} note={note} />;
          })}
        </ul>
      )}
    </div>
  );
}
