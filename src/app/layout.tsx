"use client";

import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("coolie-dark");
    if (stored === "true") setDark(true);
  }, []);

  const toggleDark = () => {
    setDark((d) => {
      localStorage.setItem("coolie-dark", String(!d));
      return !d;
    });
  };

  return (
    <html lang="en" className={dark ? "dark" : ""} suppressHydrationWarning>
      <head>
        <title>Coolie — Dignifying Transit, Digitizing Convenience</title>
        <meta name="description" content="Book verified railway porters in seconds. Coolie connects passengers with trained porters across 120+ Indian railway stations." />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <Navbar dark={dark} toggleDark={toggleDark} />
        {children}
      </body>
    </html>
  );
}
