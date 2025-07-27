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
} from "@/app/_lib/app/use-app-state";
import Textinput from "../text-input/text-input";

export default function DesktopPageHeader() {
  const { page, subPage, term } = useAppState();
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
      <h1 className="text-preset-1 text-color-neutral-950">
        {page === NOTES || page === NOTE
          ? subPage === ACTIVE
            ? "All Notes"
            : "Archived Notes"
          : "Settings"}
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
