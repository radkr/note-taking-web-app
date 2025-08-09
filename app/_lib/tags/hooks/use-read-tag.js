import { useQuery } from "@tanstack/react-query";

import { readAllTagsAction } from "../all-tags-actions";

export function useReadTag() {
  const allTags = useQuery({
    queryKey: ["allTags"],
    queryFn: () => readAllTagsAction(),
    staleTime: 1000,
  });

  return { allTags };
}
