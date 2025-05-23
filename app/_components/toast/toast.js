"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

import styles from "./toast.module.css";
import IconCheckmark from "@/assets/images/icon-checkmark.svg";
import IconCross from "@/assets/images/icon-cross.svg";

export default function Toast({ open, onClose, message, link, href }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dialogRef = useRef();

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      const modal = dialogRef.current;

      function setIsAnimatingFalse() {
        setIsAnimating(false);
      }

      modal.addEventListener("animationcancel", setIsAnimatingFalse);
      modal.addEventListener("animationend", setIsAnimatingFalse);

      return () => {
        modal.removeEventListener("animationcancel", setIsAnimatingFalse);
        modal.removeEventListener("animationend", setIsAnimatingFalse);
      };
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      const modal = dialogRef.current;

      if (open) {
        setIsAnimating(true);
        modal.show();
      }

      return () => {
        setIsAnimating(true);
        modal.close();
      };
    }
  }, [isMounted, open]);

  const children = (
    <>
      <div className={styles.toast}>
        <IconCheckmark className={styles.check} />
        <p
          className={`text-preset-6 text-color-neutral-950 ${styles.textAdjust}`}
        >
          {message}
        </p>
        {link ? (
          <Link
            href={href}
            className={`text-preset-6 text-color-neutral-950 ${styles.link} ${styles.textAdjust}`}
          >
            {link}
          </Link>
        ) : null}
        <button onClick={onClose} className={styles.cross}>
          <IconCross />
        </button>
      </div>
    </>
  );

  return isMounted
    ? createPortal(
        <dialog
          className={styles.modal}
          ref={dialogRef}
          onClose={onClose}
          onClick={(event) => {
            event.stopPropagation();
            if (event.target == dialogRef.current) {
              onClose();
            }
          }}
        >
          {(isAnimating || open) && children}
        </dialog>,
        document.getElementById("modal-root")
      )
    : null;
}
