import { use } from "react";

import styles from "./note-sidebar.module.css";
import BorderButton from "@/app/_components/buttons/border-button/border-button";
import IconDelete from "@/assets/images/icon-delete.svg";
import { AllNotesCtx } from "@/app/_lib/notes/all-notes-ctx";

export default function NoteSiderbar() {
  const { note, deleteNote } = use(AllNotesCtx);

  return (
    <div className={styles.sidebar}>
      <BorderButton
        Icon={IconDelete}
        className={styles.button}
        onClick={deleteNote}
        disabled={note?.error}
      >
        Delete Note
      </BorderButton>
    </div>
  );
}
