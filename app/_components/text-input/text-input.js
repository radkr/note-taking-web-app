"use client";

import { useState, useRef } from "react";

import styles from "./text-input.module.css";
import IconShowPassword from "@/assets/images/icon-show-password.svg";
import IconHidePassword from "@/assets/images/icon-hide-password.svg";
import IconInfo from "@/assets/images/icon-info.svg";

export default function Textinput({
  Icon,
  label,
  id,
  name,
  placeholder,
  hint,
  type = "text",
  disabled = false,
  error = "",
}) {
  const [isHidden, setIsHidden] = useState(true);
  const [isFocusVisible, setIsFocusVisible] = useState(false);
  const mouseDownRef = useRef(false);

  const handleMouseDown = () => {
    mouseDownRef.current = true;
  };

  const handleFocus = () => {
    if (!mouseDownRef.current) {
      setIsFocusVisible(true);
    }
  };

  const handleBlur = () => {
    setIsFocusVisible(false);
    mouseDownRef.current = false;
  };

  console.log("isHidden: ", isHidden);

  return (
    <div
      className={`${styles.textInput} ${disabled ? styles.disabled : ""} ${
        error ? styles.error : ""
      }`}
    >
      <label htmlFor={id} className={`text-preset-4 text-color-neutral-950`}>
        {label}
      </label>
      <div
        className={`${styles.field} ${
          isFocusVisible ? styles.focusVisible : ""
        }`}
      >
        {Icon ? <Icon className={styles.icon} /> : null}
        <input
          id={id}
          type={type === "password" ? (isHidden ? "password" : "text") : type}
          name={name}
          placeholder={placeholder}
          onMouseDown={handleMouseDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`text-preset-5 text-color-neutral-950 ${styles.input}`}
          disabled={disabled}
        ></input>
        {type === "password" ? (
          isHidden ? (
            <button
              type="button"
              onClick={() => setIsHidden(false)}
              className={styles.showHide}
              aria-label="Show Password"
              disabled={disabled}
            >
              <IconShowPassword className={styles.icon} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsHidden(true)}
              className={styles.showHide}
              aria-label="Hide Password"
              disabled={disabled}
            >
              <IconHidePassword className={styles.icon} />
            </button>
          )
        ) : null}
      </div>
      {error || hint ? (
        <div className={styles.hint}>
          <IconInfo />
          {error ? <p>{error}</p> : <p>{hint}</p>}
        </div>
      ) : null}
    </div>
  );
}
