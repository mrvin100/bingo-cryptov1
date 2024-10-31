/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowBigRight, Minus, Plus } from "lucide-react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Draw from "@/components/draw";
import GridPattern from "@/components/magicui/grid-pattern";
import Footer from "@/components/footer";

interface Pool {
  id: string;
  title: string;
  description?: string;
  gains: string;
  participant: string;
  image: string;
  status: "infinity" | "billionaire";
  rotate?: string;
  price?: string;
}

const PoolPage = () => {
  const pools: Pool[] = [
    {
      id: "purple",
      title: "the billionaire",
      description: "Step into the exclusive circle of the Billionaire Club, an elite lottery where your chances of winning are exceptionally high! With a jackpot of up to $30,000 and only 1,000 participants, this lottery gives you the opportunity to shine among a select and prestigious group. Imagine yourself on the brink of joining the ranks of winners, with a unique chance to achieve your financial dreams. We invite you to seize this once-in-a-lifetime opportunity and discover the power of your ambitions in the Billionaire Club!",
      gains: "$20,000",
      participant: "412/500",
      image: "gif/purple.gif",
      status: "billionaire",
      price: "$90",
    },
    {
      id: "gold",
      title: "the infinity",
      description: "Welcome to the Infinity Club, the ultimate lottery where possibilities are limitless! Imagine a universe without boundaries, where every ticket you purchase brings you closer to extraordinary winnings, regardless of the number of participants. Here, the only rule is to dream big. You are invited to join our community of bold dreamers ready to embrace the infinite and turn aspirations into reality. The more participants there are, the more impressive the potential prizes become, offering endless opportunities to change your life. Dive into the world of the Infinity Club and let infinity work in your favor!",
      gains: "∞",
      participant: "46/50",
      image: "gif/gold.gif",
      status: "infinity",
    },
    {
      id: "pink",
      title: "the billionaire",
      description: "Welcome to the Millionaire Club, where a jackpot of $50,000 awaits you among an exclusive group of 5,000 participants! This lottery is designed for those who aim high while enjoying reasonable chances of success. Picture yourself transforming your life with a win that could fulfill your financial aspirations. We invite you to join this dynamic community and seize the opportunity to become the next millionaire. Don’t let your chance slip away—your journey to wealth begins now in the Millionaire Club!",
      gains: "$20,000",
      participant: "412/500",
      image: "gif/pink.gif",
      rotate: "5.64deg",
      status: "billionaire",
      price: "$75",
    },
  ];
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    if (count < 99) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const segments = usePathname().split("/");
  const poolId = segments[segments.length - 1];

  const pool: Pool | undefined = pools.find((pool) => pool.id === poolId);

  const fadeIn = {
    hidden: { opacity: 0, x: 0 },
    show: { opacity: 1, transition: { duration: 2 } },
  };

  const [buttonText, setButtonText] = useState("buy tickets now");
  const buttonControls = useAnimation();

  useEffect(() => {
    if (pool && pool.id !== "gold") {
      const interval = setInterval(() => {
        setButtonText((prevText) =>
          prevText === "buy tickets now"
            ? `Only ${pool.price}`
            : "buy tickets now"
        );

        buttonControls.start({
          x: [0, -5, 5, -5, 5, 0],
          y: [1, -2, 0, 2, -1, 2, 1, 1, -1, 2, -2],
          scale: [1, 1.1, 1, 1.1, 1],
          transition: { duration: 0.6, ease: "easeInOut" },
        });
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [buttonControls, pool?.price, pool?.id]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle, #251E10 -30%, #000000 100%)",
        }}
      />
      <div
        className={clsx(
          `light_${pool?.id}`,
          "absolute inset-0 z-10 w-screen h-screen"
        )}
      />

      <div className="relative z-10  pt-16 md:pt-24 px-4 md:px-8">
        {pool ? (
          <section>
            <div className=" flex flex-col items-center justify-center px-4 md:px-8 mx-auto pools1-meteors">
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="show"
                className="text-center uppercase px-4 gradient-text mb-8 md:mb-16 flex justify-center items-center flex-col"
              >
                <h1
                  className="uppercase text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight font-bold mt-16 [color:_#816A26]
                   [-webkit-text-stroke:_1px_#816A26]
                   sm:[-webkit-text-stroke:_2px_#816A26]"
                >
                  {pool?.title} <br /> club
                </h1>
                <p className="text-lg sm:text-lg md:text-xl leading-relaxed font-normal tracking-wide mt-4">
                  Maximize your crypto potential: pick your pool
                </p>
              </motion.div>

              <div className="w-full max-w-5xl mx-auto">
                {pool && (
                  <div
                    key={pool.id}
                    className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 p-4 pb-2 pt-8 md:pt-12 mx-auto w-full rounded-md"
                  >
                    <motion.div
                      variants={fadeIn}
                      initial="hidden"
                      animate="show"
                      className="w-full md:w-1/2 flex justify-center"
                    >
                      <Image
                        src={`/${pool.image}`}
                        alt="pool image"
                        height={500}
                        width={500}
                        className="mx-auto  w-full max-w-[300px] md:max-w-full"
                        style={{ rotate: pool.rotate }}
                      />
                    </motion.div>

                    <motion.div
                      variants={fadeIn}
                      initial="hidden"
                      animate="show"
                      className="w-full md:w-1/2 text-center uppercase tracking-wide leading-[1.5rem] md:leading-[2rem]"
                    >
                      <div className="grid grid-cols-2 gap-4 my-4">
                        <div>
                          <div className="text-xl md:text-2xl text-white/50 font-bebas-neue bg-gradient-to-tl from-[#fff] to-[#DFD8BD] tracking-wide gradient-text">
                            Gains
                          </div>
                          <div className="text-4xl md:text-6xl font-bebas-neue gradient-text">
                            {pool.gains}
                          </div>
                        </div>
                        <div>
                          <div className="text-xl md:text-2xl text-white/50 font-bebas-neue bg-gradient-to-tl from-[#fff] to-[#DFD8BD] tracking-wide gradient-text">
                            Participant
                          </div>
                          <div className="text-4xl md:text-6xl font-bebas-neue gradient-text">
                            {pool.participant}
                          </div>
                        </div>
                      </div>

                      <p className="text-xs md:text-sm text-justify leading-5 p-2 md:p-4 my-2 md:my-4">
                        {pool.description}
                      </p>

                      <div className="items-center justify-center grid grid-cols-2 gap-2 md:gap-3">
                        <div
                          className={clsx(
                            `${pool.id}_learn_more`,
                            "text-lg md:text-xl flex items-center font-bebas-neue justify-center h-[2rem] text-white/65 hover:text-white w-full "
                          )}
                        >
                          {pool.id === "gold" ? (
                            <div className="flex items-center justify-between w-full">
                              <Button
                                onClick={decrementCount}
                                className="text-white bg-transparent hover:bg-transparent p-2"
                              >
                                <Minus size={20} />
                              </Button>
                              <span className="mx-2 text-2xl">{count}</span>
                              <Button
                                onClick={incrementCount}
                                className="text-white bg-transparent hover:bg-transparent p-2"
                              >
                                <Plus size={20} />
                              </Button>
                            </div>
                          ) : (
                            " 1 by WALLET"
                          )}
                        </div>

                        {pool.id === "gold" ? (
                          <div
                            className={clsx(
                              `${pool.id}_buy_now`,
                              "text-lg md:text-xl flex items-center justify-center h-[2rem] text-black  hover:text-white hover:font-semibold font-bebas-neue  "
                            )}
                          >
                            {count === 0 ? "Buy now" : `$${count * 90}`}
                          </div>
                        ) : (
                          <motion.div
                            className={clsx(
                              `${pool.id}_buy_now`,
                              "text-lg md:text-xl flex items-center justify-center  h-[2rem] text-black hover:text-white hover:font-semibold font-bebas-neue "
                            )}
                            animate={buttonControls}
                          >
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={buttonText}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                              >
                                <button className="px-4 py-2 text-black font-bebas-neue text-lg hover:text-white ">
                                  {buttonText}
                                </button>
                              </motion.div>
                            </AnimatePresence>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="show"
              className="text-center uppercase px-4 gradient-text mt-16 md:mt-24 pool-meteors"
            ></motion.div>
            <div className="pools1-meteors">
              <Draw id={pool.id} title="POOL STATS" />
            </div>
          </section>
        ) : (
          <div className="mx-auto flex flex-col items-center justify-center min-h-[80vh] p-8">
            <p className="text-3xl text-center">
              Pool not Found ! <br />
              <Link href={"/pools"}>
                <Button className="text-white" variant={"link"}>
                  Back to Pools page and buy your Ticket <ArrowBigRight />
                </Button>
              </Link>
            </p>
          </div>
        )}

        <div className="pt-7">
          <Footer />
        </div>

        <GridPattern
          width={500}
          height={500}
          x={-1}
          y={-1}
          strokeDasharray={"2 0"}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,white)] "
          )}
        />
      </div>
    </div>
  );
};

export default PoolPage;
