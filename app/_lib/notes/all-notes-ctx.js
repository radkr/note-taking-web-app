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
} from "@/app/_lib/notes/all-notes-db";
import { AppCtx } from "@/app/_lib/application/app-ctx";
import Modal from "@/app/_components/modal/modal";
import IconDelete from "@/assets/images/icon-delete.svg";
import IconArchive from "@/assets/images/icon-archive.svg";

export const AllNotesCtx = createContext({
  notes: [],
  note: {},
  deleteNote: () => {},
});

export default function AllNotesProvider({ children }) {
  const { noteId } = use(AppCtx);
  const router = useRouter();
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

  const updateNote = useCallback(
    (noteId) => {
      if (allNotes) {
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
    [allNotes]
  );

  useEffect(() => {
    const id = noteId || (!isNoteInvalid && note?._id) || allNotes?.[0]?._id;
    if (id != undefined && !(note?._id === id)) {
      updateNote(id);
    }
    if (id == undefined && allNotes && allNotes.length == 0) {
      setNote({});
      setIsNoteInvalid(false);
    }
  }, [allNotes, note?._id, noteId, updateNote, isNoteInvalid]);

  useEffect(() => {
    if (isAllNotesInvalid) {
      startAllNotesTransition(async () => {
        const allNotes = await getAllNotes();
        setAllNotes(allNotes);
        setIsAllNotesInvalid(false);
      });
    }
  }, [isAllNotesInvalid]);

  function deleteNote() {
    setToDelete(note);
  }

  const AllNotesValue = {
    notes: allNotes,
    note: note,
    deleteNote: deleteNote,
  };

  async function confirmDelete() {
    setIsAllNotesInvalid(true);
    setIsNoteInvalid(true);
    await deleteNoteWithId(toDelete._id);
    setToDelete(undefined);
    router.push("/notes");
  }

  return (
    <AllNotesCtx value={AllNotesValue}>
      {children}
      <Modal
        open={toDelete}
        onClose={() => {
          setToDelete(undefined);
        }}
        variant
        Icon={IconDelete}
        title="Delete Note"
        content="Are you sure you want to permanently delete this note? This action cannot be undone."
        onConfirm={confirmDelete}
      />
      <Modal
        onClose={() => {}}
        Icon={IconArchive}
        title="Archive Note"
        content="Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
        onConfirm={() => {}}
      />
    </AllNotesCtx>
  );
}
