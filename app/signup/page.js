import Link from "next/link";

import styles from "./page.module.css";
import Logo from "@/assets/images/logo.svg";
import Textinput from "../_components/text-input/text-input";
import PrimaryButton from "@/app/_components/buttons/primary-button/primary-button";

export default function SignUp() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.textBox}>
          <h1 className={`text-preset-1 text-color-neutral-950`}>
            Create Your Account
          </h1>
          <p className={`text-preset-5 text-color-neutral-600`}>
            Sign up to start organizing your notes and boost your productivity.
          </p>
        </div>
        <form className={styles.form}>
          <Textinput
            id="email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="email@example.com"
          />
          <Textinput
            id="password"
            name="password"
            type="password"
            label="Password"
            hint="At least 8 characters"
          />
          <PrimaryButton>Sign up</PrimaryButton>
        </form>
        <hr className={styles.rule} />
        <p className={`text-preset-5 text-color-neutral-600`}>
          Already have an account?{" "}
          <Link
            className={`text-preset-5 text-color-neutral-950 ${styles.link}`}
            href={"/login"}
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
