"use client";

import { createContext, useState, useEffect, useTransition } from "react";

import { getAllNotes } from "@/app/_lib/notes/all-notes-db";

export const AllNotesCtx = createContext({
  notes: [],
  notesPending: true,
});

export default function AllNotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const notes = await getAllNotes();
      setNotes(notes);
    });
  }, []);

  const AllNotesValue = {
    notes: notes,
    notesPending: isPending,
  };
  return <AllNotesCtx value={AllNotesValue}>{children}</AllNotesCtx>;
}
