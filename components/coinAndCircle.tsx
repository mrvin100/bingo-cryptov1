import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

interface CoinAndCircleProps {
  onClick: any, 
  onHoverChange: any, 
  scale: number
}

const CoinAndCircle = ({ onClick, onHoverChange, scale = 1 }:CoinAndCircleProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const controlsOuter = useAnimation();
  const controlsInner = useAnimation();
  const controlsCoin = useAnimation();

  React.useEffect(() => {
    controlsOuter.set({ scale: 4 });
    controlsInner.set({ scale: 4 });

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

  React.useEffect(() => {
    controlsCoin.start({ scale });
  }, [scale, controlsCoin]);

  const handleClick = async () => {
    await Promise.all([
      controlsOuter.start({
        scale: [0.75, 0.9, 0],
        transition: { duration: 0.6, times: [0, 0.5, 1], ease: "easeInOut" },
      }),
      controlsInner.start({
        scale: [0.65, 0.8, 0],
        transition: { duration: 0.6, times: [0, 0.5, 1], ease: "easeInOut" },
      }),
      controlsCoin.start({
        scale: [1, 1.2, 0],
        transition: {
          duration: 0.6,
          times: [0, 0.5, 1],
          ease: "easeInOut",
        },
      }),
    ]);

    onClick();
  };

  const handleHover = (hovering: boolean) => {
    setIsHovered(hovering);
    onHoverChange(hovering);
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

  return (
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
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        <motion.div className="w-full h-full" animate={controlsCoin}>
          <Image
            src="/loader/coin.png"
            alt="Gold Coin"
            layout="fill"
            objectFit="contain"
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CoinAndCircle;
