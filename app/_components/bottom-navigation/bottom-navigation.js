"use client";

import { use } from "react";
import Link from "next/link";

import styles from "./bottom-navigation.module.css";
import IconHome from "@/assets/images/icon-home.svg";
import { AppCtx, NOTES } from "@/app/_lib/application/app-ctx";

export default function BottomNavigation({ className, select }) {
  const { activePage } = use(AppCtx);

  return (
    <ul className={`${className} ${styles.menu}`}>
      <li>
        <Link
          href="/notes"
          className={`${styles.item} ${
            activePage === NOTES ? styles.selected : ""
          }`}
        >
          <IconHome />
          <p className="text-preset-6">Home</p>
        </Link>
      </li>
    </ul>
  );
}
