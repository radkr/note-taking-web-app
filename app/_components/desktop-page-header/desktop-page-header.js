"use client";

import Link from "next/link";

import styles from "./desktop-page-header.module.css";
import IconSettings from "@/assets/images/icon-settings.svg";
import { useAppState, NOTES, NOTE } from "@/app/_lib/app/use-app-state";

export default function DesktopPageHeader() {
  const { page, isArchived } = useAppState();

  return (
    <div className={styles.header}>
      <h1 className="text-preset-1 text-color-neutral-950">
        {page === NOTES || page === NOTE
          ? isArchived === false
            ? "All Notes"
            : "Archived Notes"
          : "Settings"}
      </h1>
      <div>
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
