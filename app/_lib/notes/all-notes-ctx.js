"use client";

import {
  createContext,
  useState,
  useEffect,
  useTransition,
  use,
  useCallback,
} from "react";

import { getAllNotes, getNoteWithId } from "@/app/_lib/notes/all-notes-db";
import { AppCtx } from "@/app/_lib/application/app-ctx";
import Modal from "@/app/_components/modal/modal";
import IconDelete from "@/assets/images/icon-delete.svg";
import IconArchive from "@/assets/images/icon-archive.svg";

export const AllNotesCtx = createContext({
  notes: [],
  note: {},
});

export default function AllNotesProvider({ children }) {
  const { noteId } = use(AppCtx);
  const [allNotes, setAllNotes] = useState(undefined);
  const [isAllNotesLoading, startAllNotesTransition] = useTransition();
  const [note, setNote] = useState(undefined);
  const [isNoteLoading, startNoteTransition] = useTransition();

  const updateNote = useCallback(
    (noteId) => {
      if (allNotes) {
        const note = allNotes.find((note) => note._id === noteId);
        if (note) {
          setNote(note);
          return;
        }
      }
      startNoteTransition(async () => {
        const note = await getNoteWithId(noteId);
        setNote(note);
      });
    },
    [allNotes]
  );

  useEffect(() => {
    const id = noteId || note?._id || allNotes?.[0]?._id;
    if (id != undefined && !(note?._id === id)) {
      updateNote(id);
    }
  }, [allNotes, noteId, note?._id, updateNote]);

  useEffect(() => {
    startAllNotesTransition(async () => {
      const allNotes = await getAllNotes();
      setAllNotes(allNotes);
    });
  }, []);

  const AllNotesValue = {
    notes: allNotes,
    note: note,
  };
  return (
    <AllNotesCtx value={AllNotesValue}>
      {children}
      <Modal
        onClose={() => {}}
        variant
        Icon={IconDelete}
        title="Delete Note"
        content="Are you sure you want to permanently delete this note? This action cannot be undone."
        onConfirm={() => {}}
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
