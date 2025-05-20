import styles from "./note.module.css";
import NoteHeader from "@/app/_components/note-header/note-header";
import NoteFooter from "@/app/_components/note-footer/note-footer";
import NoteSiderbar from "@/app/_components/note-sidebar/note-siderbar";

export default function Note() {
  return (
    <div className={styles.note}>
      <div className={styles.panel}>
        <div className={styles.container}>
          <header className={styles.header}>
            <NoteHeader />
          </header>
          <section className={styles.content}>
            <p>Content</p>
          </section>
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
