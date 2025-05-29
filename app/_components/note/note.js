import { use, useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

import styles from "./note.module.css";
import NoteHeader from "@/app/_components/note-header/note-header";
import NoteFooter from "@/app/_components/note-footer/note-footer";
import NoteSiderbar from "@/app/_components/note-sidebar/note-sidebar";
import IconClock from "@/assets/images/icon-clock.svg";
import { AllNotesCtx } from "@/app/_lib/notes/all-notes-ctx";
import { formatDate } from "@/app/_lib/utils";

export default function Note({ id, note }) {
  const { saveNote } = use(AllNotesCtx);
  const title = useRef();
  const content = useRef();

  const { data, isPending, isError, error } = note;

  const formattedDate = data?.updatedAt
    ? formatDate(data.updatedAt)
    : "unknown";

  useEffect(() => {
    if (data && !data.error) {
      title.current.value = data?.title || "";
      content.current.value = data?.content || "";
    }
  }, [data]);

  function handleSave() {
    const noteToSave = {
      ...data,
      title: title.current.value,
      content: content.current.value,
    };
    saveNote(noteToSave);
  }

  if (isPending) {
    return (
      <div className={styles.alternative}>
        <p className="text-preset-5 text-color-neutral-800">Loading...</p>
      </div>
    );
  }

  if (!id) {
    return <div className={styles.alternative}></div>;
  }

  if (data && !data.error) {
    return (
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
    );
  }

  if (data && data.error) {
    console.log("Error is catched: ", error);
    return (
      <div className={styles.alternative}>
        <p className="text-preset-5 text-color-neutral-800">{data.error}</p>
      </div>
    );
  }
}
