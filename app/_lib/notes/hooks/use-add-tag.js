import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addTagAction } from "@/app/_lib/notes/all-notes-actions";
import { QUERY_KEY } from "./types";

export function useAddTag() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addTagAction,
    onMutate: async ({ note, tagName }) => {
      // If the tag has been already added then do not add again
      if (note.tags.some((tag) => tag.name === tagName)) return;
      //
      // Create a temporary tag
      const tempTag = {
        _id: Math.floor(Math.random() * 10000).toString(),
        name: tagName,
      };
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
                tags: [...prevNote.tags, tempTag],
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
      queryClient.setQueryData(
        [QUERY_KEY.ALL_NOTES, QUERY_KEY.CURRENT, { id: note._id }],
        {
          ...prevNote,
          tags: [...prevNote.tags, tempTag],
        }
      );
      // Return context
      return { prevAllNotes, prevNote };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEY.ALL_NOTES]);
      queryClient.invalidateQueries([QUERY_KEY.ALL_TAGS]);
    },
  });

  return { addTag: mutate };
}
