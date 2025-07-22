import { useQuery } from "@tanstack/react-query";

import { readAllNotesAction, readNoteAction } from "../all-notes-actions";
import { useAppState } from "../../app/use-app-state";
import { QUERY_KEY } from "./types";

export function useReadNote() {
  const { noteId: noteIdApp, isArchived } = useAppState();

  const key = !isArchived ? QUERY_KEY.ACTIVE : QUERY_KEY.ARCHIVED;

  const allNotes = useQuery({
    queryKey: [QUERY_KEY.ALL_NOTES, key],
    queryFn: () => readAllNotesAction(isArchived),
  });

  const noteId = noteIdApp || allNotes.data?.[0]?._id;

  const note = useQuery({
    queryKey: [QUERY_KEY.ALL_NOTES, QUERY_KEY.CURRENT, { id: noteId }],
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
