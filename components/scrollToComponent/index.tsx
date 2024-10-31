import React from "react";
import Link from "next/link";

interface ScrollToSectionProps {
  targetId: string;
  children: React.ReactNode;
}

const ScrollToSection: React.FC<ScrollToSectionProps> = ({
  targetId,
  children,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.location.pathname !== "/home") {
      window.location.href = `/home#${targetId}`;
    } else {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };
  return (
    <Link href={`/home#${targetId}`} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default ScrollToSection;
