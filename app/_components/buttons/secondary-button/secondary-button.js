import styles from "./secondary-button.module.css";

export default function SecondaryButton({ children, ...props }) {
  return (
    <button className={`text-preset-4 ${styles.button}`} {...props}>
      {children}
    </button>
  );
}
