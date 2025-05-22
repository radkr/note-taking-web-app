import styles from "./note-sidebar.module.css";
import PrimaryButton from "../buttons/primary-button/primary-button";
import SecondaryButton from "../buttons/secondary-button/secondary-button";
import BorderButton from "../buttons/border-button/border-button";
import IconRestore from "@/assets/images/icon-restore.svg";
import FloatingButton from "../buttons/floating-button/floating-button";
import IconPlus from "@/assets/images/icon-plus.svg";

export default function NoteSiderbar() {
  return (
    <div className={styles.sidebar}>
      <FloatingButton Icon={IconPlus} />
      <h2>I</h2>
      <PrimaryButton variant={true}>Primary Button</PrimaryButton>
      <h2>I</h2>
      <PrimaryButton>Primary Button</PrimaryButton>
      <h2>I</h2>
      <SecondaryButton>Secondary Button</SecondaryButton>
      <h2>I</h2>
      <BorderButton Icon={IconRestore}>Border Button</BorderButton>
    </div>
  );
}
