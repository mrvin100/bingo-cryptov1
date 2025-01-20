"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import ScrollToSection from "../scrollToComponent";
import { Menu } from "lucide-react";

const winnersList = [
  "CryptoWhale",
  "BlockMaster",
  "ChainBreaker",
  "HashHunter",
  "WalletWizard",
  "MetaMiner",
  "BitLord",
  "SatoshiSeeker",
  "TokenTitan",
  "GasGiant",
  "NodeNinja",
  "CoinCrusader",
  "BlockBuster",
  "HodlHero",
  "MiningMaverick",
  "LedgerLegend",
  "DeFiDynamo",
  "StakingStar",
  "AltcoinAce",
  "CryptoChad",
  "Lucky123",
  "SkyBlue",
  "NightOwl",
  "Pixel90",
  "ZenMaster",
  "FireStorm",
  "Echo77",
  "MoonWalker",
  "WaveSurfer",
  "SparkX",
  "Vortex12",
  "ZeroCool",
  "Silent88",
  "GhostRider",
  "Quantum45",
  "Luna23",
  "RedShadow",
  "Nova9",
  "Bolt5",
  "ChillVibes",
  "RainDancer",
];

const Header = () => {
  const controls = useAnimation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop();
  const [winner, setWinner] = useState({ name: "" });
  const [showGif, setShowGif] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const changeWinner = () => {
      const randomIndex = Math.floor(Math.random() * winnersList.length);
      setWinner({ name: winnersList[randomIndex] });
    };

    changeWinner();
    const winnerInterval = setInterval(changeWinner, 48 * 60 * 60 * 1000);

    return () => clearInterval(winnerInterval);
  }, []);

  useEffect(() => {
    const toggleGif = () => {
      setShowGif((prev) => !prev);
    };

    const gifInterval = setInterval(toggleGif, 4550);

    return () => clearInterval(gifInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const scrollThreshold = 50;

      if (currentScrollY > scrollThreshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const headerVariants = {
    initial: { y: 0, opacity: 1 },
    scrolled: { y: -10, opacity: 1 },
  };

  const sideContentVariants = {
    initial: { opacity: 1, y: 0 },
    scrolled: { opacity: 0, y: -50 },
  };

  const logoVariants = {
    initial: { scale: 1 },
    scrolled: { scale: isMobile ? 1 : 0.8 },
  };

  const menuBurgerVariants = {
    initial: { opacity: 0, y: 50 },
    scrolled: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.header
        className="z-[1000] fixed left-4 right-4 top-6 flex justify-center items-center gap-0 max-w-md md:max-w-xl w-full mx-auto"
        animate={isScrolled ? "scrolled" : "initial"}
        variants={headerVariants}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        initial="initial"
      >
        <motion.nav
          className="animate-fadein header-left flex items-center justify-center gap-3 sm:gap-3 h-24 w-96"
          variants={sideContentVariants}
        >
          <Link href="/about">
            <Button
              variant={"link"}
              className={clsx(
                lastSegment === "about" ? "text-[#3d0883]" : "",
                "p-0 pb-2 text-white [text-shadow:0px_4px_4px_rgba(0,_0,_0,_0.25)] text-sm md:text-lg font-bold uppercase inline-block "
              )}
            >
              <ScrollToSection targetId="hero">
                <div
                  className="hover:text-gray-300 transition-colors font-medium cursor-pointer text-[12px] sm:text-sm md:text-lg"
                  style={{ marginLeft: "40px" }}
                >
                  ABOUT
                </div>
              </ScrollToSection>
            </Button>
          </Link>
          <Link href="/pools">
            <Button
              variant={"link"}
              style={{ marginRight: "10px" }}
              className={clsx(
                lastSegment === "pools" ? "text-[#3d0883]" : "",
                "p-0 pb-2  text-white [text-shadow:0px_4px_4px_rgba(0,_0,_0,_0.25)] text-sm md:text-lg font-bold uppercase inline-block text-[12px] sm:text-sm md:text-lg"
              )}
            >
              Pools
            </Button>
          </Link>
        </motion.nav>

        <motion.div
          className={`animate-zoomin  relative flex items-center justify-center  ${
            isScrolled ? "pique-png p-6" : ""
          }`}
          variants={logoVariants}
        >
          <Link href={"/"}>
            <Image
              src={showGif ? "/coin.gif" : "/gif/frame.gif"}
              width={isMobile && isScrolled ? 200 : 140}
              height={isMobile && isScrolled ? 200 : 140}
              alt="logo image"
              className="object-cover rounded-full hover:animate-jiggle pb-2"
            />
          </Link>
          {isScrolled && (
            <motion.div
              ref={burgerRef}
              className="m-2 p-2 pb-4 rounded-full cursor-pointer"
              variants={menuBurgerVariants}
              initial="initial"
              animate="scrolled"
            >
              <Menu
                size={24}
                color="white"
                onClick={() => setMenuOpen(!menuOpen)}
              />
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="animate-fadein uppercase text-center header-right flex justify-center flex-col h-24 w-96 text-[12px] sm:text-sm md:text-lg"
          variants={sideContentVariants}
        >
          <h4 className="tracking-wide" style={{ marginRight: "30px" }}>
            Latest winner:
          </h4>
          <p
            className="gradient-text-alt font-bold"
            style={{ marginRight: "30px" }}
          >
            {winner.name}
          </p>
        </motion.div>
      </motion.header>

      {menuOpen && (
        <motion.div
          ref={menuRef}
          className="fixed bg-[#201D18] bg-opacity-[1] rounded-lg p-4 ronded-sm z-[1001]"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: -5 }}
          exit={{ opacity: 0, y: -0 }}
          style={{
            top: burgerRef.current
              ? burgerRef.current.getBoundingClientRect().bottom + 10
              : 0,
            left: burgerRef.current
              ? burgerRef.current.getBoundingClientRect().left - 50
              : 0,
          }}
        >
          <nav className="flex flex-col gap-2">
            <Link href="/about">
              <Button
                variant={"link"}
                className={clsx(
                  lastSegment === "about" ? "text-[#3d0883]" : "",
                  " text-white [text-shadow:0px_4px_4px_rgba(0,_0,_0,_0.25)] text-sm md:text-lg font-bold uppercase  "
                )}
              >
                <ScrollToSection targetId="hero">
                  <div className="hover:text-gray-300 transition-colors font-medium cursor-pointer sm:text-sm md:text-lg">
                    ABOUT
                  </div>
                </ScrollToSection>
              </Button>
            </Link>
            <Link href="/pools">
              <Button
                variant={"link"}
                className={clsx(
                  lastSegment === "pools" ? "text-[#3d0883]" : "",
                  "text-white [text-shadow:0px_4px_4px_rgba(0,_0,_0,_0.25)] text-sm md:text-lg font-bold uppercase inline-block  sm:text-sm md:text-lg"
                )}
              >
                Pools
              </Button>
            </Link>
          </nav>
        </motion.div>
      )}
    </>
  );
};

export default Header;
