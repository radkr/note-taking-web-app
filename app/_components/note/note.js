import { use, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useRouter } from "next/navigation";
import Link from "next/link";

import styles from "./note.module.css";
import NoteHeader from "@/app/_components/note-header/note-header";
import NoteFooter from "@/app/_components/note-footer/note-footer";
import NoteSiderbar from "@/app/_components/note-sidebar/note-sidebar";
import Modal from "@/app/_components/modal/modal";
import InfoBox from "@/app/_components/info-box/info-box";
import { formatDate } from "@/app/_lib/utils";
import { AppCtx } from "@/app/_lib/app/app-ctx";
import { useDeleteNote } from "@/app/_lib/notes/hooks/use-delete-note";
import { useUpdateNote } from "@/app/_lib/notes/hooks/use-update-note";
import useRestoreNote from "@/app/_lib/notes/hooks/use-restore-note";
import useArchiveNote from "@/app/_lib/notes/hooks/use-archive-note";
import IconClock from "@/assets/images/icon-clock.svg";
import IconStatus from "@/assets/images/icon-status.svg";
import IconDelete from "@/assets/images/icon-delete.svg";
import { ARCHIVED, useAppState } from "@/app/_lib/app/use-app-state";

export default function Note({ id, note }) {
  const { displayToast } = use(AppCtx);
  const router = useRouter();
  const { archiveNote } = useArchiveNote();
  const { restoreNote } = useRestoreNote();
  const { deleteNote, deleteIsPending } = useDeleteNote();
  const { saveNote } = useUpdateNote(() => setIsEdited("")); //
  const [toDelete, setToDelete] = useState(false);
  const [isEdited, setIsEdited] = useState("");
  const { subPage } = useAppState();

  const title = useRef();
  const content = useRef();

  const { data, isLoading, isError, error } = note;

  const formattedDate = data?.updatedAt
    ? formatDate(data.updatedAt)
    : "unknown";

  useEffect(() => {
    if (data && !data.error) {
      if (isEdited !== data._id) {
        title.current.value = data?.title || "";
        content.current.value = data?.content || "";
        setIsEdited("");
      }
    }
  }, [isEdited, data]);

  const saveErrorToast = {
    message: "The note can not be saved.",
    isError: true,
  };

  function handleSave() {
    const noteToSave = {
      ...data,
      title: title.current.value,
      content: content.current.value,
    };
    saveNote(noteToSave, {
      onSuccess: (reply) => {
        if (reply.error) {
          displayToast(saveErrorToast);
          return;
        }
        displayToast({
          message: "Note saved successfully!",
        });
      },
      onError: () => {
        displayToast(saveErrorToast);
      },
    });
  }

  const archiveErrorToast = {
    message: "The note can not be archived.",
    isError: true,
  };

  function handleArchive() {
    archiveNote(
      { ...data },
      {
        onSuccess: (reply) => {
          if (reply.error) {
            displayToast(archiveErrorToast);
            return;
          }
          displayToast({
            message: "Note archived.",
            link: "Archived Notes",
            href: "/notes/archived",
          });
        },
        onError: (error) => {
          displayToast(archiveErrorToast);
        },
      }
    );
  }

  const restoreErrorToast = {
    message: "The note can not be restored.",
    isError: true,
  };

  function handleRestore() {
    restoreNote(
      { ...data },
      {
        onSuccess: (reply) => {
          if (reply.error) {
            displayToast(restoreErrorToast);
            return;
          }
          displayToast({
            message: "Note restored to active notes.",
            link: "All Notes",
            href: "/notes",
          });
        },
        onError: (error) => {
          displayToast(restoreErrorToast);
        },
      }
    );
  }

  const deleteErrorToast = {
    message: "The note can not be deleted.",
    isError: true,
  };

  function handleDelete() {
    deleteNote(data._id, {
      onSuccess: (reply) => {
        if (reply.error) {
          displayToast(deleteErrorToast);
          return;
        }

        displayToast({
          message: "Note permanently deleted.",
        });
        router.push(`/notes${subPage === ARCHIVED ? "/archived" : ""}`);
      },
      onError: (error) => {
        displayToast(deleteErrorToast);
      },
    });
    setToDelete(false);
  }

  if (isLoading) {
    return (
      <div className={styles.alternative}>
        <p className="text-preset-5 text-color-neutral-800">Loading...</p>
      </div>
    );
  }

  if (!id) {
    return <div className={styles.alternative}></div>;
  }

  if (data && !data.error) {
    return (
      <>
        <div className={styles.note} data-testid="Note">
          <div className={styles.panel}>
            <div className={styles.container}>
              <header className={styles.header}>
                <NoteHeader
                  onSave={handleSave}
                  onCancel={() => setIsEdited(false)}
                  onDelete={() => setToDelete(true)}
                  onArchive={handleArchive}
                  onRestore={handleRestore}
                  isDisabled={deleteIsPending}
                  isEdited={isEdited !== ""}
                  isArchived={data.isArchived}
                />
              </header>
              <form className={styles.details}>
                <TextareaAutosize
                  ref={title}
                  minRows={1}
                  maxRows={3}
                  placeholder="Enter a title…"
                  className={`text-preset-1 text-color-neutral-950 ${styles.editable}`}
                  onChange={() => {
                    setIsEdited(data._id);
                  }}
                  aria-label="Title"
                  name="title"
                />
                <div className={styles.propertyList}>
                  {data.isArchived ? (
                    <div className={styles.property}>
                      <div className={styles.propertyName}>
                        <IconStatus className={styles.propertyIcon} />
                        <p className="text-preset-6">Status</p>
                      </div>
                      <p className="text-preset-6">Archived</p>
                    </div>
                  ) : null}
                  <div className={styles.property}>
                    <div className={styles.propertyName}>
                      <IconClock className={styles.propertyIcon} />
                      <p className="text-preset-6">Last edited</p>
                    </div>
                    <p className="text-preset-6">{formattedDate}</p>
                  </div>
                </div>
                <hr className={styles.rule} />
                <textarea
                  ref={content}
                  placeholder="Start typing your note here…"
                  className={`text-preset-5 text-color-neutral-800 ${styles.editable}`}
                  onChange={() => {
                    setIsEdited(data._id);
                  }}
                  aria-label="Content"
                  name="content"
                />
              </form>
              <footer className={styles.footer}>
                <NoteFooter
                  onSave={handleSave}
                  onCancel={() => setIsEdited(false)}
                  isEdited={isEdited !== ""}
                  isDisabled={deleteIsPending}
                />
              </footer>
            </div>
          </div>
          <aside className={styles.sidebar}>
            <NoteSiderbar
              onArchive={handleArchive}
              onRestore={handleRestore}
              onDelete={() => setToDelete(true)}
              isDisabled={deleteIsPending}
              isArchived={data.isArchived}
            />
          </aside>
        </div>
        <Modal
          open={toDelete}
          onClose={() => {
            setToDelete(false);
          }}
          variant
          Icon={IconDelete}
          title="Delete Note"
          content="Are you sure you want to permanently delete this note? This action cannot be undone."
          onConfirm={handleDelete}
        />
      </>
    );
  }

  if (data && data.error) {
    return (
      <>
        <div className={styles.alternative}>
          <InfoBox>
            <p className="text-preset-5 text-color-neutral-950">
              We couldn’t find this note — it may have been deleted, or you
              might not have permission to view it. Try opening a different
              note, or{" "}
              <Link href="/login">log in with a different account</Link>.
            </p>
          </InfoBox>
        </div>
      </>
    );
  }
}
