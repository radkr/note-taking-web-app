import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNoteAction } from "@/app/_lib/notes/all-notes-actions";
import { QUERY_KEY } from "./types";

export function useCreateNote() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNoteAction,
    onSuccess: (data) => {
      if (data.error) {
        return;
      }
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ALL_NOTES] });
    },
  });

  return { createNote: mutate };
}
