"use client";

import AllNotesHeader from "@/app/_components/all-notes-header/all-notes-header";
import styles from "./all-settings.module.css";
import SelectButton from "../buttons/select-button/select-button";
import IconLogout from "@/assets/images/icon-logout.svg";

export default function AllSettings() {
  return (
    <div className={styles.allSettings}>
      <h1 className={`text-preset-1 text-color-neutral-950 ${styles.header}`}>
        Settings
      </h1>
      <div className={styles.settingsList}>
        <SelectButton Icon={IconLogout} label="Logout" />
      </div>
    </div>
  );
}
