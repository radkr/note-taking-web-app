import React, { useState, useRef, useEffect } from "react";

import styles from "./tag-input.module.css";
import Chip from "@/app/_components/chip/chip";

export default function TagInput() {
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState("");
  const [inFocus, setInFocus] = useState(false);

  function addTag(name) {
    if (name === "") return;
    setTags((prev) => {
      return [...prev, name];
    });
  }

  function removeTag(name) {
    setTags((prev) => {
      return prev.filter((tag) => tag !== name);
    });
  }

  return (
    <div className={`${styles.tagInput} ${inFocus ? styles.inFocus : ""}`}>
      <ul className={styles.currentTags}>
        {tags.map((tag, index) => {
          return (
            <li key={`${tag}_${index}`}>
              <Chip
                name={tag}
                label={`Remove the ${tag} tag`}
                onRemove={() => {
                  removeTag(tag);
                }}
              />
            </li>
          );
        })}
        <li key={"NewTag"} className={styles.newTag}>
          <input
            type="text"
            id="newTag"
            name="newTag"
            placeholder="Add tag..."
            className={`text-preset-6 text-color-neutral-950  ${styles.newTagInput}`}
            aria-label="Add tag"
            onKeyDown={(event) => {
              if (
                event.key === "Enter" ||
                event.key === " " ||
                event.key === "," ||
                event.key === ";"
              ) {
                event.preventDefault();
                addTag(event.target.value);
                setNewTagName("");
              }
            }}
            value={newTagName}
            onChange={(event) => {
              setNewTagName(event.target.value);
            }}
            onFocus={() => setInFocus(true)}
            onBlur={() => setInFocus(false)}
          />
        </li>
      </ul>
    </div>
  );
}
