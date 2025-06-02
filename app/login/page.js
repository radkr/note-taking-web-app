"use client";

import { useState, useActionState } from "react";
import Link from "next/link";

import styles from "./page.module.css";
import Logo from "@/assets/images/logo.svg";
import Textinput from "../_components/text-input/text-input";
import PrimaryButton from "@/app/_components/buttons/primary-button/primary-button";
import { loginAction } from "@/app/_lib/auth/auth-actions";
import { SignupFormSchema } from "@/app/_lib/auth/auth-schema";

const signUpDefaultValue = { email: "", password: "" };

export default function SignUp() {
  const [isValid, setIsValid] = useState({});

  function getIsValid(formData) {
    const validationResult = SignupFormSchema.safeParse(formData);
    return validationResult.error?.flatten().fieldErrors || {};
  }

  function handleFocus(event) {
    const name = event.target.name;
    setIsValid((lastValue) => ({ ...lastValue, [name]: undefined }));
  }

  function handleBlur(event) {
    const name = event.target.name;
    const data = { [name]: event.target.value };
    const isValid = { [name]: getIsValid(data)[name] };
    setIsValid((lastValue) => ({ ...lastValue, ...isValid }));
  }

  async function handleSubmit(state, formData) {
    const data = Object.fromEntries(formData.entries());
    const isValid = getIsValid(data);
    setIsValid(isValid);
    if (Object.keys(isValid).length > 0) {
      return data;
    }
    const resp = await loginAction(data);
    if (!resp.error) return signUpDefaultValue;
    setIsValid(resp.error);
    return data;
  }

  const [formState, formAction, pending] = useActionState(
    // Update form State upon submission
    handleSubmit,
    // Default value of formState
    signUpDefaultValue
  );

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.textBox}>
          <h1 className={`text-preset-1 text-color-neutral-950`}>
            Welcome to Note
          </h1>
          <p className={`text-preset-5 text-color-neutral-600`}>
            Please log in to continue
          </p>
        </div>
        <form action={formAction} className={styles.form} noValidate>
          <Textinput
            id="email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="email@example.com"
            error={isValid.email}
            onFocus={handleFocus}
            onBlur={handleBlur}
            defaultValue={formState.email}
          />
          <Textinput
            id="password"
            name="password"
            type="password"
            label="Password"
            error={isValid.password}
            onFocus={handleFocus}
            onBlur={handleBlur}
            defaultValue={formState.password}
          />
          <PrimaryButton disabled={pending}>
            {pending ? "Logging in..." : "Login"}
          </PrimaryButton>
        </form>
        <hr className={styles.rule} />
        <p className={`text-preset-5 text-color-neutral-600`}>
          No account yet?{" "}
          <Link
            className={`text-preset-5 text-color-neutral-950 ${styles.link}`}
            href={"/signup"}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
