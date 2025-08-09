import styles from "./all-tags.module.css";

export default function AllTags() {
  const isLoading = true;

  let content;

  if (isLoading) {
    content = (
      <div className={styles.alternative}>
        <p className="text-preset-5 text-color-neutral-800">Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.allTags}>
      <h1
        className={`text-preset-1 text-color-neutral-950 ${styles.portableTitle}`}
      >
        Tags
      </h1>
      <h1
        className={`text-preset-4 text-color-neutral-500 ${styles.desktopTitle}`}
      >
        Tags
      </h1>
      {content}
    </div>
  );
}
