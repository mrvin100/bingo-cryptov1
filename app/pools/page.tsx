"use client";

import { FC, useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

interface Pool {
  id: string;
  gains: string;
  participant: string;
  image: string;
  status: "infinity" | "billionaire";
  rotate?: string;
  price?: string; // Assurez-vous que 'price' est inclus
  index: number
}

const PoolCard:FC<Pool> = ({id, gains, participant, image, status, rotate, price, index}) => {
  const controls = useAnimation();
  const buttonControls = useAnimation(); // Pour l'animation du bouton
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [buttonText, setButtonText] = useState("buy tickets now");

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation du texte du bouton toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setButtonText((prevText) =>
        prevText === "buy tickets now"
          ? `Only ${price}`
          : "buy tickets now"
      );

      // Démarrer l'animation de tremblement
      buttonControls.start({
        x: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.6, ease: "easeInOut" },
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [buttonControls, price]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={cardVariants}
      className={clsx(
        `background-pool-${id}`,
        "grid pb-2 pt-12 m-0 h-[25rem] max-w-[22rem] mx-auto w-full rounded-md",
        index === 1 ? "scale-105" : "scale-95",
        "hover:scale-110 overflow-hidden relative"
      )}
      whileHover={{
        scale: 1.1,
        zIndex: 10,
        transition: { duration: 0.3 },
      }}
    >
      <div>
        <Image
          src={`/${image}`}
          alt="pool image"
          height={300}
          width={300}
          className={`mx-auto hover:animate-flip ${rotate}`}
        />
      </div>
      <div className="text-center uppercase tracking-wide leading-[2rem] grid grid-cols-2 font-bebas-neue">
        <div className="">
          <div className="text-2xl text-white/50">Gains</div>
          <div className="text-4xl font-extrabold gradient-text">
            {gains}
          </div>
        </div>
        <div className="">
          <div className="text-2xl text-white/50">Participant</div>
          <div className="text-4xl font-extrabold gradient-text">
            {participant}
          </div>
        </div>
      </div>
      <div className="text-center uppercase tracking-wide leading-[2rem] items-center justify-center grid grid-cols-[repeat(auto-fit,minmax(7rem,9.5rem))]">
        <Link href={`/pools/${id}`}>
          <div
            className={clsx(
              `pool-learnmore-${id}`,
              "text-sm font-bebas_neue flex items-center justify-center h-[2rem] text-white/65 hover:text-white"
            )}
          >
            learn more
          </div>
        </Link>
        {/* Bouton avec animation */}
        <motion.div
          className={clsx(
            `pool-buynow-${id}`,
            "text-sm font-bebas_neue flex items-center justify-center h-[2rem] text-black font-semibold hover:text-white"
          )}
          animate={buttonControls} // Appliquez l'animation ici
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={buttonText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <button className="px-1 py-2 text-black font-bebas_neue uppercase text-sm hover:text-white">
                {buttonText}
              </button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Pools = () => {
  const pools: Pool[] = [
    {
      id: "purple",
      gains: "$20,000",
      participant: "412/500",
      image: "golden_ticket1.png",
      status: "billionaire",
      rotate: "rotate-[-5.64deg]",
      price: "$90", // Ajoutez le prix ici
      index: 0
    },
    {
      id: "gold",
      gains: "∞",
      participant: "46/50",
      image: "golden_ticket2.png",
      status: "infinity",
      price: "$150", // Et ici
      index: 1
    },
    {
      id: "pink",
      gains: "$20,000",
      participant: "412/500",
      image: "pink_ticket.png",
      status: "billionaire",
      rotate: "rotate-[5.64deg]",
      price: "$75", // Et ici
      index: 2
    },
  ];

  return (
    <div className="min-h-screen w-full z-10">
      <div
        style={{
          background: "radial-gradient(circle, #251E10 -40%, #000000 100%)",
        }}
      >
        <section className="p-8 w-full rounded-md mx-auto gap-[3rem] flex flex-col items-center justify-center min-h-screen pools1-meteors">
          <motion.div
            className="text-center uppercase px-4 gradient-text"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1
              className="uppercase text-center text-white text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight font-bold pt-24 lg:pt-0 [color:_#816A26]
                   [-webkit-text-stroke:_1px_#816A26]
                   sm:[-webkit-text-stroke:_2px_#816A26]"
              style={{ WebkitTextStroke: "2px #816A26" }}
            >
              THE Pools
            </h1>
            <p
              className="gradient-text text-center text-[1.7rem] font-bebas-neue leading-[2.376875rem] bg-gradient-to-tl from-[#fff] to-[#DFD8BD] tracking-wide [color:_#816A26]
                   [-webkit-text-stroke:_0.5px_#816A26]
                   sm:[-webkit-text-stroke:_1px_#816A26]"
            >
              Maximize your crypto potential: pick your pool
            </p>
          </motion.div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] justify-center gap-6 sm:gap-8 items-center w-full max-w-5xl">
            {pools.length > 0 &&
              pools.map((pool) => (
                <PoolCard key={pool.id} {...pool} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Pools;
