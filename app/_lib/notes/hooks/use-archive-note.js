import { useMutation, useQueryClient } from "@tanstack/react-query";

import { archiveNote } from "@/app/_lib/notes/all-notes-actions";

export default function useArchiveNote() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: archiveNote,
    onMutate: async (data) => {
      // Cancel current queries before optimistic update
      await queryClient.cancelQueries({ queryKey: ["allNotes"] });
      await queryClient.cancelQueries({ queryKey: ["archivedNotes"] });
      // Update allNotes optimistically
      const prevAllNotes = queryClient.getQueryData(["allNotes"]);
      const nextAllNotes = !prevAllNotes
        ? []
        : prevAllNotes.filter((prevNote) => prevNote._id !== data._id);
      queryClient.setQueryData(["allNotes"], nextAllNotes);
      // Update archivedNotes
      const prevArchivedNotes = queryClient.getQueryData(["archivedNotes"]);
      const nextArchivedNotes = [data, ...prevArchivedNotes];
      queryClient.setQueryData(["archivedNotes"], nextArchivedNotes);
      // Update allNotes note
      const prevAllNote = queryClient.getQueriesData([
        "allNotes",
        { id: data._id },
      ]);
      if (prevAllNote) {
        queryClient.setQueryData(["allNotes", { id: data._id }], {
          ...data,
          isArchived: true,
        });
      }
      // Update archivedNotes note
      const prevArchivedNote = queryClient.getQueriesData([
        "archivedNotes",
        { id: data._id },
      ]);
      if (prevArchivedNote) {
        queryClient.setQueryData(["archivedNotes", { id: data._id }], {
          ...data,
          isArchived: true,
        });
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["allNotes"]);
      queryClient.invalidateQueries(["archivedNotes"]);
    },
  });

  return { archiveNote: mutate };
}
