import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeTagAction } from "@/app/_lib/notes/all-notes-actions";
import { QUERY_KEY } from "./types";

async function resetQueries(queryClient, context) {
  // Cancel current queries before reset
  await queryClient.cancelQueries({ queryKey: [QUERY_KEY.ALL_NOTES] });
  if (context.prevNote) {
    // Reset note list
    const key = context.prevNote.isArchived
      ? QUERY_KEY.ARCHIVED
      : QUERY_KEY.ACTIVE;
    queryClient.setQueryData([QUERY_KEY.ALL_NOTES, key], context.prevAllNotes);
    // Reset current note
    queryClient.setQueryData(
      [QUERY_KEY.ALL_NOTES, QUERY_KEY.CURRENT, { id: context.prevNote._id }],
      context.prevNote
    );
  }
  // Cancel current queries before reset
  await queryClient.cancelQueries({ queryKey: [QUERY_KEY.ALL_TAGS] });
  // Reset tag list
  queryClient.setQueryData([QUERY_KEY.ALL_TAGS], context.prevAlltags);
}

export function useRemoveTag() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: removeTagAction,
    onMutate: async ({ note, tagId }) => {
      // Cancel current queries before optimistic update
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.ALL_NOTES] });
      // Update note list optimistically
      const key = note.isArchived ? QUERY_KEY.ARCHIVED : QUERY_KEY.ACTIVE;
      const prevAllNotes = queryClient.getQueryData([QUERY_KEY.ALL_NOTES, key]);
      const nextAllNotes = !prevAllNotes
        ? []
        : prevAllNotes.map((prevNote) => {
            if (prevNote._id === note._id)
              return {
                ...prevNote,
                tags: prevNote.tags.filter((tag) => tag._id !== tagId),
              };
            return prevNote;
          });
      queryClient.setQueryData([QUERY_KEY.ALL_NOTES, key], nextAllNotes);
      //
      // Update current note optimistically
      const prevNote = queryClient.getQueryData([
        QUERY_KEY.ALL_NOTES,
        QUERY_KEY.CURRENT,
        { id: note._id },
      ]);
      if (prevNote)
        queryClient.setQueryData(
          [QUERY_KEY.ALL_NOTES, QUERY_KEY.CURRENT, { id: note._id }],
          {
            ...prevNote,
            tags: prevNote.tags.filter((tag) => tag._id !== tagId),
          }
        );
      //
      // Cancel current queries before optimistic update
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.ALL_TAGS] });
      // Update tag list optimistically
      const prevAlltags = queryClient.getQueryData([QUERY_KEY.ALL_TAGS]) || [];
      queryClient.setQueryData(
        [QUERY_KEY.ALL_TAGS],
        prevAlltags.filter((tag) => tag._id !== tagId)
      );
      //
      // Return context
      return { prevAllNotes, prevNote, prevAlltags };
    },
    onSuccess: async (data, variables, context) => {
      if (!data || data.error) {
        resetQueries(queryClient, context);
        return;
      }
      queryClient.invalidateQueries([QUERY_KEY.ALL_NOTES]);
      queryClient.invalidateQueries([QUERY_KEY.ALL_TAGS]);
    },
    onError: (error, variables, context) => {
      resetQueries(queryClient, context);
    },
  });

  return { removeTag: mutate };
}
