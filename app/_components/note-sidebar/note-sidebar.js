import styles from "./note-sidebar.module.css";
import BorderButton from "@/app/_components/buttons/border-button/border-button";
import IconArchive from "@/assets/images/icon-archive.svg";
import IconDelete from "@/assets/images/icon-delete.svg";

export default function NoteSiderbar({ onArchive, onDelete, isDisabled }) {
  return (
    <div className={styles.sidebar}>
      <BorderButton
        Icon={IconArchive}
        className={styles.button}
        onClick={onArchive}
        disabled={isDisabled}
      >
        Archive Note
      </BorderButton>
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
