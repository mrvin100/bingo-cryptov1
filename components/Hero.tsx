"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const Hero = () => {
  const [count, setCount] = useState({ rounds: 0, participants: 0, gains: 0 });
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      const interval = setInterval(() => {
        setCount((prev) => ({
          rounds: Math.min(prev.rounds + 1, 8),
          participants: Math.min(prev.participants + 100, 3449),
          gains: Math.min(prev.gains + 5000, 180000),
        }));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [inView, controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const heroDatas = [
    { label: "Number of rounds", value: count.rounds },
    { label: "Total Participants", value: count.participants },
    { label: "Total gains", value: `$${count.gains.toLocaleString()}` },
  ];

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      id="hero"
      animate={controls}
      variants={containerVariants}
      className="hero-coins mobile-hero-coins w-full mx-auto  flex flex-col items-center justify-center min-h-[100vh] p-8 pt-[10rem] sm:pt-4"
    >
      <motion.div
        variants={itemVariants}
        className="text-center uppercase -top-[10px] gradient-text"
      >
        <h1
          className="uppercase text-center text-white text-[48px] pb-4 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight font-bold [color:_#816A26]
                   [-webkit-text-stroke:_1px_#816A26]
                   sm:[-webkit-text-stroke:_2px_#816A26]"
        >
          What&apos;s Bingo <br />
          Crypto ?
        </h1>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="relative  rounded-md background-about-image ms:h-[32rem] p-4 md:pt-16"
      >
        <div className="px-4 pt-16 sm:pt-0 flex justify-center flex-col items-center gap-6 text-center md:text-left md:flex-row md:justify-between md:gap-12">
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center"
          >
            <Image
              src="/logo_alt.svg"
              alt="logo alt"
              width={250}
              height={250}
              className="object-contain"
            />
          </motion.div>
          <div className="space-y-4 w-full max-w-lg">
            <motion.span
              variants={itemVariants}
              className="block uppercase text-lg md:text-xl text-purple-300"
              id="hero"
            >
              We&apos;re not a casino
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="uppercase text-xl md:text-2xl font-bold text-white"
            >
              A fair way to gamble
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base text-gray-300"
              id="hero"
            >
              Bingo Crypto offers a unique and transparent gambling experience.
              Our platform leverages blockchain technology to ensure fairness
              and provide equal opportunities for all participants.
            </motion.p>
          </div>
        </div>
        <Separator className="my-6 bg-purple-500 w-[99.5%] mx-auto" />
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-6"
        >
          {heroDatas.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <h3 className="uppercase my-2 text-sm text-purple-300">
                {item.label}
              </h3>
              <p className="text-xl md:text-2xl font-bold text-white">
                {item.value}
              </p>
            </motion.div>
          ))}
        </motion.div>
        <Link href={`/pools`}>
          <div className="pool-buynow-purple scale-x-[1.2] sm:scale-x-1 scale-[1.2]  sm:scale-1  text-xl flex items-center font-bebas-neue   justify-center h-[2rem] text-black  hover:text-white  w-full max-w-[10rem] text-center uppercase tracking-wide leading-[2rem] absolute left-[47%] sm:left-[48.5%] translate-x-[-50%] bottom-[-2rem] sm:bottom-[-1.4rem]">
            buy tickets now
          </div>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
