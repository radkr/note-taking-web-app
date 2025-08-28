import { useQuery } from "@tanstack/react-query";

import { readAllNotesAction, readNoteAction } from "../all-notes-actions";
import {
  useAppState,
  ACTIVE,
  ARCHIVED,
  SEARCH,
  TAGGED,
} from "../../app/use-app-state";
import { QUERY_KEY } from "./types";

export function useReadNote() {
  const { noteId: noteIdApp, subPage, term, tag } = useAppState();

  let key = subPage === ACTIVE ? QUERY_KEY.ACTIVE : QUERY_KEY.ARCHIVED;

  switch (subPage) {
    case ACTIVE:
      key = QUERY_KEY.ACTIVE;
      break;
    case ARCHIVED:
      key = QUERY_KEY.ARCHIVED;
      break;
    case SEARCH:
      key = { term: term || "" };
      break;
    case TAGGED:
      key = { tag: tag };
      break;
  }

  const allNotes = useQuery({
    queryKey: [QUERY_KEY.ALL_NOTES, key],
    queryFn: () => readAllNotesAction(subPage === ARCHIVED, term || "", tag),
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
