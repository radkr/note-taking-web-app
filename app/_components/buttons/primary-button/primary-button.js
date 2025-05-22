import styles from "./primary-button.module.css";

export default function PrimaryButton({ variant, children, ...props }) {
  return (
    <button
      className={`text-preset-4 ${styles.button} ${
        variant ? styles.variant : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
