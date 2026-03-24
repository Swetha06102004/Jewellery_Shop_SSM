import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Hero from "../components/Hero";
import GoldPriceTicker from "../pages/GoldPriceTicker";
import FeaturedCollections from "../components/FeaturedCollections";
import WhyChooseUs from "../components/WhyChooseUs";

function Home() {

  const navigate = useNavigate();

  useEffect(() => {

    const handleKeyDown = (e) => {
      // Ctrl + Shift + A shortcut
      if (e.ctrlKey && e.shiftKey && e.key === "S") {
        navigate("/admin"); 
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };

  }, [navigate]);

  return (
    <>
      <Hero />
      <GoldPriceTicker />
      <FeaturedCollections />
      <WhyChooseUs />
    </>
  );
}

export default Home;