import styles from "./select-button.module.css";
import IconChevronRight from "@/assets/images/icon-chevron-right.svg";

export default function SelectButton({ Icon, selected, big, onClick, label }) {
  return (
    <button
      className={`${styles.button} ${selected ? styles.selected : ""} ${
        big ? styles.big : ""
      }`}
      onClick={onClick}
    >
      <div className={styles.label}>
        <Icon className={styles.frontIcon} />
        <p>{label}</p>
      </div>
      <IconChevronRight className={styles.backIcon} />
    </button>
  );
}
