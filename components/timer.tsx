import { useEffect, useState } from "react";

interface TimerProps {
  id: "gold" | "purple" | "pink";
}

const Timer: React.FC<TimerProps> = ({ id }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 23,
    minutes: 59,
    seconds: 54,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return {
            ...prevTime,
            hours: prevTime.hours - 1,
            minutes: 59,
            seconds: 59,
          };
        } else if (prevTime.days > 0) {
          return {
            ...prevTime,
            days: prevTime.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        } else {
          clearInterval(timer);
          return prevTime;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getColors = (id: "gold" | "purple" | "pink") => {
    switch (id) {
      case "gold":
        return {
          bg: "bg-[#867953]/20",
          border: "border-[#ab9a51]",
          gradient: "from-[#fff] to-[#DFD8BD]",
        };
      case "purple":
        return {
          bg: "bg-[#BD89FF]/20",
          border: "border-[#BD89FF]/20",
          gradient: "from-[#fff] to-[#E6E6FA]",
        };
      case "pink":
        return {
          bg: "bg-[#FF89EF]/20",
          border: "border-[#FF89EF]",
          gradient: "from-[#fff] to-[#FFC0CB]",
        };
    }
  };

  const colors = getColors(id);

  return (
    <div
      className={` sm:m-4 mx-auto grid grid-cols-4 gap-8 sm:gap-2 ${colors.bg} rounded-lg border-2 ${colors.border} p-1  sm:p-1`}
    >
      {Object.entries(timeLeft).map(([unit, value], index) => (
        <div key={unit} className="rounded text-center relative">
          <div className="text-md sm:text-sm md:text-base lg:text-lg  uppercase text-gray-300 font-bebas-neue">
            {unit}
          </div>
          <div
            className={`font-bebas-neue text-white  text-[2.7rem] sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl leading-none gradient-text bg-gradient-to-tl ${colors.gradient} tracking-wide`}
            style={{ fontWeight: 500 }}
          >
            {value.toString().padStart(2, "0")}
          </div>
          {index < 3 && (
            <span className="absolute -right-5 sm:right-0 top-9  sm:top-12  transform translate-x-1/2 -translate-y-1/2  text-white text-4xl sm:text-3xl md:text-4xl lg:text-5xl gradient-text bg-gradient-to-tl ${colors.gradient}">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Timer;
