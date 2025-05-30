import styles from "./note-footer.module.css";
import PrimaryButton from "@/app/_components/buttons/primary-button/primary-button";
import SecondaryButton from "@/app/_components/buttons/secondary-button/secondary-button";

export default function NoteFooter({
  onSave,
  onCancel,
  isEdited = false,
  isDisabled,
}) {
  return (
    <div className={styles.footer} data-testid="NoteFooter">
      <PrimaryButton disabled={!isEdited || isDisabled} onClick={onSave}>
        Save Note
      </PrimaryButton>
      <SecondaryButton disabled={!isEdited || isDisabled} onClick={onCancel}>
        Cancel
      </SecondaryButton>
    </div>
  );
}
