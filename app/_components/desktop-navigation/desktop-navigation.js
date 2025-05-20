import styles from "./desktop-navigation.module.css";
import Logo from "@/assets/images/logo.svg";

export default function DesktopNavigation({ className }) {
  return (
    <div className={`${className} ${styles.header}`}>
      <Logo />
    </div>
  );
}
