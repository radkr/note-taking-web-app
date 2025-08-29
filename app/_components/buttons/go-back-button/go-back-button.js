"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import styles from "./go-back-button.module.css";
import IconLeft from "@/assets/images/icon-arrow-left.svg";
import {
  useAppState,
  ACTIVE,
  ARCHIVED,
  SEARCH,
  TAGGED,
  NOTE,
} from "@/app/_lib/app/use-app-state";

export default function GoBackButton() {
  const { page, subPage, term, tag } = useAppState();

  let href;
  let params = "";

  switch (subPage) {
    case ACTIVE:
      href = "/notes";
      break;
    case ARCHIVED:
      href = "/notes/archived";
      break;
    case SEARCH:
      href = "/notes/search";
      params = term ? `?term=${term}` : "";
      break;
    case TAGGED:
      href = "/notes/tagged";
      params = page === NOTE ? (tag ? `?tag=${tag}` : "") : "";
      break;
    default:
      href = "";
  }

  href = `${href}${params}`;

  return (
    <Link href={href} className={styles.back}>
      <IconLeft className={styles.arrow} />
      <p className="text-preset-5 text-color-neutral-600">Go Back</p>
    </Link>
  );
}
