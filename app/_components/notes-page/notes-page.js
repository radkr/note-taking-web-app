"use client";

import { use, useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import styles from "./notes-page.module.css";
import { AppCtx, NOTES, NOTE } from "@/app/_lib/application/app-ctx";
import AllNotes from "@/app/_components/all-notes/all-notes";
import AllNotesProvider from "@/app/_lib/notes/all-notes-ctx";
import Note from "@/app/_components/note/note";
import { getAllNotes, getNoteWithId } from "@/app/_lib/notes/all-notes-db";

export default function NotesPage({}) {
  const { activePage, noteId } = use(AppCtx);

  const allNotes = useQuery({
    queryKey: ["allNotes"],
    queryFn: getAllNotes,
  });

  const id = noteId || allNotes.data?.[0]?._id;

  const note = useQuery({
    queryKey: ["allNotes", { id }],
    queryFn: () => getNoteWithId(id),
    enabled: !!id,
  });

  const cachedNote = {
    data: allNotes.data?.find((note) => {
      return note._id === id;
    }),
    isPending: false,
    isError: false,
    error: {},
  };

  return (
    <div className={styles.page}>
      <AllNotesProvider>
        <aside
          className={`${styles.allNotes} ${
            activePage === NOTES ? styles.active : ""
          }`}
        >
          <AllNotes allNotes={allNotes} id={id} />
        </aside>
        <article
          className={`${styles.note} ${
            activePage === NOTE ? styles.active : ""
          }`}
        >
          <Note id={id} note={cachedNote.data ? cachedNote : note} />
        </article>
      </AllNotesProvider>
    </div>
  );
}
