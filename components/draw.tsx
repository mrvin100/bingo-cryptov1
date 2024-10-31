import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import ProgressBar from "./progressBar";
import Timer from "./timer";

interface DrawData {
  id: string;
  theme: "gold" | "purple" | "pink";
  title: string;
  subtitle: string;
  colorSubtitle: string;
  currentAmount: number;
  maxAmount: number;
  title2: string;
  subtitle2: string;
  results: {
    id: string;
    title: string;
    content: string;
  }[];
}

const drawData: DrawData[] = [
  {
    id: "gold",
    theme: "gold",
    title: "CURRENT DRAW",
    subtitle: "Main Pool prize",
    colorSubtitle: "#E1CA84",
    currentAmount: 40000,
    maxAmount: 100000,
    title2: "LATEST DRAW",
    subtitle2: "Previous Results",
    results: [
      { id: "1", title: "Participants", content: "1203" },
      { id: "2", title: "Total Pot", content: "$5,000" },
      { id: "3", title: "Winner", content: "0x...39A" },
      { id: "4", title: "Winning Amount", content: "$3,500" },
      { id: "5", title: "Runner Up", content: "0x...B2C" },
      { id: "6", title: "Second Prize", content: "$1,500" },
    ],
  },
  {
    id: "purple",
    theme: "purple",
    title: "CURRENT DRAW",
    subtitle: "Main Pool prize",
    colorSubtitle: "#D6B8FF",
    currentAmount: 60000,
    maxAmount: 120000,
    title2: "LATEST DRAW",
    subtitle2: "Previous Results",
    results: [
      { id: "1", title: "Participants", content: "1500" },
      { id: "2", title: "Total Pot", content: "$7,000" },
      { id: "3", title: "Winner", content: "0x...B2D" },
      { id: "4", title: "Winning Amount", content: "$4,900" },
      { id: "5", title: "Runner Up", content: "0x...E3F" },
      { id: "6", title: "Second Prize", content: "$2,100" },
    ],
  },
  {
    id: "pink",
    theme: "pink",
    title: "CURRENT DRAW",
    subtitle: "Main Pool prize",
    currentAmount: 30000,
    colorSubtitle: "#FFA2F2",
    maxAmount: 80000,
    title2: "LATEST DRAW",
    subtitle2: "Previous Results",
    results: [
      { id: "1", title: "Participants", content: "980" },
      { id: "2", title: "Total Pot", content: "$4,000" },
      { id: "3", title: "Winner", content: "0x...C4D" },
      { id: "4", title: "Winning Amount", content: "$2,800" },
      { id: "5", title: "Runner Up", content: "0x...F5G" },
      { id: "6", title: "Second Prize", content: "$1,200" },
    ],
  },
];

interface DrawProps {
  id: string;
  title?: string;
}

const Draw: React.FC<DrawProps> = ({ id, title }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const draw = drawData.find((d) => d.id === id);

  if (!draw) return null;

  const splitTitle = (title: string) => {
    const words = title.split(" ");
    if (words.length === 1) return [words[0], ""];
    const midpoint = Math.ceil(words.length / 2);
    return [
      words.slice(0, midpoint).join(" "),
      words.slice(midpoint).join(" "),
    ];
  };

  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const [title1, title2] = splitTitle(draw.title);
  const [latestTitle1, latestTitle2] = splitTitle(draw.title2);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
        background: `radial-gradient(circle, ${hexToRgba(
          draw.colorSubtitle,
          0.4
        )} -100%, transparent 30%)`,
      }}
      className="max-w-7xl mx-auto w-full md:p-6 mt-12 md:mt-24"
    >
      {title && (
        <>
          <div
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight font-bold text-center pb-8 
                   [-webkit-text-stroke:_1px_#816A26]
                   sm:[-webkit-text-stroke:_2px_#816A26]"
          >
            {title}
          </div>
        </>
      )}
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-9 place-content-center mb-16 ">
        <div className="relative uppercase rounded-lg w-full h-[50vh] lg:h-auto lg:aspect-[3/4] min-w-[400px] right-[8px] sm:right-0">
          <Image
            src={`/draw/${draw.theme}.svg`}
            alt={`${draw.theme} background`}
            layout="fill"
            objectFit="contain"
            quality={100}
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center p-4 md:p-8 left-[8px]">
            <div className="text-center w-full">
              <div
                className="uppercase gradient-text bg-gradient-to-tl from-[#B6973C] to-[#816A26] text-white  md:pt-8 text-6xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight font-bold  md:mb-2 [color:_#816A26]
                   [-webkit-text-stroke:_1px_#816A26]
                   sm:[-webkit-text-stroke:_2px_#816A26]"
              >
                <h2 className="m-0 p-0">{title1}</h2>
                <h2 className="m-0 p-0">{title2}</h2>
              </div>
              <h3
                className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bebas-neue tracking-wide  md:pt-4 "
                style={{ color: draw.colorSubtitle }}
              >
                {draw.subtitle}
              </h3>
              <div className=" px-16  sm:w-3/5 sm:px-12 md:px-22  md:w-4/5 mx-auto md:px-24 lg:px-4">
                <ProgressBar
                  id={draw.id as "gold" | "purple" | "pink"}
                  currentAmount={draw.currentAmount}
                  maxAmount={draw.maxAmount}
                />
              </div>
            </div>
            <div className="md:w-2/4 lg:w-4/5 w-4/5 sm:w-3/5 pb-2 mb-4 px-4 sm:px-6 sm:px-0">
              <Timer id={draw.id as "gold" | "purple" | "pink"} />
            </div>
          </div>
        </div>
        <div className="relative uppercase rounded-lg w-full h-[50vh] lg:h-auto lg:aspect-[3/4] mb-0 lg:mb-0  min-w-[400px]  right-[8px] sm:right-0">
          <div className="h-full">
            <Image
              src={`/draw/${draw.theme}.svg`}
              alt={`${draw.theme} background`}
              style={{ transform: "scaleX(-1)" }}
              layout="fill"
              objectFit="contain"
              quality={100}
            />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center p-4 md:p-8">
            <div className="text-center w-full">
              <div
                className="uppercase text-6xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight font-bold mb-1 md:mb-2 [color:_#816A26]
                   [-webkit-text-stroke:_1px_#816A26]
                   sm:[-webkit-text-stroke:_2px_#816A26]"
              >
                <h2 className="m-0 p-0 bg-clip-text text-transparent bg-gradient-to-tl from-[rgba(255,255,255,0.5)] to-[rgba(255,255,255,0.5)] ">
                  {latestTitle1}
                </h2>
                <h2 className="m-0 p-0 bg-clip-text text-transparent bg-gradient-to-tl from-[rgba(255,255,255,0.5)] to-[rgba(255,255,255,0.5)]">
                  {latestTitle2}
                </h2>
              </div>
              <h3 className="gradient-text text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bebas-neue leading-tight tracking-wide bg-gradient-to-tl from-[#fff] to-[#DFD8BD] mb-4 md:mb-8">
                {draw.subtitle2}
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-1 md:gap-3 text-xs md:text-sm w-full mb-2 md:mb-6 max-w-xs md:max-w-md">
              {draw.results.map((result) => (
                <div
                  key={result.id}
                  className="rounded p-1 tracking-wide text-center"
                >
                  <div className="text-sm md:text-sm lg:text-base uppercase text-white opacity-50 font-bebas-neue">
                    {result.title}
                  </div>
                  <div className="text-white/80 text-lg md:text-lg lg:text-2xl xl:text-3xl font-bebas-neue">
                    {result.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Draw;
