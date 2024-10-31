/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const AnimatedFooter = ({
  isHovered,
  isAnimationStart,
}: {
  isHovered: boolean;
  isAnimationStart: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(isHovered);
  const [forceFadeOut, setForceFadeOut] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      const isMobile = window.innerWidth <= 640;
      if (isMobile && !forceFadeOut) {
        setIsVisible(false);
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setIsVisible(true);
        }, 2000);
      } else if (!forceFadeOut) {
        setIsVisible(isHovered);
        if (timeoutId) clearTimeout(timeoutId);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isHovered, forceFadeOut]);

  useEffect(() => {
    if (isAnimationStart) {
      setForceFadeOut(true);
      setIsVisible(false);
    }
  }, [isAnimationStart]);

  return (
    <motion.div
      className="fixed bottom-0 transform -translate-x-1/2 p-4"
      initial={{ y: "100%", opacity: 0 }}
      animate={isVisible ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="relative w-full h-full">
        <Image
          src="/loader/footer_card.svg"
          alt="Footer Card"
          objectFit="cover"
          width={553}
          height={172}
          className="w-full sm:w-[553px] sm:h-[172px] h-[150px]"
        />

        <div className="absolute bottom-0 p-4 gap-4 left-4 flex flex-row top-2 items-center mt-8">
          <Image
            src="/logo_alt.svg"
            alt="Logo Alt"
            width={141}
            height={42}
            objectFit="contain"
            className="w-[100px] sm:w-[141px] h-[30px] sm:h-[42px]"
          />
          <p className="text-white pl-2 text-[8px] sm:text-base">
          Your crypto lottery adventure starts here. Click 'Enter' to dive into the world of Crypto Bingo and unlock incredible winning opportunities.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedFooter;
