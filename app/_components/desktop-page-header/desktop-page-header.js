"use client";

import { use } from "react";
import Link from "next/link";

import styles from "./desktop-page-header.module.css";
import { AppCtx, NOTES, NOTE, SETTINGS } from "@/app/_lib/application/app-ctx";
import IconSettings from "@/assets/images/icon-settings.svg";

export default function DesktopPageHeader() {
  const { activePage } = use(AppCtx);

  return (
    <div className={styles.header}>
      <h1 className="text-preset-1 text-color-neutral-950">
        {activePage === NOTES || activePage === NOTE ? "All Notes" : "Settings"}
      </h1>
      <div className={styles.controls}>
        <Link href="/settings">
          <IconSettings className={styles.icon} />
        </Link>
      </div>
    </div>
  );
}
