import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteNoteWithId } from "@/app/_lib/notes/all-notes-db";

export function useDeleteNote() {
  const queryClient = useQueryClient();

  const { mutate: deleteNote, isPending: deleteIsPending } = useMutation({
    mutationFn: deleteNoteWithId,
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
