import styles from "./floating-button.module.css";

export default function FloatingButton({ Icon, variant, className, ...props }) {
  return (
    <button
      className={`text-preset-4 ${styles.button} ${
        variant ? styles.variant : ""
      } ${className}`}
      {...props}
    >
      <Icon className={styles.icon} />
    </button>
  );
}
