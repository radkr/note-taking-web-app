import styles from "./note-header.module.css";
import GoBackButton from "@/app/_components/buttons/go-back-button/go-back-button";
import IconDelete from "@/assets/images/icon-delete.svg";

export default function NoteHeader({ onSave, onDelete, isEdited }) {
  return (
    <div className={styles.header}>
      <GoBackButton />
      <div className={styles.controls}>
        <button
          aria-label="Delete Note"
          className={styles.button}
          onClick={onDelete}
        >
          <IconDelete className={styles.icon} />
        </button>
        <button
          className={`text-preset-5 ${
            isEdited ? "text-color-blue-500" : "text-color-neutral-600"
          } ${styles.button}`}
          onClick={onSave}
        >
          Save Note
        </button>
      </div>
    </div>
  );
}
