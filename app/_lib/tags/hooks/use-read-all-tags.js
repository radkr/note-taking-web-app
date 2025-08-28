import { useQuery } from "@tanstack/react-query";

import { readAllTagsAction, readTagAction } from "../all-tags-actions";
import { QUERY_KEY } from "../../notes/hooks/types";
import { useAppState } from "@/app/_lib/app/use-app-state";

export function useReadAllTags() {
  const { tag: tagId } = useAppState();

  const allTags = useQuery({
    queryKey: [QUERY_KEY.ALL_TAGS],
    queryFn: readAllTagsAction,
    staleTime: 1000,
  });

  const tag = useQuery({
    queryKey: [QUERY_KEY.ALL_TAGS, QUERY_KEY.CURRENT, { id: tagId }],
    queryFn: () => readTagAction(tagId),
    initialData: () => {
      allTags.data?.find((tag) => {
        return tag._id === tagId;
      });
    },
    enabled: !!tagId,
    staleTime: 1000,
  });

  return { allTags, tag };
}
