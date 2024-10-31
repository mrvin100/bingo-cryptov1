import React, { useMemo, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

interface MeteorAnimationProps {
  triggerSpring: boolean;
}

const MeteorAnimation: React.FC<MeteorAnimationProps> = ({ triggerSpring }) => {
  const controls = useAnimation();
  const [scale, setScale] = useState(1);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const getRandomDuration = () => {
    return Math.random() * 1 + 3; // Random duration between 3 and 4 seconds
  };

  const getRandomDelay = () => {
    return 2 + Math.random(); // Random delay between 2 and 2.5 seconds
  };

  const getExitDirection = (x: string, y: string, z: string) => {
    const xNum = parseFloat(x);
    const yNum = parseFloat(y);
    const zNum = parseFloat(z);

    // Calculate the magnitude of the vector
    const magnitude = Math.sqrt(xNum * xNum + yNum * yNum + zNum * zNum);

    // Normalize the vector and scale it to create an exit point beyond the viewport
    const scale = 2;
    const exitX = (xNum / magnitude) * 100 * scale + "vw";
    const exitY = (yNum / magnitude) * 100 * scale + "vh";
    const exitZ = (zNum / magnitude) * 100 * scale + "vh";

    return { x: exitX, y: exitY, z: exitZ };
  };
  const meteorVariants = {
    initial: { x: 0, y: 0, z: 0, scale: 0.1, opacity: 0 },
    animate: (custom: any) => ({
      x: custom.x,
      y: custom.y,
      z: custom.z || 0,
      scale: custom.scale,
      opacity: 1,
      transition: {
        duration: custom.duration,
        delay: custom.delay,
        ease: "easeOut",
      },
    }),
    exit: (custom: any) => ({
      ...getExitDirection(custom.x, custom.y, custom.z || "0"),
      scale: custom.scale * 15,
      transition: {
        duration: 10,
        type: "spring",
        stiffness: 20,
        damping: 5,
        mass: 10,
      },
    }),
  };

  const meteors = useMemo(
    () => [
      {
        src: "/meteors/left_top.svg",
        custom: {
          x: "-20vw",
          y: "-30vh",
          z: "-10vh",
          duration: getRandomDuration(),
          delay: getRandomDelay(),
          rotate: "20deg",
          scale: 0.8,
        },
      },
      {
        src: "/meteors/left_top.svg",
        custom: {
          x: "-30vw",
          y: "-15vh",
          z: "-5vh",
          duration: getRandomDuration(),
          delay: getRandomDelay(),
          rotate: "0deg",
          scale: 1.1,
        },
      },
      {
        src: "/meteors/left_bottom.svg",
        custom: {
          x: "-35vw",
          y: "10vh",
          duration: getRandomDuration(),
          delay: getRandomDelay(),
          rotate: "10deg",
          scale: 0.9,
        },
      },
      {
        src: "/meteors/left_bottom.svg",
        custom: {
          x: "-30vw",
          y: "25vh",
          z: "15vh",
          duration: getRandomDuration(),
          delay: getRandomDelay(),
          rotate: "-10deg",
          scale: 1.2,
        },
      },
      {
        src: "/meteors/left_top.svg",
        custom: {
          x: "22vw",
          y: "-20vh",
          z: "-10vh",
          duration: getRandomDuration(),
          delay: getRandomDelay(),
          rotate: "120deg",
          scale: 1.1,
        },
      },
      {
        src: "/meteors/right_top.svg",
        custom: {
          x: "10vw",
          y: "-30vh",
          z: "-5vh",
          duration: getRandomDuration(),
          delay: getRandomDelay(),
          rotate: "30deg",
          scale: 0.85,
        },
      },
      {
        src: "/meteors/right_bottom.svg",
        custom: {
          x: "10vw",
          y: "20vh",
          z: "5vh",
          duration: getRandomDuration(),
          delay: getRandomDelay(),
          rotate: "10deg",
          scale: 1.0,
        },
      },
      {
        src: "/meteors/left_bottom.svg",
        custom: {
          x: "25vw",
          y: "15vh",
          z: "10vh",
          duration: getRandomDuration(),
          delay: getRandomDelay(),
          rotate: "-110deg",
          scale: 0.95,
        },
      },
    ],
    []
  );

  React.useEffect(() => {
    if (triggerSpring) {
      controls.start("exit");
    } else {
      controls.start("animate");
    }
  }, [triggerSpring, controls]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {meteors.map((meteor, index) => (
        <motion.div
          key={index}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 sm:left-1/2 sm:mr-0 sm:top-1/2 sm:transform-none size-[42px] sm:size-[180px]"
          style={{ rotate: meteor.custom.rotate }}
          variants={meteorVariants}
          initial="initial"
          animate={controls}
          custom={meteor.custom}
        >
          <Image
            src={meteor.src}
            alt={`Meteor ${index + 1}`}
            width={100}
            height={100}
            className="w-auto h-auto"
            style={{ transform: `scale(${meteor.custom.scale})` }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default MeteorAnimation;
