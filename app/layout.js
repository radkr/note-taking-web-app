import { Inter, Noto_Sans, Source_Code_Pro } from "next/font/google";
import "./globals.css";

import PortablePageHeader from "@/app/_components/portable-page-header/portable-page-header";
import BottomNavigation, {
  HOME,
} from "@/app/_components/bottom-navigation/bottom-navigation";

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
        <header>
          <PortablePageHeader />
        </header>
        <main>{children}</main>
        <nav>
          <BottomNavigation select={HOME} />
        </nav>
      </body>
    </html>
  );
}
