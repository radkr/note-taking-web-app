import { createContext, useState, useEffect, useTransition, use } from "react";
import { usePathname } from "next/navigation";

import { getNoteWithId } from "@/app/_lib/notes/all-notes-db";
import { AllNotesCtx } from "@/app/_lib/notes/all-notes-ctx";

const title = "React Performance Optimization";
const content = `Key performance optimization techniques:

1. Code Splitting
- Use React.lazy() for route-based splitting
- Implement dynamic imports for heavy components

2.	Memoization
- useMemo for expensive calculations
- useCallback for function props
- React.memo for component optimization

3. Virtual List Implementation
- Use react-window for long lists
- Implement infinite scrolling

TODO: Benchmark current application and identify bottlenecks`;

function getId(path) {
  const segments = path.slice(1).split("/");
  return segments[1];
}

export const NoteCtx = createContext({
  note: {},
  isLoading: {},
});

export default function NoteProvider({ children }) {
  const { isLoading: isAllNotesLoading, currentNote } = use(AllNotesCtx);
  const [note, setNote] = useState();
  const [isNoteLoading, start] = useTransition();
  const isLoading = (!currentNote && isAllNotesLoading) || isNoteLoading;

  useEffect(() => {
    start(async () => {
      if (currentNote) {
        const note = await getNoteWithId(currentNote);
        setNote(note);
      }
    });
  }, [currentNote]);

  const noteCtxValue = {
    note: note,
    isLoading: isLoading,
  };

  return <NoteCtx value={noteCtxValue}>{children}</NoteCtx>;
}
