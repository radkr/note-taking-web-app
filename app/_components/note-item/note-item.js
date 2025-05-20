import Link from "next/link";
import { use } from "react";

import styles from "./note-item.module.css";
import { Application } from "@/app/_lib/application/application";

export default function NoteItem({ note }) {
  const { pageState } = use(Application);
  const isSelected = note._id == pageState.noteId;

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
