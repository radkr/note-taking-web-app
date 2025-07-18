import styles from "./note-sidebar.module.css";
import BorderButton from "@/app/_components/buttons/border-button/border-button";
import IconArchive from "@/assets/images/icon-archive.svg";
import IconRestore from "@/assets/images/icon-restore.svg";
import IconDelete from "@/assets/images/icon-delete.svg";

export default function NoteSiderbar({
  onArchive,
  onRestore,
  onDelete,
  isDisabled,
  isArchived,
}) {
  return (
    <div className={styles.sidebar}>
      {isArchived ? (
        <BorderButton
          Icon={IconRestore}
          className={styles.button}
          onClick={onRestore}
          disabled={isDisabled}
        >
          Restore Note
        </BorderButton>
      ) : (
        <BorderButton
          Icon={IconArchive}
          className={styles.button}
          onClick={onArchive}
          disabled={isDisabled}
        >
          Archive Note
        </BorderButton>
      )}
      <BorderButton
        Icon={IconDelete}
        className={styles.button}
        onClick={onDelete}
        disabled={isDisabled}
      >
        Delete Note
      </BorderButton>
    </div>
  );
}
