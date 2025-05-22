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
    if (id && !(note?._id === id)) {
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
  return <AllNotesCtx value={AllNotesValue}>{children}</AllNotesCtx>;
}
