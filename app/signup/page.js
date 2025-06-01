"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import z from "zod";

import styles from "./page.module.css";
import Logo from "@/assets/images/logo.svg";
import Textinput from "../_components/text-input/text-input";
import PrimaryButton from "@/app/_components/buttons/primary-button/primary-button";
import { signupAction } from "@/app/_lib/auth/auth-actions";

const signUpSchema = z.object({
  email: z
    .string({ message: "Please enter a valid email address." })
    .trim()
    .email({ message: "Please enter a valid email address." }),
  password: z
    .string({ message: "At least 8 characters" })
    .trim()
    .min(8, { message: "At least 8 characters" }),
});

const signUpDefaultValue = { email: "", password: "" };

export default function SignUp() {
  const [isValid, setIsValid] = useState({});

  function getIsValid(formData) {
    const validationResult = signUpSchema.safeParse(formData);
    let isValid = {};
    if (!validationResult.success) {
      isValid = validationResult.error.issues.reduce((isValid, issue) => {
        if (issue.path.length > 0 && !isValid[issue.path[0]]) {
          isValid[issue.path[0]] = issue.message;
        }
        return isValid;
      }, isValid);
    }
    return isValid;
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
    const resp = await signupAction(data);
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
            Create Your Account
          </h1>
          <p className={`text-preset-5 text-color-neutral-600`}>
            Sign up to start organizing your notes and boost your productivity.
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
            hint="At least 8 characters"
            error={isValid.password}
            onFocus={handleFocus}
            onBlur={handleBlur}
            defaultValue={formState.password}
          />
          <PrimaryButton disabled={pending}>
            {pending ? "Signing up..." : "Sign up"}
          </PrimaryButton>
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
