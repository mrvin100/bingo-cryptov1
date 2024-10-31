import React, { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const Roadmap = () => {
  const roadmap = [
    {
      id: "2",
      start: "2",
      title: "Explosive Beginnings",
      description:
        "Design & Development (January 2021 - March 2021) At the start of 2021, we laid the foundations for something truly game-changing. Our team developed a cutting-edge smart contract ensuring fairness, transparency, and security for all players. Legal frameworks were put in place, setting the stage for what would soon become the fastest-growing crypto lottery platform on the market.",
    },
    {
      id: "3",
      start: "1",
      title: "Beta Launch",
      description:
        "Early Success (April 2021 - June 2021) By April 2021, we launched our beta platform, and the response was overwhelming! Thousands of players joined our exclusive beta, putting our system to the test.With valuable feedback from early adopters, we refined the platform, making it even more exciting and rewarding.Our community was already growing by 200% month - over - month!",
    },
    {
      id: "4",
      title: "Public Launch",
      start: "2",
      description:
        "A Phenomenal Rise (July 2021 - September 2021) In July 2021, we opened the doors to everyone, and the public launch was an instant hit! Players from over 50 countries joined the action, with participation increasing by 300% in just the first two months. The integration of multiple cryptocurrencies added even more excitement, giving players more ways to win big. Our jackpots started to grow, with winners taking home prizes in the millions!",
    },
    {
      id: "1",
      title: "Expansion & Unstoppable Growth",
      start: "1",
      description:
        "(October 2021 - October 2023) From October 2021 to today, we’ve expanded like wildfire! Our player base has multiplied, and we’ve launched new features like special draws and massive progressive jackpots. We’ve gone global, localizing in multiple languages, and now our platform is used by millions worldwide. With every draw, the prize pools get bigger, and the opportunities to win life-changing rewards keep skyrocketing!",
    },
  ];

  const containerRef = useRef(null);
  const bulletsRef = useRef([]);
  const progressBarRef = useRef(null);
  const [activeBullets, setActiveBullets] = useState([]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (bulletsRef.current && progressBarRef.current) {
        const progressBarRect = progressBarRef.current.getBoundingClientRect();

        const newActiveBullets = bulletsRef.current.map((bullet) => {
          if (!bullet) return false;
          const bulletRect = bullet.getBoundingClientRect();
          return bulletRect.top <= progressBarRect.bottom;
        });
        setActiveBullets(newActiveBullets);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full mx-auto p-8 roadmap-deco relative pt-24"
    >
      <div className="text-center uppercase px-4 gradient-text mb-12">
        <h1
          className="uppercase text-center text-white text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight font-bold [color:_#816A26]
                   [-webkit-text-stroke:_1px_#816A26]
                   sm:[-webkit-text-stroke:_2px_#816A26]"
        >
          Our roadmap
        </h1>
      </div>
      <div className="max-w-5xl w-full mx-auto relative py-8">
        <motion.div
          ref={progressBarRef}
          className="absolute left-0 sm:left-1/2 top-0 bottom-0 w-1 sm:w-0.5 bg-[#B68B58] origin-top "
          style={{
            scaleY,
            marginLeft: "-0.15rem",
            backgroundImage: "linear-gradient(to bottom, #B68B58, #B68B58)",
            boxShadow: "0 0 8px #B68B58, 0 0 16px #B68B58",
          }}
        />

        <motion.div
          className="absolute sm:left-1/2 top-0 w-3 h-3 bg-[#B68B58] rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{
            boxShadow: "0 0 8px #B68B58, 0 0 16px #B68B58",
          }}
        />
        {roadmap.map((road, index) => {
          const fadeInOpacity = useTransform(
            scrollYProgress,
            [
              index / (roadmap.length + 1),
              (index + 0.8) / (roadmap.length + 1),
            ],
            [0, 1]
          );
          const translateY = useTransform(
            scrollYProgress,
            [
              index / (roadmap.length + 1),
              (index + 0.5) / (roadmap.length + 1),
            ],
            [10, 0]
          );

          const bulletImageSrc = activeBullets[index]
            ? "/coin.gif"
            : "/logob.svg";

          return (
            <motion.div
              key={road.id}
              className={clsx(
                "w-full sm:w-[50%] mb-16",
                { "sm:ml-auto": road.start === "2" },
                { "sm:mr-auto": road.start === "1" }
              )}
              style={{
                opacity: fadeInOpacity,
                y: translateY,
              }}
            >
              <div
                className={clsx("p-4  pl-8 relative ", {
                  "sm:pl-8 sm:text-left": road.start === "2",
                  "sm:pr-8 sm:text-right": road.start === "1",
                })}
              >
                <div className="text-sm text-white/50 uppercase tracking-wide">
                Bingo Crypto
                </div>
                <h2 className="pgradient-text mb-6 uppercase text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight font-bold relative">
                  {road.title}
                  <motion.img
                    src={bulletImageSrc}
                    alt="Bullet"
                    ref={(el) => (bulletsRef.current[index] = el)}
                    className={clsx(
                      "w-8 h-8 inline-block absolute ",
                      "left-[-3rem]",
                      {
                        "sm:left-[-3.05rem]": road.start === "2",
                        "sm:right-[-2.90rem] sm:left-auto": road.start === "1",
                      }
                    )}
                  />
                </h2>
                <p className="text-base font-light max-w-md sm:mx-auto my-4">
                  {road.description}
                </p>
              </div>
            </motion.div>
          );
        })}

        <motion.div
          className="absolute sm:left-1/2 bottom-0 w-3 h-3 bg-[#B68B58] rounded-full transform -translate-x-1/2 translate-y-1/2"
          style={{
            boxShadow: "0 0 8px #B68B58, 0 0 16px #B68B58",
          }}
        />
      </div>
    </section>
  );
};

export default Roadmap;
