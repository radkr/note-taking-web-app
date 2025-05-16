import Link from "next/link";

import styles from "./bottom-navigation.module.css";
import IconHome from "@/assets/images/icon-home.svg";

export const HOME = "home";

export default function BottomNavigation({ className, select }) {
  return (
    <ul className={`${className} ${styles.menu}`}>
      <li>
        <Link
          href="/notes"
          className={`${styles.item} ${select === HOME ? styles.selected : ""}`}
        >
          <IconHome />
          <p className="text-preset-6">Home</p>
        </Link>
      </li>
    </ul>
  );
}
