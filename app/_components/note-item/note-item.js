import Link from "next/link";
import { use } from "react";

import styles from "./note-item.module.css";
import { AllNotesCtx } from "@/app/_lib/notes/all-notes-ctx";

export default function NoteItem({ note }) {
  const { note: selectedNote } = use(AllNotesCtx);
  const isSelected = note._id == selectedNote?._id;

  return (
    <li className={`${styles.note} ${isSelected ? styles.selected : ""}`}>
      <Link href={`/notes/${note._id}`} className={styles.noteCard}>
        <h2 className="text-preset-3 text-color-neutral-950">{note.title}</h2>
        <p className="text-preset-6 text-color-neutral-700">
          {note.lastEdited}
        </p>
      </Link>
    </li>
  );
}
