"use client";
import React, { createContext, useState, useContext } from "react";

interface AnimationContextType {
  playAnimation: boolean;
  setPlayAnimation: (play: boolean) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [playAnimation, setPlayAnimation] = useState(false);

  return (
    <AnimationContext.Provider value={{ playAnimation, setPlayAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimationPage = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};
