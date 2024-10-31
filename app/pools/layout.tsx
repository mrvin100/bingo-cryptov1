import type { Metadata } from "next";
import { Space_Grotesk, Bebas_Neue } from "next/font/google";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import GridPattern from "@/components/magicui/grid-pattern";

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
          "text-white relative bg-gradient-body border-red-500 border-3"
        )}
      >
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
      </body>{" "}
    </html>
  );
}
