import Link from "next/link";

import styles from "./all-notes-item.module.css";
import { formatDate } from "@/app/_lib/utils";
import {
  ACTIVE,
  ARCHIVED,
  SEARCH,
  useAppState,
} from "@/app/_lib/app/use-app-state";

export default function AllNotesItem({ note, id }) {
  const { subPage, term } = useAppState();
  const isSelected = note._id == id;

  const formattedDate = note?.updatedAt
    ? formatDate(note.updatedAt)
    : "unknown";

  let hrefSubPage;

  switch (subPage) {
    case ACTIVE:
      hrefSubPage = "";
      break;
    case ARCHIVED:
      hrefSubPage = "archived/";
      break;
    case SEARCH:
      hrefSubPage = "search/";
      break;
    default:
      hrefSubPage = "";
  }

  return (
    <li className={`${styles.note} ${isSelected ? styles.selected : ""}`}>
      <Link
        href={`/notes/${hrefSubPage}${note._id}${term ? `?term=${term}` : ""}`}
        className={styles.noteCard}
      >
        <h2 className="text-preset-3 text-color-neutral-950">
          {note.title || "Untitled Note"}
        </h2>
        <p className="text-preset-6 text-color-neutral-700">{formattedDate}</p>
      </Link>
    </li>
  );
}
