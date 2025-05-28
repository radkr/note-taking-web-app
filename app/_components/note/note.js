import { use, useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

import styles from "./note.module.css";
import NoteHeader from "@/app/_components/note-header/note-header";
import NoteFooter from "@/app/_components/note-footer/note-footer";
import NoteSiderbar from "@/app/_components/note-sidebar/note-sidebar";
import IconClock from "@/assets/images/icon-clock.svg";
import { AllNotesCtx } from "@/app/_lib/notes/all-notes-ctx";
import { formatDate } from "@/app/_lib/utils";

export default function Note() {
  const { saveNote, note } = use(AllNotesCtx);
  const title = useRef();
  const content = useRef();

  const formattedDate = note?.updatedAt
    ? formatDate(note.updatedAt)
    : "unknown";

  console.log("Note:note", note);

  useEffect(() => {
    if (note?.title) {
      title.current.value = note.title;
    }
    if (note?.content) {
      content.current.value = note.content;
    }
  }, [note]);

  function handleSave() {
    const noteToSave = {
      ...note,
      title: title.current.value,
      content: content.current.value,
    };
    saveNote(noteToSave);
  }

  return (
    <>
      {note?.error ? (
        <div className={styles.alternative}>
          <p className="text-preset-5 text-color-neutral-800">{note.error}</p>
        </div>
      ) : note && !note._id ? (
        <div className={styles.alternative}></div>
      ) : note ? (
        <div className={styles.note}>
          <div className={styles.panel}>
            <div className={styles.container}>
              <header className={styles.header}>
                <NoteHeader onSave={handleSave} />
              </header>
              <section className={styles.details}>
                <TextareaAutosize
                  ref={title}
                  minRows={1}
                  maxRows={3}
                  placeholder="Enter a title…"
                  className={`text-preset-1 text-color-neutral-950 ${styles.title}`}
                  onChange={() => {}}
                  aria-label="Title"
                />
                <div className={styles.property}>
                  <div className={styles.propertyName}>
                    <IconClock className={styles.propertyIcon} />
                    <p className="text-preset-6">Last edited</p>
                  </div>
                  <p className="text-preset-6">{formattedDate}</p>
                </div>
                <hr />
                <textarea
                  ref={content}
                  placeholder="Start typing your note here…"
                  className={`text-preset-5 text-color-neutral-800 ${styles.content}`}
                  onChange={() => {}}
                  aria-label="Content"
                />
              </section>
              <footer className={styles.footer}>
                <NoteFooter onSave={handleSave} />
              </footer>
            </div>
          </div>
          <aside className={styles.sidebar}>
            <NoteSiderbar />
          </aside>
        </div>
      ) : (
        <div className={styles.alternative}>
          <p className="text-preset-5 text-color-neutral-800">Loading...</p>
        </div>
      )}
    </>
  );
}
