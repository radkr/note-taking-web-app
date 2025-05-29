import styles from "./note-sidebar.module.css";
import BorderButton from "@/app/_components/buttons/border-button/border-button";
import IconDelete from "@/assets/images/icon-delete.svg";

export default function NoteSiderbar({ onDelete, isDisabled }) {
  return (
    <div className={styles.sidebar}>
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
