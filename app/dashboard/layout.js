import "../globals.css";
import styles from "./layout.module.css";

import PortablePageHeader from "@/app/_components/portable-page-header/portable-page-header";
import BottomNavigation from "@/app/_components/bottom-navigation/bottom-navigation";
import DesktopNavigation from "@/app/_components/desktop-navigation/desktop-navigation";
import DesktopPageHeader from "@/app/_components/desktop-page-header/desktop-page-header";
import ApplicationProvider from "@/app/_lib/app/app-ctx";
import MyQueryClientProvider from "@/app/_lib/my-query-client/my-query-client";

export default function RootLayout({ children }) {
  return (
    <MyQueryClientProvider>
      <ApplicationProvider>
        <div id="modal-root" className={styles.modalRoot} />
        <ul id="toasts-root" className={styles.toastRoot} />
        <div className={styles.appRoot}>
          <div className={styles.desktopSidebar}>
            <div className={styles.desktopSidebar_panel}>
              <nav className={styles.desktopNavigation}>
                <DesktopNavigation />
              </nav>
              <aside className={styles.allTags}></aside>
            </div>
          </div>
          <header className={styles.portableHeader}>
            <PortablePageHeader />
          </header>
          <header className={styles.desktopHeader}>
            <DesktopPageHeader />
          </header>
          <main>{children}</main>
          <nav className={styles.bottomNavigation}>
            <BottomNavigation />
          </nav>
        </div>
      </ApplicationProvider>
    </MyQueryClientProvider>
  );
}
