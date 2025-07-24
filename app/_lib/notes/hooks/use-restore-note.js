import { useMutation, useQueryClient } from "@tanstack/react-query";

import { restoreNoteAction } from "@/app/_lib/notes/all-notes-actions";
import { QUERY_KEY } from "./types";

export default function useRestoreNote() {
  const queryClient = useQueryClient();

  const rollBack = async ({ prevActive, prevArchived, prevCurrent }) => {
    await queryClient.cancelQueries({ queryKey: [QUERY_KEY.ALL_NOTES] });
    queryClient.setQueryData(
      [QUERY_KEY.ALL_NOTES, QUERY_KEY.ACTIVE],
      prevActive
    );
    queryClient.setQueryData(
      [QUERY_KEY.ALL_NOTES, QUERY_KEY.ARCHIVED],
      prevArchived
    );
    if (prevCurrent) {
      queryClient.setQueryData(
        [QUERY_KEY.ALL_NOTES, QUERY_KEY.CURRENT, { id: prevCurrent._id }],
        prevCurrent
      );
    }
  };

  const { mutate } = useMutation({
    mutationFn: restoreNoteAction,
    onMutate: async (data) => {
      // Cancel current queries before optimistic update
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.ALL_NOTES] });
      // Update archived notes optimistically:
      // No longer see the note in the list of my archived notes
      const prevArchived =
        queryClient.getQueryData([QUERY_KEY.ALL_NOTES, QUERY_KEY.ARCHIVED]) ||
        [];
      const nextArchived = prevArchived.filter(
        (prevNote) => prevNote._id !== data._id
      );
      queryClient.setQueryData(
        [QUERY_KEY.ALL_NOTES, QUERY_KEY.ARCHIVED],
        nextArchived
      );
      // Update active notes optimistically:
      // See the note in the list of my notes
      const prevActive =
        queryClient.getQueryData([QUERY_KEY.ALL_NOTES, QUERY_KEY.ACTIVE]) || [];
      const nextActive = [data, ...prevActive];
      queryClient.setQueryData(
        [QUERY_KEY.ALL_NOTES, QUERY_KEY.ACTIVE],
        nextActive
      );
      // Update current note optimistically:
      // Do not see the status of the note anymore
      const prevCurrent = queryClient.getQueryData([
        QUERY_KEY.ALL_NOTES,
        QUERY_KEY.CURRENT,
        { id: data._id },
      ]);
      if (prevCurrent) {
        queryClient.setQueryData(
          [QUERY_KEY.ALL_NOTES, QUERY_KEY.CURRENT, { id: data._id }],
          {
            ...data,
            isArchived: false,
          }
        );
      }
      return { prevActive, prevArchived, prevCurrent };
    },
    onSuccess: async (data, variables, context) => {
      if (data.error) {
        await rollBack(context);
        return;
      }
      queryClient.invalidateQueries([QUERY_KEY.ALL_NOTES]);
    },
    onError: async (error, variables, context) => {
      await rollBack(context);
    },
  });

  return { restoreNote: mutate };
}
