"use client";

import styles from "./all-notes.module.css";
import AllNotesHeader from "@/app/_components/all-notes-header/all-notes-header";
import NoteItem from "@/app/_components/note-item/note-item";

export default function AllNotes({ allNotes }) {
  const { data, isLoading } = allNotes;

  let content;

  if (isLoading) {
    content = (
      <div className={styles.alternative}>
        <p className="text-preset-5 text-color-neutral-800">Loading...</p>
      </div>
    );
  }

  if (data) {
    content =
      data.length == 0 ? (
        <div className={styles.emptyList}>
          <p className="text-preset-5 text-color-neutral-950">
            You don’t have any notes yet. Start a new note to capture your
            thoughts and ideas.
          </p>
        </div>
      ) : (
        <ul className={styles.noteList}>
          {data.map((note, index) => {
            return <NoteItem key={note._id} note={note} />;
          })}
        </ul>
      );
  }

  return (
    <div className={styles.allNotes}>
      <AllNotesHeader />
      {content}
    </div>
  );
}
