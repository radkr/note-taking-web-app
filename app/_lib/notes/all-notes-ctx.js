"use client";

import { createContext, useState, useEffect, useTransition, use } from "react";

import { getAllNotes } from "@/app/_lib/notes/all-notes-db";
import { Application } from "@/app/_lib/application/application";
import App from "next/app";

export const AllNotesCtx = createContext({
  notes: [],
  isLoading: true,
  currentNote: undefined,
});

export default function AllNotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [isLoading, startTransition] = useTransition();
  const { noteId } = use(Application);
  const currentNote = noteId || (0 < notes?.length ? notes[0]._id : undefined);

  useEffect(() => {
    startTransition(async () => {
      const notes = await getAllNotes();
      setNotes(notes);
    });
  }, []);

  const AllNotesValue = {
    notes: notes,
    isLoading: isLoading,
    currentNote: currentNote,
  };
  return <AllNotesCtx value={AllNotesValue}>{children}</AllNotesCtx>;
}
