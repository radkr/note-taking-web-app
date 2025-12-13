"use client";

import Link from "next/link";

import styles from "./bottom-navigation.module.css";
import {
  IconHome,
  IconSearch,
  IconArchive,
  IconTag,
  IconSettings,
} from "@/app/_components/icons";
import {
  useAppState,
  NOTES,
  SETTINGS,
  ACTIVE,
  SEARCH,
  TAGGED,
  ARCHIVED,
  TAGS,
} from "@/app/_lib/app/use-app-state";

export default function BottomNavigation({ className }) {
  const { page, subPage } = useAppState();

  return (
    <ul className={`${className} ${styles.menu}`}>
      <li>
        <Link
          href="/notes"
          className={`${styles.item} ${
            page === NOTES && subPage === ACTIVE ? styles.selected : ""
          }`}
        >
          <IconHome className={styles.icon} />
          <p className="text-preset-6">Home</p>
        </Link>
      </li>
      <li>
        <Link
          href="/notes/search"
          className={`${styles.item} ${
            page === NOTES && subPage === SEARCH ? styles.selected : ""
          }`}
        >
          <IconSearch className={styles.icon} />
          <p className="text-preset-6">Search</p>
        </Link>
      </li>
      <li>
        <Link
          href="/notes/archived"
          className={`${styles.item} ${
            page === NOTES && subPage === ARCHIVED ? styles.selected : ""
          }`}
        >
          <IconArchive className={styles.icon} />
          <p className="text-preset-6">Archived</p>
        </Link>
      </li>
      <li>
        <Link
          href="/notes/tagged"
          className={`${styles.item} ${
            page === TAGS || (page === NOTES && subPage === TAGGED)
              ? styles.selected
              : ""
          }`}
        >
          <IconTag className={styles.icon} />
          <p className="text-preset-6">Tags</p>
        </Link>
      </li>
      <li>
        <Link
          href="/settings"
          className={`${styles.item} ${
            page === SETTINGS ? styles.selected : ""
          }`}
        >
          <IconSettings className={styles.icon} />
          <p className="text-preset-6">Settings</p>
        </Link>
      </li>
    </ul>
  );
}
