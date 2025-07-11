import { useQuery } from "@tanstack/react-query";

import { readAllNotesAction, readNoteAction } from "../all-notes-actions";
import { useAppState } from "../../app/use-app-state";

export function useReadNote() {
  const { noteId: noteIdApp, isArchived } = useAppState();

  const key = !isArchived ? "allNotes" : "archivedNotes";

  const allNotes = useQuery({
    queryKey: [key],
    queryFn: () => readAllNotesAction(isArchived),
  });

  const noteId = noteIdApp || allNotes.data?.[0]?._id;

  const note = useQuery({
    queryKey: [key, { id: noteId }],
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
