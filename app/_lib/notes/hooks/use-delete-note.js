import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteNoteAction } from "@/app/_lib/notes/all-notes-actions";
import { QUERY_KEY } from "./types";

export function useDeleteNote() {
  const queryClient = useQueryClient();

  const { mutate: deleteNote, isPending: deleteIsPending } = useMutation({
    mutationFn: deleteNoteAction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ALL_NOTES],
      });
    },
  });

  return { deleteNote, isPending: deleteIsPending };
}
