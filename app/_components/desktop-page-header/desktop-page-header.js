"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import styles from "./desktop-page-header.module.css";
import IconSettings from "@/assets/images/icon-settings.svg";
import IconSearch from "@/assets/images/icon-search.svg";
import {
  useAppState,
  NOTES,
  NOTE,
  ACTIVE,
  SEARCH,
  ARCHIVED,
  TAGGED,
} from "@/app/_lib/app/use-app-state";
import { useReadAllTags } from "@/app/_lib/tags/hooks/use-read-all-tags";
import Textinput from "../text-input/text-input";

export default function DesktopPageHeader() {
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

  let title;

  switch (subPage) {
    case ACTIVE:
      title = "All Notes";
      break;
    case ARCHIVED:
      title = "Archived Notes";
      break;
    case SEARCH:
      title = `Showing results for: ${term || ""}`;
      break;
    case TAGGED:
      title = `Notes Tagged: ${tag.data?.name || "..."}`;
      break;
    default:
      title = "";
  }

  return (
    <div className={styles.header}>
      <h1 className="text-preset-1 text-color-neutral-950">
        {page === NOTES || page === NOTE ? title : "Settings"}
      </h1>
      <div className={styles.tools}>
        <form action={handleSearch} noValidate>
          <Textinput
            Icon={IconSearch}
            ariaLabel="Search"
            placeholder="Search by title or content..."
            name="term"
            defaultValue={term || ""}
          />
        </form>
        <Link
          href="/settings"
          className={styles.link}
          aria-label="Go to settings"
        >
          <IconSettings className={styles.icon} />
        </Link>
      </div>
    </div>
  );
}
