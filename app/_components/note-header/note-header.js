import styles from "./note-header.module.css";
import GoBackButton from "@/app/_components/buttons/go-back-button/go-back-button";
import IconDelete from "@/assets/images/icon-delete.svg";
import IconArchive from "@/assets/images/icon-archive.svg";

export default function NoteHeader({
  onSave,
  onCancel,
  onDelete,
  onArchive,
  isEdited,
  isDisabled,
}) {
  return (
    <div className={styles.header}>
      <GoBackButton disabled={isDisabled} />
      <div className={styles.controls}>
        <button
          aria-label="Delete Note"
          className={styles.button}
          onClick={onDelete}
          disabled={isDisabled}
        >
          <IconDelete className={styles.icon} />
        </button>
        <button
          aria-label="Archive Note"
          className={styles.button}
          onClick={onDelete}
          disabled={isDisabled}
        >
          <IconArchive className={styles.icon} />
        </button>
        <button
          className={`text-preset-5 text-color-neutral-600 ${styles.button}`}
          onClick={onArchive}
          disabled={isDisabled}
        >
          Cancel
        </button>
        <button
          className={`text-preset-5 ${
            isEdited || isDisabled
              ? "text-color-blue-500"
              : "text-color-neutral-600"
          } ${styles.button}`}
          onClick={onSave}
          disabled={!isEdited || isDisabled}
        >
          Save Note
        </button>
      </div>
    </div>
  );
}
