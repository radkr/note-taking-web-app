import { use } from "react";

import styles from "./note-header.module.css";
import GoBackButton from "@/app/_components/buttons/go-back-button/go-back-button";
import IconDelete from "@/assets/images/icon-delete.svg";
import { AllNotesCtx } from "@/app/_lib/notes/all-notes-ctx";

export default function NoteHeader({ onSave }) {
  const { deleteNote } = use(AllNotesCtx);

  return (
    <div className={styles.header}>
      <GoBackButton />
      <div className={styles.controls}>
        <button
          aria-label="Delete Note"
          className={styles.button}
          onClick={deleteNote}
        >
          <IconDelete className={styles.icon} />
        </button>
        <button
          className={`text-preset-5 text-color-blue-500 ${styles.button}`}
          onClick={onSave}
        >
          Save Note
        </button>
      </div>
    </div>
  );
}
