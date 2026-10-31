import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "ProPower Electrical | Homepage redesign concept",
  description:
    "An independent homepage redesign concept for ProPower Electrical, produced by Pegasus Digital. Not the official ProPower Electrical website.",
  // No favicon was supplied with the design; an empty icon stops the /favicon.ico 404.
  icons: { icon: "data:," },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NZ" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
