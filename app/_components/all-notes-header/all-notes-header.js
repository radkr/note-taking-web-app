"use client";

import { useRouter } from "next/navigation";
import { useActionState } from "react";

import styles from "./all-notes-header.module.css";
import {
  useAppState,
  NOTES,
  ARCHIVED,
  ACTIVE,
  SEARCH,
  TAGGED,
} from "@/app/_lib/app/use-app-state";
import { useReadAllTags } from "@/app/_lib/tags/hooks/use-read-all-tags";
import Textinput from "../text-input/text-input";
import GoBackButton from "@/app/_components/buttons/go-back-button/go-back-button";
import { IconSearch } from "@/app/_components/icons";

export default function AllNotesHeader() {
  const { page, subPage, term } = useAppState();
  const { tag } = useReadAllTags();
  const { push } = useRouter();

  function handleSearch(formData) {
    const term = formData.get("term");
    if (term === "") {
      push(`/notes/search`);
    } else {
      push(`/notes/search?term=${term}`);
    }
  }

  return (
    <div className={styles.header}>
      {subPage === TAGGED ? <GoBackButton /> : null}
      <h1
        className={`text-preset-1 text-color-neutral-950 ${styles.home} ${
          page === NOTES ? styles.visible : ""
        }`}
      >
        {page === NOTES && subPage === ACTIVE ? "All Notes" : null}
        {page === NOTES && subPage === ARCHIVED ? "Archived Notes" : null}
        {page === NOTES && subPage === SEARCH ? "Search" : null}
        {page === NOTES && subPage === TAGGED
          ? `Notes Tagged: ${tag.data?.name || "..."}`
          : null}
      </h1>
      {page === NOTES && subPage === SEARCH ? (
        <>
          <form action={handleSearch} noValidate>
            <Textinput
              Icon={IconSearch}
              ariaLabel="Search"
              placeholder="Search by title or content..."
              name="term"
              defaultValue={term || ""}
            />
          </form>
          <p
            className={"text-preset-5 text-color-neutral-700"}
          >{`All notes matching ”${term || ""}” are displayed below.`}</p>
        </>
      ) : null}
      {page === NOTES && subPage === TAGGED ? (
        <p
          className={"text-preset-5 text-color-neutral-700"}
        >{`All notes with the ”${
          tag.data?.name || "..."
        }” tag are shown here.`}</p>
      ) : null}
    </div>
  );
}
