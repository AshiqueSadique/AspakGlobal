import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aspak Global Co., Ltd.",
  description: "Connecting Solutions, Creating Value",
  metadataBase: new URL("https://aspakglobal.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
