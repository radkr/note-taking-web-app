import NotesPage from "@/app/_components/notes-page/notes-page";

export default function NotesLayout({ children }) {
  return (
    <>
      <NotesPage />
      {children}
    </>
  );
}
