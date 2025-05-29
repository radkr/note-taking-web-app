import styles from "./primary-button.module.css";

export default function PrimaryButton({
  variant,
  className,
  children,
  ...props
}) {
  return (
    <button
      className={`text-preset-4 ${styles.button} ${
        variant ? styles.variant : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
