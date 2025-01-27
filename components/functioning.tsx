"use client";
import clsx from "clsx";
import Image from "next/image";
import { BorderBeam } from "./magicui/border-beam";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

const Fonctioning = () => {
  const cards = [
    {
      id: "1",
      title: "Connect wallet",
      image: "number_1.png",
      classe: "fonctioning-card1",
      description:
        "Start by setting up a cryptocurrency wallet that supports Ethereum (ETH). This wallet will allow you to securely store your ETH and participate in our lotteries. Popular options include MetaMask, Trust Wallet, and Coinbase.",
    },
    {
      id: "2",
      title: "Tickets filling",
      image: "number_2.png",
      classe: "fonctioning-card2",
      description:
        "To participate in our various Crypto Bingo Lottery pools, go to the Pools page of our site. There you can buy your tickets and select the desired quantity. Don't miss your chance to win amazing cryptocurrencies!",
    },
    {
      id: "3",
      title: "Join the draw",
      image: "number_3.png",
      classe: "fonctioning-card3",
      description:
        "After purchasing your tickets, sit back and relax! Draws take place every two days. Tune in to see if you’ve won, and check your wallet for any rewards. If you win, your prize will be instantly credited to the Ethereum address you provided!",
    },
  ];
  return (
    <section className="mx-auto pt-0  p-8 w-full pb-32">
      <div className="text-center uppercase px-4 gradient-text my-8">
        <h1
          className="gradient-text uppercase text-center text-white text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight font-bold pb-16 color:_#816A26]
                   [-webkit-text-stroke:_1px_#816A26]
                   sm:[-webkit-text-stroke:_2px_#816A26]"
        >
          How does this <br />
          work ?
        </h1>
      </div>
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(15rem,23rem))] justify-center items-center gap-6">
        {cards.length > 0 &&
          cards.map((card, index) => (
            <motion.div
              className={clsx(
                `${card.classe}`,
                "h-[25rem] w-full p-6 relative rounded-3xl overflow-hidden"
              )}
              key={card.id}
              variants={fadeInAnimationVariants}
              initial="initial"
              whileInView={"animate"}
              viewport={{
                once: true,
              }}
              custom={index}
            >
              <span className="pt-12 inline-block">
                <Image
                  height={"80"}
                  width={"80"}
                  src={`/${card.image}`}
                  alt="card number"
                />
              </span>
              <h2 className="gradient-text font-bebas-neue uppercase my-4 text-xl sm:text-3xl md:text-5xl leading-relaxed font-normal tracking-wide mb-4">
                {card.title}
              </h2>
              <p className="first-letter:uppercase">{card.description}</p>
              <BorderBeam className="h-full w-full" duration={12} delay={9} />
            </motion.div>
          ))}
      </div>
    </section>
  );
};

export default Fonctioning;
