import styles from "./note-sidebar.module.css";
import BorderButton from "@/app/_components/buttons/border-button/border-button";
import { IconArchive } from "@/app/_components/icons";
import { IconRestore } from "@/app/_components/icons";
import { IconDelete } from "@/app/_components/icons";

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
