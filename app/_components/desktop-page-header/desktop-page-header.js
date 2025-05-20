import styles from "./desktop-page-header.module.css";

export default function DesktopPageHeader() {
  return (
    <div className={styles.header}>
      <h1 className="text-preset-1 text-color-neutral-950">All Notes</h1>
    </div>
  );
}
