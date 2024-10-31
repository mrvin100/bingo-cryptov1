"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: any) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

const Faqs = () => {
  const faqs = [
    {
      id: "1",
      title: "What is BINGO Crypto?",
      answer:
        "Welcome to Bingo Crypto, the innovative lottery experience that brings traditional bingo into the world of cryptocurrency! Our platform offers multiple lottery options, making it accessible for all players and wallets. Whether you’re a casual participant or a high-stakes player, everyone has a chance to win life-changing prizes. Enjoy seamless transactions using Ethereum (ETH), all backed by the transparency of the blockchain. With thrilling draws every two days, your next big win is just around the corner! Join the many players who have already won and experience a fair gaming environment with our advanced algorithms. Bingo Crypto is not just a lottery; it’s the future of gaming where incredible rewards await you!",
    },
    {
      id: "2",
      title: "Is it accessible?",
      answer: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      id: "3",
      title: "Is it styled?",
      answer:
        "Yes. It comes with default styles that match the other component's aesthetic.",
    },
    {
      id: "4",
      title: "Is it animated?",
      answer:
        "Yes. It's animated by default, but you can disable it if you prefer.",
    },
  ];
  return (
    <section
      className="max-w-7xl mx-auto w-full p-4 pb-0 md:p-6 md:pb-0 mt-24"
      style={{ zIndex: 10 }}
    >
      <div className="text-center uppercase px-4 gradient-text mb-8">
        <h1
          className="uppercase text-center text-white text-5xl  md:text-5xl lg:text-6xl xl:text-7xl leading-tight font-bold [color:_#816A26]
                   [-webkit-text-stroke:_1px_#816A26]
                   sm:[-webkit-text-stroke:_2px_#816A26]"
        >
          Frequently Asked <br />
          Questions
        </h1>
      </div>
      <div className="min-h-[50vh] flex justify-center pt-16">
        <div className="w-2/3 sm:w-full max-w-md">
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-4 cursor-pointer"
            style={{ zIndex: 10 }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                variants={fadeInAnimationVariants}
                initial="initial"
                whileInView="animate"
                viewport={{
                  once: true,
                }}
                custom={index}
                key={faq.id}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-[#867953]/10 rounded-xl border-2 border-[#B682FF] p-3"
                >
                  <AccordionTrigger className="flex items-center justify-between text-[#d9d9d9] text-base sm:text-lg font-normal uppercase tracking-wide gap-2">
                    <div className="w-[14px] h-full border-2 border-[#B682FF] rounded-lg"></div>

                    <div className="flex-1 text-center font-bebas-neue text-lg sm:text-4xl">
                      {faq.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white text-sm sm:text-base font-normal leading-[1.5rem] mx-auto text-center mt-3">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
