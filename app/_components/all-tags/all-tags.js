import styles from "./all-tags.module.css";

export default function AllTags() {
  return (
    <>
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
    </>
  );
}
