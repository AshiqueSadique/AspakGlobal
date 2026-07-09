import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aspak Global Co., Ltd.",
  description: "Connecting Solutions, Creating Value",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
