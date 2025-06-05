"use client";

import { useRouter } from "next/navigation";

import AllNotesHeader from "@/app/_components/all-notes-header/all-notes-header";
import AllNotesItem from "@/app/_components/all-notes-item/all-notes-item";
import PrimaryButton from "@/app/_components/buttons/primary-button/primary-button";
import FloatingButton from "@/app/_components/buttons/floating-button/floating-button";
import IconPlus from "@/assets/images/icon-plus.svg";
import { useCreateNote } from "@/app/_lib/notes/hooks/use-create-note";
import styles from "./all-notes.module.css";

export default function AllNotes({ allNotes, id }) {
  const { data, isLoading } = allNotes;
  const router = useRouter();
  const { createNote } = useCreateNote();

  function handleCreate() {
    createNote(null, {
      onSuccess: (data) => {
        router.push(`/notes/${data._id}`);
      },
    });
  }

  let content;

  if (isLoading) {
    content = (
      <div className={styles.alternative}>
        <p className="text-preset-5 text-color-neutral-800">Loading...</p>
      </div>
    );
  }

  if (data) {
    content =
      data.length == 0 ? (
        <div className={styles.emptyList}>
          <p className="text-preset-5 text-color-neutral-950">
            You don’t have any notes yet. Start a new note to capture your
            thoughts and ideas.
          </p>
        </div>
      ) : (
        <ul className={styles.noteList}>
          {data.map((note, index) => {
            return <AllNotesItem key={note._id} note={note} id={id} />;
          })}
        </ul>
      );
  }

  return (
    <div className={styles.allNotes}>
      <AllNotesHeader />
      <PrimaryButton onClick={handleCreate} className={styles.createDesktop}>
        + Create New Note
      </PrimaryButton>
      {content}
      <FloatingButton
        Icon={IconPlus}
        onClick={handleCreate}
        className={styles.createPortable}
      />
    </div>
  );
}
