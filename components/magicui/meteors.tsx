"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface MeteorsProps {
  number?: number;
  fadeOut?: boolean;
}

const SVG_URLS = ["/meteors/gold.svg", "/meteors/purple.svg"];

export const Meteors = ({ number = 20, fadeOut = false }: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<
    Array<{ style: React.CSSProperties; svg: string }>
  >([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Simulate image loading; no need for `new Image()` in Next.js
    setImagesLoaded(true);
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    let interval: NodeJS.Timeout;
    const styles: Array<{ style: React.CSSProperties; svg: string }> = [];

    const addMeteor = () => {
      if (styles.length < number) {
        const svg = SVG_URLS[Math.floor(Math.random() * SVG_URLS.length)];
        styles.push({
          style: {
            top: Math.floor(Math.random() * window.innerHeight) + "px",
            left: Math.floor(Math.random() * window.innerWidth) + "px",
            animationDelay: Math.random() * 1 + 0.2 + "s",
            animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
          },
          svg,
        });
        setMeteorStyles([...styles]);
      } else {
        clearInterval(interval);
      }
    };

    interval = setInterval(addMeteor, 200);

    return () => clearInterval(interval);
  }, [number, imagesLoaded]);

  useEffect(() => {
    if (fadeOut) {
      const timeout = setTimeout(() => {
        setMeteorStyles([]);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [fadeOut]);

  if (!imagesLoaded) return null;

  return (
    <>
      {meteorStyles.map(({ style, svg }, idx) => (
        <div
          key={idx}
          className={`pointer-events-none absolute size-[90px] animate-meteor ${
            fadeOut ? "animate-fadeOut" : ""
          }`}
          style={style}
        >
          <Image
            src={svg}
            alt="Meteor"
            width={10}
            height={90}
            className="w-full h-full rotate-[135deg]"
          />
        </div>
      ))}
    </>
  );
};

export default Meteors;
