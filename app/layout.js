import { Inter, Noto_Sans, Source_Code_Pro } from "next/font/google";
import "./globals.css";

import PortablePageHeader from "@/app/_components/portable-page-header/portable-page-header";
import BottomNavigation from "@/app/_components/bottom-navigation/bottom-navigation";
import DesktopNavigation from "@/app/_components/desktop-navigation/desktop-navigation";
import DesktopPageHeader from "@/app/_components/desktop-page-header/desktop-page-header";
import ApplicationProvider, { HOME } from "@/app/_lib/application";

const interSansSerif = Inter({
  variable: "--font-inter-sans-serif",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const sourceCodeProMono = Source_Code_Pro({
  variable: "--font-source-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Frontend Mentor | Note-taking web app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dar">
      <body
        className={`${interSansSerif.variable} ${notoSans.variable}  ${sourceCodeProMono.variable}`}
      >
        <ApplicationProvider>
          <div className="desktop-sidebar">
            <div className="desktop-sidebar_panel">
              <nav className="desktop-navigation">
                <DesktopNavigation />
              </nav>
              <aside className="all-tags"></aside>
            </div>
          </div>
          <header className="portable-header">
            <PortablePageHeader />
          </header>
          <header className="desktop-header">
            <DesktopPageHeader />
          </header>
          <main>{children}</main>
          <nav className="bottom-navigation">
            <BottomNavigation select={HOME} />
          </nav>
        </ApplicationProvider>
      </body>
    </html>
  );
}
