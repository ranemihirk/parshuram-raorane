import React from "react";
import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./../styles/globals.css";
import DefaultContextProvider from "@/contexts/DefaultContext";
import DataContextProvider from "@/contexts/DataContext";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Parshuram Raorane",
  description: "Parshuram Raorane",
  icons: {
    icon: "/assets/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className="select-none text-[14px] py-10">
        <DefaultContextProvider>
          <DataContextProvider>{children}</DataContextProvider>
        </DefaultContextProvider>
      </body>
    </html>
  );
}
