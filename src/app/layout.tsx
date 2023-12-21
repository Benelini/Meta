import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";
import Favorites from "./components/svgs/favorites";

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
        <header className="flex flex-row w-full bg-mainIndigo items-center  justify-center text-center self-center">
          <Link
            href="/"
            className="text-center text-5xl py-2 max-sm:text-3xl max-md:text-3xl"
          >
            Databáze filmů
          </Link>
          <Link href="/favorites" className="absolute right-4">
            <Favorites className="fill-white max-md:w-7 max-md:h-7" />
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
