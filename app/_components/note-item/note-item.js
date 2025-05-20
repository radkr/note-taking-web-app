import styles from "./note-item.module.css";

export default function NoteItem({ note }) {
  const isSelected = note._id == 1;

  return (
    <li className={`${styles.note} ${isSelected ? styles.selected : ""}`}>
      <div className={styles.noteCard}>
        <h2 className="text-preset-3 text-color-neutral-950">{note.title}</h2>
        <p className="text-preset-6 text-color-neutral-700">
          {note.lastEdited}
        </p>
      </div>
    </li>
  );
}
