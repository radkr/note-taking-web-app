import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNoteAction } from "@/app/_lib/notes/all-notes-actions";

export function useCreateNote() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNoteAction,
    onSuccess: (data) => {
      if (data.error) {
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["allNotes"] });
    },
  });

  return { createNote: mutate };
}
