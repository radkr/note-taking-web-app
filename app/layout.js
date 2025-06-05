import { Inter, Noto_Sans, Source_Code_Pro } from "next/font/google";
import "./globals.css";

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
  title: {
    template: "%s | Notes",
    default: "Notes", // a default is required when creating a template
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${interSansSerif.variable} ${notoSans.variable}  ${sourceCodeProMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
