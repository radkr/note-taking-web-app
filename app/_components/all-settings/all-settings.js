"use client";

import styles from "./all-settings.module.css";
import SelectButton from "../buttons/select-button/select-button";
import IconLogout from "@/assets/images/icon-logout.svg";
import { logoutAction } from "@/app/_lib/auth/auth-actions";

export default function AllSettings() {
  return (
    <div className={styles.allSettings}>
      <h1 className={`text-preset-1 text-color-neutral-950 ${styles.header}`}>
        Settings
      </h1>
      <div className={styles.settingsList}>
        <SelectButton
          Icon={IconLogout}
          label="Logout"
          onClick={async () => {
            console.log("Logout clicked");
            await logoutAction();
          }}
        />
      </div>
    </div>
  );
}
