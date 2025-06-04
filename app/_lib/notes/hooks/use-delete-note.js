import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteNoteAction } from "@/app/_lib/notes/all-notes-actions";

export function useDeleteNote() {
  const queryClient = useQueryClient();

  const { mutate: deleteNote, isPending: deleteIsPending } = useMutation({
    mutationFn: deleteNoteAction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["allNotes"],
        exact: true,
      });
      if (data?._id) {
        queryClient.invalidateQueries({
          queryKey: ["allNotes", { id: data._id }],
          refetchType: "none",
        });
      }
    },
  });

  return { deleteNote, isPending: deleteIsPending };
}
