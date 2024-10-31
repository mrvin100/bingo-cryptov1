"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import HomePage from "@/components/home";
import Hero from "@/components/Hero";
import Fonctioning from "@/components/functioning";
import Roadmap from "@/components/roadmap";
import Check from "@/components/check";
import Faqs from "@/components/faqs";
import Footer from "@/components/footer";
import HorizontalScrollSection from "@/components/lateral";
import Onchain from "@/components/onChain";

const App = () => {
  const [showLoader, setShowLoader] = useState(true);

  const parts = [
    { key: "hero", component: <Hero /> },
    { key: "lateral", component: <HorizontalScrollSection /> },
    { key: "functioning", component: <Fonctioning /> },
    { key: "roadmap", component: <Roadmap /> },
    { key: "onchain", component: <Onchain /> },
    { key: "faqs", component: <Faqs /> },
    { key: "footer", component: <Footer /> },
  ];

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  return (
    <AnimatePresence mode="wait">
      <HomePage key="homepage">
        {parts.map((part) => (
          <div key={part.key} className="">
            {part.component}
          </div>
        ))}
      </HomePage>
    </AnimatePresence>
  );
};

export default App;
