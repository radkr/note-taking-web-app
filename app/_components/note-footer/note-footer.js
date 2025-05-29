import styles from "./note-footer.module.css";
import PrimaryButton from "@/app/_components/buttons/primary-button/primary-button";

export default function NoteFooter({ onSave, isEdited = false }) {
  return (
    <div className={styles.footer} data-testid="NoteFooter">
      <PrimaryButton disabled={!isEdited} onClick={onSave}>
        Save Note
      </PrimaryButton>
    </div>
  );
}
