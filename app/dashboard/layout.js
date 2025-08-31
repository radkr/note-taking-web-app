import "../globals.css";
import styles from "./layout.module.css";
import { Suspense } from "react";

import Sidebar from "@/app/_components/sidebar/sidebar";
import PortablePageHeader from "@/app/_components/portable-page-header/portable-page-header";
import BottomNavigation from "@/app/_components/bottom-navigation/bottom-navigation";
import DesktopPageHeader from "@/app/_components/desktop-page-header/desktop-page-header";
import ApplicationProvider from "@/app/_lib/app/app-ctx";
import MyQueryClientProvider from "@/app/_lib/my-query-client/my-query-client";

export default function RootLayout({ children }) {
  return (
    <MyQueryClientProvider>
      <ApplicationProvider>
        <div id="modal-root" className={styles.modalRoot} />
        <ul id="toasts-root" className={styles.toastRoot} />
        <Suspense>
          <div className={styles.appRoot}>
            <header className={styles.portableHeader}>
              <PortablePageHeader />
            </header>
            <Sidebar />
            <header className={styles.desktopHeader}>
              <DesktopPageHeader />
            </header>
            <main className={styles.main}>{children}</main>
            <nav className={styles.bottomNavigation}>
              <BottomNavigation />
            </nav>
          </div>
        </Suspense>
      </ApplicationProvider>
    </MyQueryClientProvider>
  );
}
