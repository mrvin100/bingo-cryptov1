import type { Metadata } from "next";
import { Space_Grotesk, Bebas_Neue } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Header from "@/components/header/header";
import { cn } from "@/lib/utils";
import GridPattern from "@/components/magicui/grid-pattern";
import { AnimationProvider } from "@/context/AnimationContext";
import Navbar from "@/components/navbar";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const bebas_neue = Bebas_Neue({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-bebas-neue",
});

export const metadata: Metadata = {
  title: "Bingo Crypto",
  description: "Crypto Lottery Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={clsx(space_grotesk.variable, bebas_neue.variable)}
    >
      <body
        className={clsx(
          space_grotesk.className,
          "text-white  bg-gradient-body"
        )}
        style={{
          background: "radial-gradient(circle, #251E10 -40%, #000000 100%)",
        }}
      >
        <div className=" z-10">
          {" "}
          <AnimationProvider>{children}</AnimationProvider>
        </div>
      </body>
    </html>
  );
}
