/* eslint-disable react/no-unescaped-entities */
"use client";

import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Navbar from "./navbar";
import Image from "next/image";
import Roadmap from "./roadmap";
import ProgressBar from "../components/progressBar";
import TransitionComponent from "@/components/transition";
import Timer from "@/components/timer";
import MeteorAnimation from "@/components/meteors";
interface HomePageProps {
  children: React.ReactNode;
}

const HomePage: React.FC<HomePageProps> = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 23,
    minutes: 59,
    seconds: 54,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const meteorsRef = useRef(null);
  const coinsRef = useRef(null);
  const [stage, setStage] = useState("initial");
  const [contentVisible, setContentVisible] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [buttonText, setButtonText] = useState("Buy tickets now");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (stage === "almostComplete") {
      setContentVisible(true);
    }
  }, [stage]);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setButtonText((prevText) =>
        prevText === "Buy tickets now" ? "Only 90$" : "Buy tickets now"
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (stage === "animationComplete") {
      setContentVisible(true);
    }
  }, [stage]);

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return {
            ...prevTime,
            hours: prevTime.hours - 1,
            minutes: 59,
            seconds: 59,
          };
        } else if (prevTime.days > 0) {
          return {
            ...prevTime,
            days: prevTime.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        } else {
          clearInterval(timer);
          return prevTime;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const containerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        staggerChildren: 0.3,
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const childVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const meteorsAnimation = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeOut",
        onComplete: () => setIsAnimationComplete(true),
      },
    },
  };

  const coinsAnimation = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: isMobile ? 1.4 : 1,
      y: isMobile ? "-10%" : 0,
      x: isMobile ? "5%" : 0,
      opacity: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };
  const toplightAnimation = {
    initial: { y: "0%", opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      controls.start({
        x: [1, -1, -3, 3, 1, -1, -3, 3, -1, 1, 1],
        y: [1, -2, 0, 2, -1, 2, 1, 1, -1, 2, -2],
        scale: [1, 1.02, 1.04, 1.06, 1.08, 1.1, 1.08, 1.06, 1.04, 1.02, 1],
        transition: { duration: 1, ease: "easeInOut" },
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [controls]);

  return (
    <div className="min-h-screen w-full">
      <div
        className="min-h-screen"
        style={{
          background: "radial-gradient(circle, #251E10 -50%, #000000 100%)",
        }}
      >
        <div
          className="relative h-screen overflow-hidden"
          style={{
            background: "radial-gradient(circle, #251E10 -40%, #000000 100%)",
          }}
        >
          <TransitionComponent setStage={setStage} startAnimation={true}>
            {contentVisible && (
              <>
                {" "}
                <motion.div
                  className="absolute top-0 left-0 w-full h-[30vh] z-1 pointer-events-none "
                  variants={toplightAnimation}
                  initial="initial"
                  animate="animate"
                >
                  <Image
                    src="/toplight.png"
                    alt="Top Light"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-70"
                  />
                </motion.div>
                <AnimatePresence></AnimatePresence>
                <div className="absolute inset-0"></div>
                <motion.div
                  className={cn(
                    "absolute inset-0 z-10 pointer-events-none",
                    isMobile ? "h-screen w-screen" : ""
                  )}
                  ref={meteorsRef}
                  variants={meteorsAnimation}
                  initial="initial"
                  animate="animate"
                  style={{
                    transform: `translate(${mousePosition.x * -0.02}px, ${
                      mousePosition.y * -0.02
                    }px)`,
                  }}
                >
                  <div
                    className={cn(
                      "relative w-full h-full",
                      isMobile ? "mb-0 top-16" : "mb-[1rem] md:mb-0"
                    )}
                  >
                    <Image
                      src={
                        isMobile ? "/meteors-mobile.png" : "/home_meteors.png"
                      }
                      alt="Meteors"
                      layout="fill"
                      objectFit={isMobile ? "contain" : "contain"}
                      className={cn(
                        "z-10",
                        isMobile
                          ? "w-full h-full  opacity-70"
                          : "w-full h-full scale-75 opacity-70"
                      )}
                    />
                  </div>
                </motion.div>
                <motion.div
                  className={cn(
                    "absolute inset-0 z-20 pointer-events-none",
                    isMobile ? "h-screen w-screen" : "mb-[13rem] md:mb-0"
                  )}
                  ref={coinsRef}
                  variants={coinsAnimation}
                  initial="initial"
                  animate="animate"
                  style={{
                    transform: `40px, ${mousePosition.y * 0.01}px)`,
                  }}
                >
                  <div
                    className={cn(
                      "relative w-full h-full",
                      isMobile ? "mb-10 top-16 " : "mb-[1rem] md:mb-0"
                    )}
                    style={{ zIndex: 20 }}
                  >
                    <Image
                      src={isMobile ? "/coin-mobile.png" : "/home_coins.png"}
                      alt="Coins"
                      layout="fill"
                      objectFit={isMobile ? "contain" : "contain"}
                      className={cn(
                        "z-10",
                        isMobile
                          ? "w-full h-full  scale-[1.0] "
                          : "w-full h-full"
                      )}
                    />
                  </div>
                </motion.div>
                <motion.div
                  className="relative z-10 w-full h-full mb-4"
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                >
                  <motion.section className=" w-full h-full rounded-md mx-auto   sm:gap-[3.75rem] flex flex-col items-center justify-center pb-0">
                    <motion.div
                      className="text-center uppercase px-4 gradient-text"
                      variants={childVariants}
                      style={{ fontWeight: 1000 }}
                    >
                      <h1
                        className="uppercase text-center text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl  font-bold [color:_#816A26]
                   [-webkit-text-stroke:_1px_#816A26]
                   sm:[-webkit-text-stroke:_2px_#816A26]"
                      >
                        THE <br />
                        CRYPTO Lottery
                      </h1>
                      <p
                        className="text-2xl sm:text-3xl md:text-4xl leading-relaxed font-normal font-betracking-wide sm:mt-4 font-bebas-neue"
                        style={{ WebkitTextStroke: "1px #816A26" }}
                      >
                        It's your turn, go ahead and enter the pool
                      </p>
                    </motion.div>
                    <motion.div
                      className=" sm:mt-0 relative background-home-image w-full max-w-[42rem] h-[20rem] md:max-w-[44rem] md:h-[24rem] uppercase pt-5 pb-4 "
                      variants={childVariants}
                    >
                      <div className="sm:h-[40px] h-6 sm:h-10"></div>
                      <h2 className="absolute left-0 right-0 top-[10px] gradient-text text-center text-2xl sm:text-[2.4rem] font-bebas-neue leading-[2.376875rem] bg-gradient-to-tl from-[#fff] to-[#DFD8BD] tracking-wide">
                        <div
                          className="pt-4 sm:pt-2"
                          style={{ WebkitTextStroke: "1px #816A26" }}
                        >
                          MAIN POOL PRIZE
                        </div>
                      </h2>

                      <div className="px-12 pt-2  sm:pt-0 sm:px-40 ">
                        <ProgressBar
                          id="gold"
                          currentAmount={89000}
                          maxAmount={130000}
                        />
                      </div>
                      <div className="px-[4rem]  sm:px-[9rem] md:px-36">
                        <Timer id="gold" />
                      </div>

                      

                      <div className="animated-button-container w-full scale-[0.75]   sm:-top-2 md:top-[20rem] hover:scale-[0.80] md:scale-100 max-w-[19rem] h-[3.5rem] md:hover:scale-105 ease-in relative mt-8 md:mt-0 md:absolute bottom-0 left-[51%] translate-x-[-50%] cursor-pointer">
                        <Link href="/pools">
                          <motion.div
                            className="background-button-image  grid items-center h-full w-full font-bebas-neue text-center text-black hover:text-white hover:transition-all text-2xl md:text-4xl mt-1 leading-[3.5rem] tracking-wide"
                            animate={controls}
                          >
                            <AnimatePresence mode="wait">
                              <motion.button
                                key={buttonText}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="px-4 py-2  text-black font-bebas-neue text-4xl md:text-4xl hover:text-white"
                              >
                                {buttonText}
                              </motion.button>
                            </AnimatePresence>
                          </motion.div>
                        </Link>
                      </div>
                    </motion.div>
                  </motion.section>{" "}
                </motion.div>
              </>
            )}{" "}
          </TransitionComponent>{" "}
        </div>{" "}
        <div className="relative">
          {contentVisible && <Navbar />}
          {children}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
