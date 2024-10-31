"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Check = () => {
  const tickets = [
    "golden_ticket1.png",
    "golden_ticket2.png",
    "golden_ticket3.png",
  ];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  return (
    <motion.section
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className="max-w-7xl mx-auto w-full p-4 pb-0 md:p-6 md:pb-32 mt-[12rem]"
    >
      <div className="text-center uppercase px-4 gradient-text mb-12">
        <h1 className="uppercase text-center text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight font-bold">
          Check the pools
        </h1>
      </div>
      <div className="min-h-[40vh] place-content-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 relative after:block after:h-full after:w-full after:absolute after:content-[''] after:bg-gradient-to-t from-[#010101] via-[#010101] to-transparent shadow-0 p-6">
        {tickets.length > 0 &&
          tickets.map((ticketImg, index) => (
            <div key={index}>
              <Image
                src={`/${ticketImg}`}
                alt="pool image"
                height={"300"}
                width={"300"}
                className="mx-auto"
              />
            </div>
          ))}
        <Link href={`/pools`}>
          <div className="pool-buynow-image text-xs flex items-center justify-center h-[2rem] text-black font-semibold hover:text-white  w-full max-w-[10rem] text-center uppercase tracking-wide leading-[2rem] absolute left-[50%] translate-x-[-50%] bottom-[1.5rem] z-10">
            buy tickects now
          </div>
        </Link>
      </div>
    </motion.section>
  );
};

export default Check;
