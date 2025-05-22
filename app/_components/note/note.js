import { use } from "react";
import TextareaAutosize from "react-textarea-autosize";

import styles from "./note.module.css";
import NoteHeader from "@/app/_components/note-header/note-header";
import NoteFooter from "@/app/_components/note-footer/note-footer";
import NoteSiderbar from "@/app/_components/note-sidebar/note-sidebar";
import IconClock from "@/assets/images/icon-clock.svg";
import { NoteCtx } from "@/app/_lib/notes/note-ctx";

export default function Note() {
  const { isLoading, note } = use(NoteCtx);

  return (
    <div className={styles.note}>
      <div className={styles.panel}>
        <div className={styles.container}>
          <header className={styles.header}>
            <NoteHeader />
          </header>
          {isLoading ? (
            <div className={styles.details}>
              <p>Loading...</p>
            </div>
          ) : note ? (
            <section className={styles.details}>
              <TextareaAutosize
                minRows={1}
                maxRows={3}
                value={note.title}
                className={`text-preset-1 text-color-neutral-950 ${styles.title}`}
                onChange={() => {}}
              />
              <div className={styles.property}>
                <div className={styles.propertyName}>
                  <IconClock className={styles.propertyIcon} />
                  <p className="text-preset-6">Last edited</p>
                </div>
                <p className="text-preset-6">29 Oct 2024</p>
              </div>
              <hr />
              <textarea
                value={note.content}
                className={`text-preset-5 text-color-neutral-800 ${styles.content}`}
                onChange={() => {}}
              />
            </section>
          ) : null}
          <footer className={styles.footer}>
            <NoteFooter />
          </footer>
        </div>
      </div>
      <aside className={styles.sidebar}>
        <NoteSiderbar />
      </aside>
    </div>
  );
}
