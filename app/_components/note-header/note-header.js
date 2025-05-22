import styles from "./note-header.module.css";
import GoBackButton from "@/app/_components/buttons/go-back-button/go-back-button";

export default function NoteHeader() {
  return (
    <div className={styles.header}>
      <GoBackButton />
    </div>
  );
}
