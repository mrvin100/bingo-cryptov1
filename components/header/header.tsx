"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "../../app/variants";

const NavLinks = [
  // { href: "/", name: "Home" },
  { href: "about", name: "About" },
  { href: "pools", name: "Pools" },
];

const winner = {
  name: "Big Dev $702",
};

const Header = () => {
  const pathname = usePathname();
  const path = pathname.split("/");
  const lastSegment = path[path.length - 1];

  return (
    <header className="z-10 absolute left-4 right-4 top-6 flex justify-center items-center gap-0 max-w-md md:max-w-xl w-full my-8 mx-auto">
      <motion.nav
        className="animate-fadein header-left flex items-center justify-center gap-3 h-24 w-96"
        // variants={fadeIn("right", 0.2)}
        // initial="hidden"
        // whileInView={"show"}
        // viewport={{ once: false, amount: 0.7 }}
      >
        {NavLinks.map((navLink) => (
          <Link key={navLink.name} href={`/${navLink.href}`}>
            <Button
              variant={"link"}
              className={clsx(
                lastSegment == navLink.href ? "text-[#3d0883]" : "",
                "p-0 text-white [text-shadow:0px_4px_4px_rgba(0,_0,_0,_0.25)] text-sm md:text-lg font-bold uppercase inline-block"
              )}
            >
              {navLink.name}
            </Button>
          </Link>
        ))}
      </motion.nav>
      <motion.div
        // variants={fadeIn("down", 0.2)}
        // initial="hidden"
        // whileInView={"show"}
        // viewport={{ once: false, amount: 0.7 }}
        className="animate-zoomin"
      >
        <Link href={"/"} className="">
          <Image
            src={"/coin.gif"}
            width={"250"}
            height={"250"}
            alt="logo image"
            className="object-cover rounded-full hover:animate-jiggle"
          />
        </Link>
      </motion.div>
      <motion.div
        className="animate-fadein uppercase text-center header-right flex items-center justify-center flex-col  h-24 w-96"
        // variants={fadeIn("left", 0.2)}
        // initial="hidden"
        // whileInView={"show"}
        // viewport={{ once: false, amount: 0.7 }}
      >
        <h4 className="text-xs tracking-wide">Latest winner:</h4>
        <p className="gradient-text-alt font-bold">{winner.name}</p>
      </motion.div>
    </header>
  );
};

export default Header;
