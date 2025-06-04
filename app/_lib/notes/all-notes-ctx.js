"use client";

import {
  createContext,
  useState,
  useEffect,
  useTransition,
  use,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";

import {
  getAllNotes,
  getNoteWithId,
  deleteNoteWithId,
  updateNoteInDb,
} from "@/app/_lib/notes/all-notes-db";
import { AppCtx } from "@/app/_lib/application/app-ctx";
import Modal from "@/app/_components/modal/modal";
import IconDelete from "@/assets/images/icon-delete.svg";
import IconArchive from "@/assets/images/icon-archive.svg";
import Toast from "@/app/_components/toast/toast";

export const AllNotesCtx = createContext({
  notes: [],
  note: {},
  deleteNote: () => {},
  saveNote: () => {},
});

export default function AllNotesProvider({ children }) {
  const router = useRouter();
  //
  const pageState = use(AppCtx);
  //
  const [allNotes, setAllNotes] = useState(undefined);
  const [isAllNotesLoading, startAllNotesTransition] = useTransition();
  const [isAllNotesInvalid, setIsAllNotesInvalid] = useState(true);
  //
  const [note, setNote] = useState(undefined);
  const [isNoteLoading, startNoteTransition] = useTransition();
  const [isNoteInvalid, setIsNoteInvalid] = useState(true);
  //
  const [toDelete, setToDelete] = useState();
  //
  const [toast, setToast] = useState();

  const updateNote = useCallback(
    (noteId) => {
      if (!isAllNotesInvalid) {
        const note = allNotes.find((note) => note._id === noteId);
        if (note) {
          setNote(note);
          setIsNoteInvalid(false);
          return;
        }
      }
      startNoteTransition(async () => {
        const note = await getNoteWithId(noteId);
        setNote(note);
        setIsNoteInvalid(false);
      });
    },
    [allNotes, isAllNotesInvalid]
  );

  useEffect(() => {
    const id =
      pageState.noteId ||
      (!isNoteInvalid && note?._id) ||
      (!isAllNotesInvalid && allNotes?.[0]?._id);
    if (id && (isNoteInvalid || !(note?._id === id))) {
      updateNote(id);
    }
    if (!id && !isAllNotesInvalid) {
      setNote({});
      setIsNoteInvalid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageState.noteId, allNotes]);

  useEffect(() => {
    if (isAllNotesInvalid) {
      startAllNotesTransition(async () => {
        const allNotes = await getAllNotes();
        setAllNotes(allNotes);
        setIsAllNotesInvalid(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageState]);

  function deleteNote() {
    setToDelete(note);
  }

  function saveNote(note) {
    startNoteTransition(async () => {
      const updatedNote = await updateNoteInDb(note);
      const allNotes = await getAllNotes();
      setAllNotes(allNotes);
      setNote(updatedNote);
      setToast({
        message: "Note saved successfully!",
      });
    });
  }

  const AllNotesValue = {
    notes: allNotes,
    note: note,
    deleteNote: deleteNote,
    saveNote: saveNote,
  };

  async function confirmDelete() {
    setIsAllNotesInvalid(true);
    setIsNoteInvalid(true);
    await deleteNoteWithId(toDelete._id);
    setToast({
      message: "Note permanently deleted.",
    });
    setToDelete(undefined);
    router.push("/notes");
  }

  return (
    <AllNotesCtx value={AllNotesValue}>
      {children}
      <Modal
        onClose={() => {}}
        Icon={IconArchive}
        title="Archive Note"
        content="Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
        onConfirm={() => {}}
      />
      <Toast
        open={toast}
        onClose={() => {
          setToast(undefined);
        }}
        message={toast?.message}
        link={toast?.link}
        href={toast?.href}
      />
    </AllNotesCtx>
  );
}
