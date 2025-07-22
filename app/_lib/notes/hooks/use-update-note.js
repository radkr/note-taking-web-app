import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateNoteAction } from "@/app/_lib/notes/all-notes-actions";
import { QUERY_KEY } from "./types";

export function useUpdateNote(onMutate) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateNoteAction,
    onMutate: async (data) => {
      // Cancel current queries before optimistic update
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.ALL_NOTES] });
      // Update note list optimistically
      const key = data.isArchived ? QUERY_KEY.ARCHIVED : QUERY_KEY.ACTIVE;
      const prevAllNotes = queryClient.getQueryData([QUERY_KEY.ALL_NOTES, key]);
      const nextAllNotes = !prevAllNotes
        ? []
        : prevAllNotes.map((prevNote) => {
            if (prevNote._id === data._id) return data;
            return prevNote;
          });
      queryClient.setQueryData([QUERY_KEY.ALL_NOTES, key], nextAllNotes);

      // Update current note optimistically
      const prevNote = queryClient.getQueryData([
        QUERY_KEY.ALL_NOTES,
        QUERY_KEY.CURRENT,
        { id: data._id },
      ]);
      queryClient.setQueryData(
        [QUERY_KEY.ALL_NOTES, QUERY_KEY.CURRENT, { id: data._id }],
        data
      );
      onMutate();
      // Return context
      return { prevAllNotes, prevNote };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEY.ALL_NOTES]);
    },
  });

  return { saveNote: mutate };
}
