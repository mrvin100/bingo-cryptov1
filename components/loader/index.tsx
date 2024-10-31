/** @format */

import React, { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";
import MeteorAnimation from "@/components/meteors";
import AnimatedFooter from "../footerLoader";
import Meteors from "@/components/magicui/meteors";
import GridPattern from "../magicui/grid-pattern";
import { METHODS } from "http";
import { useAnimationPage } from "@/context/AnimationContext";

const Loader = ({
  onClick,
  onAnimationComplete,
}: {
  onClick: () => void;
  onAnimationComplete: () => void;
}) => {
  const { setPlayAnimation } = useAnimationPage();
  const [showGoldCoin, setShowGoldCoin] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const controlsOuter = useAnimation();
  const controlsInner = useAnimation();
  const purpleLightControls = useAnimation();
  const controlsCoin = useAnimation();
  const logoControls = useAnimation();
  const [meteorsExiting, setMeteorsExiting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    controlsOuter.set({ scale: 4 });
    controlsInner.set({ scale: 4 });
    document.body.style.overflow = "hidden";

    logoControls.start({
      y: "100px",
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    });

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [controlsOuter, controlsInner, logoControls]);

  useEffect(() => {
    const sequence = async () => {
      await Promise.all([
        controlsOuter.start({
          scale: 1.5,
          transition: {
            duration: 3,
            ease: "easeInOut",
            type: "spring",
            stiffness: 100,
            damping: 15,
          },
        }),
        controlsInner.start({
          scale: 1.3,
          transition: {
            duration: 3,
            ease: "easeInOut",
            type: "spring",
            stiffness: 100,
            damping: 15,
          },
        }),
      ]);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await Promise.all([
        controlsOuter.start({
          scale: 0.75,
          transition: {
            duration: 1,
            ease: "easeOut",
            delay: 0.2,
            type: "spring",
            stiffness: 120,
            damping: 15,
          },
        }),
        controlsInner.start({
          scale: 0.65,
          transition: {
            duration: 1,
            ease: "easeOut",
            type: "spring",
            stiffness: 200,
            damping: 15,
          },
        }),
      ]);
    };
    sequence();
  }, [controlsOuter, controlsInner]);

  const handleEnterClick = async () => {
    setIsExiting(true);
    setMeteorsExiting(true);
    setPlayAnimation(true);

    purpleLightControls.start({
      opacity: 0,
      transition: { duration: 1, ease: "easeOut" },
    });

    await Promise.all([
      controlsOuter.start({
        scale: [1, 1.15, 1],
        transition: { duration: 0.6, times: [0, 0.5, 1], ease: "easeInOut" },
      }),
      controlsInner.start({
        scale: [0.9, 1.05, 0.9],
        transition: { duration: 0.6, times: [0, 0.5, 1], ease: "easeInOut" },
      }),
      controlsCoin.start({
        scale: [1, 1.15, 1.2],
        transition: {
          duration: 0.6,
          times: [0, 0.5, 1],
          ease: "easeInOut",
          type: "spring",
        },
      }),
    ]);

    await Promise.all([
      controlsOuter.start({
        scale: 5,
        opacity: 0,
        transition: { duration: 0.7, ease: "easeInOut" },
      }),
      controlsInner.start({
        scale: 5,
        opacity: 0,
        transition: { duration: 0.7, ease: "easeInOut", delay: 0.1 },
      }),
      controlsCoin.start({
        scale: 0,
        opacity: 0,
        transition: { duration: 0.85, ease: "easeInOut", delay: 0.2 },
      }),
    ]);
    onClick();

    onAnimationComplete();
  };

  const coinVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
        type: "spring",
        stiffness: 200,
        delay: 1,
      },
    },
  };

  const logoVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.5,
        delay: 3,
        ease: "easeOut",
        type: "spring",
        stiffness: 50,
      },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: {
        duration: 1,
        ease: "easeIn",
      },
    },
  };

  useEffect(() => {
    if (isExiting) {
      setIsHovered(false);
    }
  }, [isExiting, isHovered]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center overflow-hidden"
        exit={{ opacity: 0 }}
        style={{
          background: "radial-gradient(circle,  #251E10 -40%, #000000 100%)",
        }}
      >
        <motion.div
          className="absolute top-0 right-1/5 w-full h-full pointer-events-none"
          animate={purpleLightControls}
          initial={{ opacity: 0.5 }}
        >
          <Image
            src="/light_purple.png"
            alt="Purple Light"
            layout="fill"
            objectFit="fill"
            className="sm:opacity-50"
          />
        </motion.div>
        <motion.div
          className="absolute top-0 transform translate-x-1/2 flex justify-center items-center w-1/3 sm:w-full pt-8"
          variants={logoVariants}
          initial="hidden"
          animate={isExiting ? "exit" : "visible"}
        >
          <Image
            src="/logo_alt.svg"
            alt="Bingo Logo"
            width={200}
            height={100}
            objectFit="contain"
          />
        </motion.div>
        <div className="relative w-full h-full sm:max-w-[600px] sm:max-h-[600px] max-w-[300px] max-h-[300px] flex items-center justify-center">
          <motion.div
            className="absolute w-full h-full"
            initial={{ scale: 10 }}
            animate={controlsOuter}
          >
            <motion.div
              className="w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              <Image
                src="/loader/bingo_text.svg"
                alt="Bingo Text"
                layout="fill"
                objectFit="contain"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute w-full h-full"
            initial={{ scale: 9 }}
            animate={controlsInner}
          >
            <motion.div
              className="w-full h-full"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              <Image
                src="/loader/test.png"
                alt="Way Text"
                layout="fill"
                objectFit="contain"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="relative z-10 w-1/2 h-1/2"
            variants={coinVariants}
            initial="initial"
            animate="animate"
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div className="w-full h-full" animate={controlsCoin}>
              <Image
                src="/loader/coin.png"
                alt="Gold Coin"
                layout="fill"
                objectFit="contain"
                onClick={handleEnterClick}
                style={{ cursor: "pointer" }}
              />
            </motion.div>
          </motion.div>
        </div>

        <MeteorAnimation triggerSpring={meteorsExiting} />
        <AnimatedFooter isHovered={isHovered} isAnimationStart={isExiting} />
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;
