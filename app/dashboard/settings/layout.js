import SettingsPage from "@/app/_components/settings-page/settings-page";

export const metadata = {
  title: "Settings",
};

export default function SettingsLayout({ children }) {
  return (
    <>
      <SettingsPage />
      {children}
    </>
  );
}
