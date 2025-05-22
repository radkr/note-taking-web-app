import styles from "./floating-button.module.css";

export default function FloatingButton({ Icon, variant, children, ...props }) {
  return (
    <button
      className={`text-preset-4 ${styles.button} ${
        variant ? styles.variant : ""
      }`}
      {...props}
    >
      <Icon className={styles.icon} />
    </button>
  );
}
