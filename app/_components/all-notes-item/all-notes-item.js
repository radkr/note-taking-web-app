import Link from "next/link";

import styles from "./all-notes-item.module.css";
import { formatDate } from "@/app/_lib/utils";

export default function AllNotesItem({ note, id }) {
  const isSelected = note._id == id;

  const formattedDate = note?.updatedAt
    ? formatDate(note.updatedAt)
    : "unknown";

  return (
    <li className={`${styles.note} ${isSelected ? styles.selected : ""}`}>
      <Link href={`/notes/${note._id}`} className={styles.noteCard}>
        <h2 className="text-preset-3 text-color-neutral-950">
          {note.title || "Untitled Note"}
        </h2>
        <p className="text-preset-6 text-color-neutral-700">{formattedDate}</p>
      </Link>
    </li>
  );
}
