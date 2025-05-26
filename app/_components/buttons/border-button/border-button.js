import styles from "./border-button.module.css";

export default function BorderButton({ Icon, children, className, ...props }) {
  return (
    <button
      className={`text-preset-4 ${styles.button} ${className}`}
      {...props}
    >
      <Icon className={styles.icon} />
      {children}
    </button>
  );
}
