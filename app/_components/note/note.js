import { use, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

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
import { deleteNoteWithId } from "@/app/_lib/notes/all-notes-db";

export default function Note({ id, note }) {
  const { saveNote } = use(AllNotesCtx);
  const { displayToast } = use(AppCtx);
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: mutateOnSave } = useMutation({
    mutationFn: updateNoteInDb,
    onMutate: async (data) => {
      // Cancel current queries before optimistic update
      await queryClient.cancelQueries({ queryKey: ["allNotes"] });
      await queryClient.cancelQueries({
        queryKey: ["allNotes", { id: data._id }],
      });
      // Update allNotes optimistically
      const prevAllNotes = queryClient.getQueryData(["allNotes"]);
      const nextAllNotes = !prevAllNotes
        ? []
        : prevAllNotes.map((prevNote) => {
            if (prevNote._id === data._id) return data;
            return prevNote;
          });
      queryClient.setQueryData(["allNotes"], nextAllNotes);

      // Update notes optimistically
      const prevNotes = queryClient.getQueryData([
        "allNotes",
        { id: data._id },
      ]);
      queryClient.setQueryData(["allNotes", { id: data._id }], data);

      // Clear isEdited
      setIsEdited("");

      // Return context
      return { prevAllNotes, prevNotes };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["allNotes"], context.prevAllNotes);
      queryClient.setQueryData(
        ["allNotes", { id: data._id }],
        context.prevNotes
      );
    },
    onSuccess: () => {
      displayToast({
        message: "Note saved successfully!",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(["allNotes"]);
      queryClient.invalidateQueries(["allNotes", { id: data._id }]);
    },
  });

  const { mutate: mutateOnDelete } = useMutation({
    mutationFn: deleteNoteWithId,
    onSuccess: () => {
      console.log("Delete succeeded...");
      queryClient.invalidateQueries({
        queryKey: ["allNotes"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["allNotes", { id: data._id }],
        refetchType: "none",
      });
      displayToast({
        message: "Note permanently deleted.",
      });
      router.push("/notes");
    },
  });

  const [isEdited, setIsEdited] = useState("");

  const title = useRef();
  const content = useRef();

  const { data, isPending, isError, error } = note;

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
    mutateOnSave(noteToSave);
  }

  function handleDelete() {
    console.log("handeDelete");
    mutateOnDelete(data._id);
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
              <NoteHeader
                onSave={handleSave}
                onDelete={handleDelete}
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
              <hr />
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
              <NoteFooter onSave={handleSave} isEdited={isEdited !== ""} />
            </footer>
          </div>
        </div>
        <aside className={styles.sidebar}>
          <NoteSiderbar onDelete={handleDelete} />
        </aside>
      </div>
    );
  }

  if (data && data.error) {
    return (
      <>
        <div className={styles.alternative}>
          <p className="text-preset-5 text-color-neutral-800">{data.error}</p>
        </div>
      </>
    );
  }
}
