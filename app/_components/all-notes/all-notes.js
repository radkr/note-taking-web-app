"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import AllNotesHeader from "@/app/_components/all-notes-header/all-notes-header";
import AllNotesItem from "@/app/_components/all-notes-item/all-notes-item";
import PrimaryButton from "@/app/_components/buttons/primary-button/primary-button";
import FloatingButton from "@/app/_components/buttons/floating-button/floating-button";
import IconPlus from "@/assets/images/icon-plus.svg";
import { useCreateNote } from "@/app/_lib/notes/hooks/use-create-note";
import InfoBox from "@/app/_components/info-box/info-box";
import styles from "./all-notes.module.css";

export default function AllNotes({ allNotes, isArchived, id }) {
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
        isArchived ? (
          <div className={styles.archivedHint}>
            <p className={`text-preset-5 text-color-neutral-700`}>
              All your archived notes are stored here. You can restore or delete
              them anytime.
            </p>
            <InfoBox>
              <p className="text-preset-5 text-color-neutral-950">
                No notes have been archived yet. Move notes here for
                safekeeping, or{" "}
                <Link href="" onClick={handleCreate}>
                  create a new note
                </Link>
                .
              </p>
            </InfoBox>
          </div>
        ) : (
          <InfoBox>
            <p className="text-preset-5 text-color-neutral-950">
              You don’t have any notes yet. Start a new note to capture your
              thoughts and ideas.
            </p>
          </InfoBox>
        )
      ) : (
        <ul className={styles.noteList} data-testid="All Notes">
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
        aria-label="Create New Note"
      />
    </div>
  );
}
