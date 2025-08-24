import styles from "./chip.module.css";
import IconCross from "@/assets/images/icon-cross.svg";

export default function Chip({ name, removeBtnLabel, removable, onRemove }) {
  return (
    <div className={`text-preset-6 text-color-neutral-950 ${styles.chip}`}>
      <p className={styles.name}>{name}</p>
      {removable ? (
        <button
          type="button"
          className={styles.deleteButton}
          aria-label={removeBtnLabel || "Remove"}
          onClick={onRemove}
        >
          <IconCross
            className={`text-color-neutral-950 ${styles.deleteIcon}`}
          />
        </button>
      ) : null}
    </div>
  );
}
