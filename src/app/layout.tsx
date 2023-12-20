import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eliáš Bencúr databáze filmů",
  description: "Databáze filmů - testovací zadání Meta",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="{inter.className} flex flex-col justify-center">
        <header className="flex flex-row w-full bg-mainIndigo justify-center items-center text-center self-center">
          <h1 className="text-center text-5xl py-2">
            Databáze filmů – Eliáš Bencúr
          </h1>
        </header>
        {children}
      </body>
    </html>
  );
}
