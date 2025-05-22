"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./go-back-button.module.css";
import IconLeft from "@/assets/images/icon-arrow-left.svg";

export default function GoBackButton() {
  const href = usePathname().split("/").slice(0, -1).join("/");

  return (
    <Link href={href} className={styles.back}>
      <IconLeft className={styles.arrow} />
      <p className="text-preset-5 text-color-neutral-600">Go Back</p>
    </Link>
  );
}
