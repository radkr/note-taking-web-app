import styles from "./all-tags.module.css";
import { useReadAllTags } from "@/app/_lib/tags/hooks/use-read-all-tags";
import { useAppState, NOTE, NOTES, TAGGED } from "@/app/_lib/app/use-app-state";
import SelectButton from "@/app/_components/buttons/select-button/select-button";
import IconTag from "@/assets/images/icon-tag.svg";

export default function AllTags() {
  const { page, subPage } = useAppState();
  const { allTags } = useReadAllTags();
  const { data, isLoading } = allTags;

  let content;

  if (isLoading) {
    content = (
      <div className={styles.alternative}>
        <p className="text-preset-5 text-color-neutral-800">Loading...</p>
      </div>
    );
  }

  if (data) {
    content = (
      <ul className={styles.tagList} data-testid="All Tags">
        {data.map((tag, index) => {
          return (
            <li key={tag._id}>
              <SelectButton
                Icon={IconTag}
                big
                onClick={() => {
                  console.log(`Open tag: ${tag.name}`);
                }}
                selected={
                  (page === NOTES || page === NOTE) && subPage === TAGGED
                }
                label={tag.name}
              />
              {index < data.length - 1 ? <hr className={styles.rule} /> : null}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className={styles.allTags}>
      <h1
        className={`text-preset-1 text-color-neutral-950 ${styles.portableTitle}`}
      >
        Tags
      </h1>
      <h1
        className={`text-preset-4 text-color-neutral-500 ${styles.desktopTitle}`}
      >
        Tags
      </h1>
      {content}
    </div>
  );
}
