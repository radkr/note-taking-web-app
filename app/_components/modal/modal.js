"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./modal.module.css";
import SecondaryButton from "@/app/_components/buttons/secondary-button/secondary-button";
import PrimaryButton from "@/app/_components/buttons/primary-button/primary-button";

export default function Modal({
  open,
  onClose,
  variant,
  Icon,
  title,
  content,
  onConfirm,
}) {
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
        modal.showModal();
      }

      return () => {
        setIsAnimating(true);
        modal.close();
      };
    }
  }, [isMounted, open]);

  const children = (
    <>
      <div className={styles.info}>
        <div className={styles.iconBg}>
          <Icon className={styles.icon} />
        </div>
        <div className={styles.message}>
          <h2 className="text-preset-3 text-color-neutral-950">{title}</h2>
          <p className="text-preset-5 text-color-neutral-700">{content}</p>
        </div>
      </div>
      <div className={styles.control}>
        <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
        <PrimaryButton onClick={onConfirm} variant={variant}>
          {title}
        </PrimaryButton>
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
