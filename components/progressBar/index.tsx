import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface ProgressBarProps {
  currentAmount: number;
  maxAmount: number;
  id: "gold" | "purple" | "pink";
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentAmount,
  maxAmount,
  id,
}) => {
  const [percentage, setPercentage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculatedPercentage = (currentAmount / maxAmount) * 100;
    setPercentage(Math.min(calculatedPercentage, 100));
  }, [currentAmount, maxAmount]);

  const getImages = (id: "gold" | "purple" | "pink") => {
    return {
      background: `/bar/${id}.png`,
      mask: `/bar/mask_${id}.svg`,
    };
  };

  const images = getImages(id);

  return (
    <div ref={containerRef} className="relative w-full my-6 sm:my-8">
      <div className="relative w-full" style={{ paddingBottom: "12.11%" }}>
        <Image
          src={images.background}
          alt={`${id} progress bar background`}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div
        ref={progressBarRef}
        className="absolute top-0 overflow-hidden left-[8%]"
        style={{
          width: "83%",
          height: "100%",
        }}
      >
        <div
          className="relative h-full w-full"
          style={{
            width: `${percentage <= 156.25 ? (percentage / 125) * 80 : 100}%`, // 125% to account for the 80% container, note: 100% = 156.25 value for percentage
            transition: "width 1.5s ease-in-out",
          }}
        >
          <Image
            src={images.mask}
            alt={`${id} progress bar mask`}
            layout="fill"
            objectFit="cover"
            objectPosition="left"
          />
        </div>
      </div>
      <div
        className="absolute top-0 h-full flex items-center"
        style={{
          left: `calc(${percentage}%)`,
          transition: "left 1.5s ease-in-out",
          zIndex: 10,
        }}
      >
        <div
          className="w-[10px] h-[100%] animate-pulse"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)",
            animation: "pulse 1.5s infinite",
            transition: "left 1.5s ease-in-out",
            zIndex: 10,
          }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-bebas-neue tracking-wide text-3xl sm:text-3xl md:text-4xl">
          $ {currentAmount.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
