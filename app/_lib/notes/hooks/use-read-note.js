import { use } from "react";
import { useQuery } from "@tanstack/react-query";

import { readAllNotesAction, readNoteAction } from "../all-notes-actions";
import { AppCtx } from "@/app/_lib/app/app-ctx";

export function useReadNote() {
  const { noteId: noteIdApp } = use(AppCtx);

  const allNotes = useQuery({
    queryKey: ["allNotes"],
    queryFn: readAllNotesAction,
  });

  const noteId = noteIdApp || allNotes.data?.[0]?._id;

  const note = useQuery({
    queryKey: ["allNotes", { id: noteId }],
    queryFn: () => readNoteAction(noteId),
    initialData: () => {
      allNotes.data?.find((note) => {
        return note._id === noteId;
      });
    },
    enabled: !!noteId,
    staleTime: 1000,
  });

  return { allNotes, note, noteId };
}
