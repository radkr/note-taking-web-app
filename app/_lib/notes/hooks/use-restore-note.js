import { useMutation, useQueryClient } from "@tanstack/react-query";

import { restoreNoteAction } from "@/app/_lib/notes/all-notes-actions";

export default function useRestoreNote() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: restoreNoteAction,
    onMutate: async (data) => {
      // Cancel current queries before optimistic update
      await queryClient.cancelQueries({ queryKey: ["allNotes"] });
      await queryClient.cancelQueries({ queryKey: ["archivedNotes"] });
      // No longer see the note in the list of my archived notes - optimistic
      const prevAllNotes = queryClient.getQueryData(["archivedNotes"]);
      const nextAllNotes = !prevAllNotes
        ? []
        : prevAllNotes.filter((prevNote) => prevNote._id !== data._id);
      queryClient.setQueryData(["allNotes"], nextAllNotes);
      // See the note in the list of my notes - optimistic
      const prevArchivedNotes = queryClient.getQueryData(["allNotes"]);
      const nextArchivedNotes = [data, ...prevArchivedNotes];
      queryClient.setQueryData(["archivedNotes"], nextArchivedNotes);
      // Do not see the status of the note anymore - optimistic - allNotes
      const prevAllNote = queryClient.getQueriesData([
        "allNotes",
        { id: data._id },
      ]);
      if (prevAllNote) {
        queryClient.setQueryData(["allNotes", { id: data._id }], {
          ...data,
          isArchived: false,
        });
      }
      // Do not see the status of the note anymore - optimistic - archivedNotes
      const prevArchivedNote = queryClient.getQueriesData([
        "archivedNotes",
        { id: data._id },
      ]);
      if (prevArchivedNote) {
        queryClient.setQueryData(["archivedNotes", { id: data._id }], {
          ...data,
          isArchived: false,
        });
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["allNotes"]);
      queryClient.invalidateQueries(["archivedNotes"]);
    },
  });

  return { restoreNote: mutate };
}
