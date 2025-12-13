"use client";

import { useRouter } from "next/navigation";

import styles from "./desktop-navigation.module.css";
import { Logo, IconHome, IconArchive } from "@/app/_components/icons";
import SelectButton from "../buttons/select-button/select-button";
import {
  useAppState,
  NOTES,
  NOTE,
  ACTIVE,
  ARCHIVED,
} from "@/app/_lib/app/use-app-state";

export default function DesktopNavigation({ className }) {
  const { page, subPage } = useAppState();
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
        selected={(page === NOTES || page === NOTE) && subPage === ACTIVE}
        label="All Notes"
      />
      <SelectButton
        Icon={IconArchive}
        big
        onClick={() => {
          router.push("/notes/archived");
        }}
        selected={(page === NOTES || page === NOTE) && subPage === ARCHIVED}
        label="Archived Notes"
      />
    </div>
  );
}
