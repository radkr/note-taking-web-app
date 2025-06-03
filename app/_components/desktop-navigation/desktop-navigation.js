"use client";

import { use } from "react";
import { useRouter } from "next/navigation";

import styles from "./desktop-navigation.module.css";
import Logo from "@/assets/images/logo.svg";
import IconHome from "@/assets/images/icon-home.svg";
import SelectButton from "../buttons/select-button/select-button";
import { AppCtx, NOTE, NOTES } from "@/app/_lib/application/app-ctx";

export default function DesktopNavigation({ className }) {
  const { activePage } = use(AppCtx);
  const router = useRouter();

  return (
    <div className={`${className} ${styles.header}`}>
      <Logo width={95} height={28} />
      <SelectButton
        Icon={IconHome}
        big
        onClick={() => {
          router.push("/notes");
        }}
        selected={activePage === NOTES || activePage === NOTE}
        label="All Notes"
      />
    </div>
  );
}
