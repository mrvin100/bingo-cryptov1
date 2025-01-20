import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useAnimationPage as useAnimationContext } from "@/context/AnimationContext";

interface HomePageProps {
  children: React.ReactNode;
  startAnimation: boolean;
  setStage: (stage: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({
  children,
  startAnimation,
  setStage,
}) => {
  const controls = useAnimation();
  const { playAnimation } = useAnimationContext();

  const assets = useMemo(
    () => [
      "/golden_ticket1.png",
      "/golden_ticket2.png",
      "/golden_ticket3.png",
      "/coin1.svg",
      "/coin2.svg",
    ],
    []
  );

  const [assetElements] = useState(() => generateAssets());

  useEffect(() => {
    console.log("startAnimation", startAnimation);
    if (startAnimation) {
      if (playAnimation) {
        controls.start("visible").then(() => {
          setStage("animationComplete");
        });
      } else {
        controls.set("visible");
        setStage("animationComplete");
      }
    }
  }, [startAnimation, controls, setStage, playAnimation]);

  const containerVariants = {
    hidden: { opacity: 0.1, scale: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: playAnimation ? 5 : 0,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  function generateAssets(): React.ReactNode[] {
    const allAssets: React.ReactNode[] = [];
    assets.forEach((asset) => {
      allAssets.push(...createAssets(30, asset));
    });
    return allAssets;
  }

  function createAssets(count: number, assetSrc: string): React.ReactNode[] {
    return Array.from({ length: count }).map((_, index) => {
      const zIndex = Math.floor(Math.random() * 20);
      const color = Math.random() > 0.5 ? "#8A60E1" : "#DABB60"; // Purple or gold stars
      const positionX = `${Math.random() * 100}%`;
      const positionY = `${Math.random() * 100}%`;

      return (
        <div
          key={`${assetSrc}-${index}`}
          className="absolute"
          style={{ left: positionX, top: positionY, zIndex }}
        >
          {startAnimation && playAnimation ? (
            <motion.div
              initial={{
                scale: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0 + 0.3,
                rotate: 0,
              }}
              animate={{
                scale: 0,
                opacity: 1,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 5,
                ease: "easeInOut",
              }}
            >
              <Image
                src={assetSrc}
                alt={`Asset ${index}`}
                width={30}
                height={30}
                className="object-contain"
              />
            </motion.div>
          ) : null}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              backgroundColor: color,
              borderRadius: "50%",
              width: "2px",
              height: "2px",
              zIndex: -1,
            }}
            initial={
              startAnimation && playAnimation
                ? { opacity: 0, scale: 0 }
                : { opacity: 1, scale: 1 }
            }
            animate={
              startAnimation && playAnimation
                ? {
                    opacity: [0, 1],
                    scale: [0, 1],
                  }
                : {}
            }
            transition={
              startAnimation && playAnimation
                ? {
                    duration: 5,
                    ease: "easeInOut",
                  }
                : {}
            }
          />
        </div>
      );
    });
  }

  const handleUpdate = (latest: any) => {
    if (playAnimation && latest.scale <= 2) {
      setStage("almostComplete");
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden perspective-1000">
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-0"
          style={{
            width: "150%",
            height: "150%",
            left: "-25%",
            top: "-25%",
            transformStyle: "preserve-3d",
          }}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          onUpdate={handleUpdate}
        >
          {assetElements}
        </motion.div>
      </AnimatePresence>
      <div className="relative z-10">
        <div className="flex flex-1 pt-36 md:pt-84">{children}</div>
      </div>
    </div>
  );
};

export default HomePage;
