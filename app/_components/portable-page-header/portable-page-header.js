import Image from "next/image";

import styles from "./portable-page-header.module.css";
import Logo from "@/assets/images/logo.svg";

export default function PortablePageHeader({ className }) {
  return (
    <div className={`${className} ${styles.header}`}>
      <Logo />
    </div>
  );
}
