import { use, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Link from "next/link";

import styles from "./note.module.css";
import NoteHeader from "@/app/_components/note-header/note-header";
import NoteFooter from "@/app/_components/note-footer/note-footer";
import NoteSiderbar from "@/app/_components/note-sidebar/note-sidebar";
import IconClock from "@/assets/images/icon-clock.svg";
import { AllNotesCtx } from "@/app/_lib/notes/all-notes-ctx";
import { formatDate } from "@/app/_lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNoteInDb } from "@/app/_lib/notes/all-notes-db";
import { AppCtx } from "@/app/_lib/application/app-ctx";
import { useRouter } from "next/navigation";
import { useDeleteNote } from "@/app/_lib/notes/hooks/use-delete-note";
import { useUpdateNote } from "@/app/_lib/notes/hooks/use-update-note";

export default function Note({ id, note }) {
  const { displayToast } = use(AppCtx);
  const router = useRouter();
  const { deleteNote, deleteIsPending } = useDeleteNote();
  const { saveNote } = useUpdateNote(() => setIsEdited(""));

  const [isEdited, setIsEdited] = useState("");

  const title = useRef();
  const content = useRef();

  const { data, isLoading, isError, error } = note;

  const formattedDate = data?.updatedAt
    ? formatDate(data.updatedAt)
    : "unknown";

  useEffect(() => {
    if (data && !data.error) {
      if (isEdited !== data._id) {
        title.current.value = data?.title || "";
        content.current.value = data?.content || "";
        setIsEdited("");
      }
    }
  }, [isEdited, data]);

  function handleSave() {
    const noteToSave = {
      ...data,
      title: title.current.value,
      content: content.current.value,
    };
    saveNote(noteToSave, {
      onSuccess: () => {
        displayToast({
          message: "Note saved successfully!",
        });
      },
    });
  }

  function handleCancel() {
    setIsEdited(false);
  }

  function handleDelete() {
    deleteNote(data._id, {
      onSuccess: () => {
        displayToast({
          message: "Note permanently deleted.",
        });
        router.push("/notes");
      },
    });
  }

  if (isLoading) {
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
              <NoteHeader
                onSave={handleSave}
                onCancel={handleCancel}
                onDelete={handleDelete}
                isDisabled={deleteIsPending}
                isEdited={isEdited !== ""}
              />
            </header>
            <section className={styles.details}>
              <TextareaAutosize
                ref={title}
                minRows={1}
                maxRows={3}
                placeholder="Enter a title…"
                className={`text-preset-1 text-color-neutral-950 ${styles.editable}`}
                onChange={() => {
                  setIsEdited(data._id);
                }}
                aria-label="Title"
              />
              <div className={styles.property}>
                <div className={styles.propertyName}>
                  <IconClock className={styles.propertyIcon} />
                  <p className="text-preset-6">Last edited</p>
                </div>
                <p className="text-preset-6">{formattedDate}</p>
              </div>
              <hr className={styles.rule} />
              <textarea
                ref={content}
                placeholder="Start typing your note here…"
                className={`text-preset-5 text-color-neutral-800 ${styles.editable}`}
                onChange={() => {
                  setIsEdited(data._id);
                }}
                aria-label="Content"
              />
            </section>
            <footer className={styles.footer}>
              <NoteFooter
                onSave={handleSave}
                onCancel={handleCancel}
                isEdited={isEdited !== ""}
                isDisabled={deleteIsPending}
              />
            </footer>
          </div>
        </div>
        <aside className={styles.sidebar}>
          <NoteSiderbar onDelete={handleDelete} isDisabled={deleteIsPending} />
        </aside>
      </div>
    );
  }

  if (data && data.error) {
    return (
      <>
        <div className={styles.alternative}>
          <div className={styles.errorMessage}>
            <p className="text-preset-5 text-color-neutral-800">
              <strong className="text-preset-3 text-color-neutral-800">
                Note unavailable: {""}
              </strong>
              We couldn’t find this note — it may have been deleted, or you
              might not have permission to view it. Try opening a different
              note, or{" "}
              <Link href="/login">log in with a different account</Link>.
            </p>
          </div>
        </div>
      </>
    );
  }
}
