import React, { useState, useEffect } from "react";
import School from "../assets/images/AlokSchool.png";
import { useAppData } from "../context/AppDataContext";

const HeroSection = () => {
  const { hero } = useAppData();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (hero.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % hero.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [hero]);

  return (
    <section className="relative h-96 md:h-[24rem] overflow-hidden">
      {hero.length > 0 ? (
        <div className="absolute inset-0">
          {hero.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${item.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          ))}
        </div>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${School})` }}
        ></div>
      )}

      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    </section>
  );
};

export default HeroSection;
