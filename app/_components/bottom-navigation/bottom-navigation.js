"use client";

import { use } from "react";
import Link from "next/link";

import styles from "./bottom-navigation.module.css";
import IconHome from "@/assets/images/icon-home.svg";
import { Application, NOTES } from "@/app/_lib/application/application";

export default function BottomNavigation({ className, select }) {
  const { activePage } = use(Application);

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
