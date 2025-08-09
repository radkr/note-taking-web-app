"use client";

import styles from "./sidebar.module.css";
import DesktopNavigation from "@/app/_components/desktop-navigation/desktop-navigation";
import AllTags from "@/app/_components/all-tags/all-tags";
import { useAppState, TAGS } from "@/app/_lib/app/use-app-state";

export default function Sidebar() {
  const { page } = useAppState();

  return (
    <div className={`${styles.sidebar} ${page === TAGS ? styles.active : ""}`}>
      <div className={styles.sidebar_panel}>
        <nav className={styles.desktopNavigation}>
          <DesktopNavigation />
        </nav>
        <aside className={styles.allTags}>
          <AllTags />
        </aside>
      </div>
    </div>
  );
}
