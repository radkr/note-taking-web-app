import { use } from "react";
import { useQuery } from "@tanstack/react-query";

import { getAllNotes, getNoteWithId } from "../all-notes-db";
import { AppCtx } from "@/app/_lib/application/app-ctx";

export function useReadNote() {
  const { noteId: noteIdApp } = use(AppCtx);

  const allNotes = useQuery({
    queryKey: ["allNotes"],
    queryFn: getAllNotes,
  });

  const noteId = noteIdApp || allNotes.data?.[0]?._id;

  const queriedNote = useQuery({
    queryKey: ["allNotes", { id: noteId }],
    queryFn: () => getNoteWithId(noteId),
    enabled: !!noteId,
  });

  const cachedNote = {
    data: allNotes.data?.find((note) => {
      return note._id === noteId;
    }),
    isPending: false,
    isError: false,
    error: {},
  };

  const note = cachedNote.data ? cachedNote : queriedNote;

  return { allNotes, note, noteId };
}
