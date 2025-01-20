// import type { Metadata } from "next";
import { Space_Grotesk, Bebas_Neue } from "next/font/google";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import GridPattern from "@/components/magicui/grid-pattern";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AnimatePresence>
        <Navbar key="navbar" />
      </AnimatePresence>
      <GridPattern
        width={500}
        height={500}
        x={-1}
        y={-1}
        strokeDasharray={"2 0"}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,white)] "
        )}
      />
      {children}
    </>
  );
}
