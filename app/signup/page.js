import Link from "next/link";

import styles from "./page.module.css";
import Logo from "@/assets/images/logo.svg";
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
          <div className={styles.textInput}>
            <label
              htmlFor="email"
              className={`text-preset-4 text-color-neutral-950`}
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="email@example.com"
              className={`text-preset-5 text-color-neutral-500 ${styles.field}`}
            ></input>
          </div>
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
