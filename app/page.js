"use client";

import { use } from "react";

import styles from "./page.module.css";
import { Application, HOME, NOTE } from "./_lib/application";

export default function Home() {
  const application = use(Application);

  return (
    <div className={styles.page}>
      <aside
        className={`${styles.allNotes} ${
          application.activeFragment === HOME ? styles.active : ""
        }`}
      >
        <p>All notes</p>
      </aside>
      <article
        className={`${styles.note} ${
          application.activeFragment === NOTE ? styles.active : ""
        }`}
      >
        <p>Notes</p>
      </article>
    </div>
  );
}
