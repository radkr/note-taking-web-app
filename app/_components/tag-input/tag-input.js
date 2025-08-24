import React, { useState, useRef, useEffect } from "react";

import styles from "./tag-input.module.css";
import Chip from "@/app/_components/chip/chip";

export default function TagInput({ tags = [], onAddTag, onRemoveTag }) {
  const [newTagName, setNewTagName] = useState("");
  const [inFocus, setInFocus] = useState(false);

  return (
    <div className={`${styles.tagInput} ${inFocus ? styles.inFocus : ""}`}>
      <ul className={styles.currentTags}>
        {tags.map((tag) => {
          return (
            <li key={tag._id}>
              <Chip
                name={tag.name}
                removable
                removeBtnLabel={`Remove the ${tag.name} tag`}
                onRemove={() => {
                  onRemoveTag(tag._id);
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
                onAddTag(event.target.value);
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
