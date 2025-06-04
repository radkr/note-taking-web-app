import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateNoteAction } from "@/app/_lib/notes/all-notes-actions";

export function useUpdateNote(onMutate) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateNoteAction,
    onMutate: async (data) => {
      // Cancel current queries before optimistic update
      await queryClient.cancelQueries({ queryKey: ["allNotes"] });
      await queryClient.cancelQueries({
        queryKey: ["allNotes", { id: data._id }],
      });
      // Update allNotes optimistically
      const prevAllNotes = queryClient.getQueryData(["allNotes"]);
      const nextAllNotes = !prevAllNotes
        ? []
        : prevAllNotes.map((prevNote) => {
            if (prevNote._id === data._id) return data;
            return prevNote;
          });
      queryClient.setQueryData(["allNotes"], nextAllNotes);

      // Update notes optimistically
      const prevNotes = queryClient.getQueryData([
        "allNotes",
        { id: data._id },
      ]);
      queryClient.setQueryData(["allNotes", { id: data._id }], data);
      onMutate();
      // Return context
      return { prevAllNotes, prevNotes };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["allNotes"], context.prevAllNotes);
      queryClient.setQueryData(
        ["allNotes", { id: data._id }],
        context.prevNotes
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["allNotes"]);
      queryClient.invalidateQueries(["allNotes", { id: data._id }]);
    },
  });

  return { saveNote: mutate };
}
