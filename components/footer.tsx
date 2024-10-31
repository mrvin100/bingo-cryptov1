"use client"
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
const Footer = () => {
const ref = useRef<HTMLDivElement>(null);
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["0 1", "1.33 1"],
});
const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1])
const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1])
  return (
    <motion.div ref={ref}  style={{
      scale: scaleProgress,
      opacity: opacityProgress,
    }}>
    <section className="max-w-7xl mx-auto w-full p-4 pb-0 md:p-6 md:pb-0 mt-24">
      <div >
        <Image
          src={"/logo_alt.svg"}
          alt="footer trophy"
          height={"200"}
          width={"200"}
          className="mx-auto"
        />
      </div>
      <p className="text-base font-light max-w-md mx-auto my-8 text-center">
      Join us today and be part of the fastest-growing crypto lottery that’s making winners every day. The next jackpot could be yours!
      </p>
      <div>
        <Image
          src={"/footer_trophy.svg"}
          alt="footer trophy"
          height={"800"}
          width={"800"}
          className="mx-auto"
        />
      </div>
    </section>
    </motion.div>
  );
};

export default Footer;
