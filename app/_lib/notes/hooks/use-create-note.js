import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNote } from "@/app/_lib/notes/all-notes-db";

export function useCreateNote() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: (data) => {
      if (data.error) {
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["allNotes"] });
    },
  });

  return { createNote: mutate };
}
