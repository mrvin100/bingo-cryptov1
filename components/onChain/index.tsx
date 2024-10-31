/* eslint-disable react/no-unescaped-entities */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { BorderBeam } from "../../components/magicui/border-beam";

const OnChain = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Section entière
  const opacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.8, 0.9],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.8, 0.9],
    [50, 0, 0, -50]
  );

  // Texte - apparaît en premier
  const textOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.75, 0.85],
    [0, 1, 1, 0]
  );
  const textY = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.75, 0.85],
    [20, 0, 0, -20]
  );

  // Bouton gauche - apparaît en deuxième
  const leftButtonOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.7, 0.8],
    [0, 1, 1, 0]
  );
  const leftButtonX = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.7, 0.8],
    [-50, 0, 0, 0]
  );

  // Bouton droit - apparaît en dernier
  const rightButtonOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.65, 0.75],
    [0, 1, 1, 0]
  );
  const rightButtonX = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.65, 0.75],
    [50, 0, 0, 0]
  );

  return (
    <motion.section
      ref={containerRef}
      className="max-w-7xl mx-auto w-full p-4 md:p-6 mt-24 relative min-h-[80vh] sm:min-h-[100vh] z-1 top-16"
      style={{ opacity, y }}
    >
      <div className="text-center uppercase gradient-text mb-8 md:mb-12">
        <h1
          className="text-white text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight font-bold [color:_#816A26]
                   [-webkit-text-stroke:_1px_#816A26]
                   sm:[-webkit-text-stroke:_2px_#816A26]"
        >
          ON-CHAIN INFOS
        </h1>
      </div>
      <section className="w-full flex items-center justify-center">
        <div className="on-chain relative rounded-[20px] h-[30rem] items-center w-[55rem] sm:h-[30rem]">
          <BorderBeam delay={0.1} duration={15} />
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 pt-8 sm:p-16 md:p-24 lg:p-32">
            <motion.div className="text-center w-full">
              <motion.h2
                className="text-white text-xl md:text-xl lg:text-2xl font-space-grotesk mb-6 mt-4"
                style={{ opacity: textOpacity, y: textY }}
              >
                All the details of each draw and transaction are available to those who wish to learn more. Our litepaper provides an in-depth explanation of how we ensure fairness and security at every step. Need more information? Feel free to consult our litepaper or contact us via the provided address.
              </motion.h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.div
                  style={{ x: leftButtonX, opacity: leftButtonOpacity }}
                >
                  <Link href="/learn-more">
                    <motion.button
                      className="bg-gradient-to-r from-[#DABB60] via-[#957925] to-[#DABB60] text-xl md:text-2xl lg:text-4xl text-black font-bebas-neue py-2 sm:py-3 px-6 sm:px-8 rounded-[20px] hover:bg-yellow-500 flex items-center gap-4 w-full sm:w-auto"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src="/icons/paper.svg"
                        alt="Paper icon"
                        width={32}
                        height={32}
                        className="w-8 h-8 sm:w-10 sm:h-10"
                      />
                      LITEPAPER
                    </motion.button>
                  </Link>
                </motion.div>
                <motion.div
                  style={{ x: rightButtonX, opacity: rightButtonOpacity }}
                >
                  <Link href="/get-started">
                    <motion.button
                      className="bg-gradient-to-r from-[#DABB60] via-[#957925] to-[#DABB60] text-xl md:text-2xl lg:text-4xl font-bebas-neue text-transparent bg-clip-text border-4 border-[#DABB60] py-2 px-6 sm:px-6 rounded-[20px] flex items-center gap-4 w-full sm:w-auto"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src="/icons/contact.svg"
                        alt="Contact icon"
                        width={32}
                        height={32}
                        className="w-8 h-8 sm:w-10 sm:h-10"
                      />
                      CONTACT ADDRESS
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.section>
  );
};

export default OnChain;
