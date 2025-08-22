import { useQuery } from "@tanstack/react-query";

import { readAllTagsAction } from "../all-tags-actions";
import { QUERY_KEY } from "../../notes/hooks/types";

export function useReadAllTags() {
  const allTags = useQuery({
    queryKey: [QUERY_KEY.ALL_TAGS],
    queryFn: () => readAllTagsAction(),
    staleTime: 1000,
  });

  return { allTags };
}
