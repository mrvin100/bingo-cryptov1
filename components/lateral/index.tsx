import React from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Draw from "../draw";

const Lateral = () => {
  return (
    <div className="">
      <div className="flex h-48 items-center justify-center"></div>
      <HorizontalScrollCarousel />
      <div className="flex h-48 items-center justify-center"></div>
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 0.6666], ["0%", "-66.66%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] w-full pt-16">
      <h1
        className="uppercase text-center font_title
                   text-6xl  md:text-6xl lg:text-7xl xl:text-8xl
                   leading-tight font-bold pt-48
                   [color:_#816A26]
                   [-webkit-text-stroke:_1px_#816A26]
                   sm:[-webkit-text-stroke:_2px_#816A26]"
      >
        THE Pools
      </h1>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Fixed light images */}
        <div className="absolute left-0 top-0 h-full w-full pointer-events-none">
          {["gold", "purple", "pink"].map((color, index) => (
            <motion.img
              key={color}
              src={`/lightpools/${color}.png`}
              alt={`${color} light`}
              className="absolute 
              -translate-x-1/4 -translate-y-1/4 
              md:-translate-x-[10rem] sm:-translate-y-[1rem]
              h-full w-auto object-contain"
              style={{
                opacity: useTransform(
                  scrollYProgress,
                  [
                    Math.max(0, (index - 1) / 3),
                    index / 3,
                    Math.min(0.6666, (index + 1) / 3),
                  ],
                  [0, 1, 0]
                ),
              }}
            />
          ))}
        </div>

        <motion.div style={{ x }} className="flex">
          {["gold", "purple", "pink"].map((id, index) => (
            <CountryWrapper
              key={id}
              id={id}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CountryWrapper: React.FC<{
  id: string;
  index: number;
  scrollYProgress: any;
}> = ({ id, index, scrollYProgress }) => {
  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, (index - 1) / 3),
      index / 3,
      Math.min(0.6666, (index + 1) / 3),
      Math.min(1, (index + 2) / 3),
    ],
    [0, 1, 1, index === 2 ? 1 : 0]
  );

  return (
    <motion.div
      className="flex-shrink-0 w-screen h-full flex items-center justify-center p-1"
      style={{ opacity }}
    >
      <Draw id={id} />
    </motion.div>
  );
};

export default Lateral;
