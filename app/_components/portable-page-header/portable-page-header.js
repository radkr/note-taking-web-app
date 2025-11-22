import styles from "./portable-page-header.module.css";
import { Logo } from "@/app/_components/icons";

export default function PortablePageHeader({ className }) {
  return (
    <div className={`${className} ${styles.header}`}>
      <Logo />
    </div>
  );
}
