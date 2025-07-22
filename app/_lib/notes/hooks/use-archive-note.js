import { useMutation, useQueryClient } from "@tanstack/react-query";

import { archiveNoteAction } from "@/app/_lib/notes/all-notes-actions";
import { QUERY_KEY } from "./types";
import { Quando } from "next/font/google";

export default function useArchiveNote() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: archiveNoteAction,
    onMutate: async (data) => {
      // Cancel current queries before optimistic update
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.ALL_NOTES] });
      // Update active notes optimistically:
      // No longer see the note in the list of my active notes
      const prevActive = queryClient.getQueryData([
        QUERY_KEY.ALL_NOTES,
        QUERY_KEY.ACTIVE,
      ]);
      const nextActive = !prevActive
        ? []
        : prevActive.filter((prevNote) => prevNote._id !== data._id);
      queryClient.setQueryData(
        [QUERY_KEY.ALL_NOTES, QUERY_KEY.ACTIVE],
        nextActive
      );
      // Update archived notes optimistically:
      // See the note in the list of my arcived notes
      const prevArchived = queryClient.getQueryData([
        QUERY_KEY.ALL_NOTES,
        QUERY_KEY.ARCHIVED,
      ]);
      const nextArchived = [data, ...prevArchived];
      queryClient.setQueryData(
        [QUERY_KEY.ALL_NOTES, QUERY_KEY.ARCHIVED],
        nextArchived
      );
      // Update current note optimistically:
      // See the status of the archived note
      const prevCurrent = queryClient.getQueriesData([
        QUERY_KEY.ALL_NOTES,
        QUERY_KEY.CURRENT,
        { id: data._id },
      ]);
      if (prevCurrent) {
        queryClient.setQueryData(
          [QUERY_KEY.ALL_NOTES, QUERY_KEY.CURRENT, { id: data._id }],
          {
            ...data,
            isArchived: true,
          }
        );
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEY.ALL_NOTES]);
    },
  });

  return { archiveNote: mutate };
}
