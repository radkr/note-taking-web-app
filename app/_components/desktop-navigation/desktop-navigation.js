"use client";

import { useRouter } from "next/navigation";

import styles from "./desktop-navigation.module.css";
import Logo from "@/assets/images/logo.svg";
import IconHome from "@/assets/images/icon-home.svg";
import SelectButton from "../buttons/select-button/select-button";
import { useAppState, NOTES, NOTE } from "@/app/_lib/app/use-app-state";

export default function DesktopNavigation({ className }) {
  const { page } = useAppState();
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
        selected={page === NOTES || page === NOTE}
        label="All Notes"
      />
    </div>
  );
}
