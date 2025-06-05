import styles from "./info-box.module.css";

export default function InfoBox({ children }) {
  return <div className={styles.emptyList}>{children}</div>;
}
