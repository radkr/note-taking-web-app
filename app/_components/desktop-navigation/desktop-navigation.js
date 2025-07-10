"use client";

import { useRouter } from "next/navigation";

import styles from "./desktop-navigation.module.css";
import Logo from "@/assets/images/logo.svg";
import IconHome from "@/assets/images/icon-home.svg";
import IconArchive from "@/assets/images/icon-archive.svg";
import SelectButton from "../buttons/select-button/select-button";
import { useAppState, NOTES, NOTE } from "@/app/_lib/app/use-app-state";

export default function DesktopNavigation({ className }) {
  const { page, isArchived } = useAppState();
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
        selected={page === NOTES && isArchived === false}
        label="All Notes"
      />
      <SelectButton
        Icon={IconArchive}
        big
        onClick={() => {
          router.push("/notes/archived");
        }}
        selected={page === NOTES && isArchived === true}
        label="Archived Notes"
      />
    </div>
  );
}
