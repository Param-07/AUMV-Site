import React, { useState, useEffect } from "react";
import School from "../assets/images/AlokSchool.png";
import { useAppData } from "../context/AppDataContext";
import SmartImage from "./SmartImages";

const HeroSection = () => {
  const { hero } = useAppData();
  const [current, setCurrent] = useState(0);

  const slides = hero && hero.length > 0 ? hero : [{ url: School }];

  useEffect(() => {
    if (!slides || slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [slides]);

  return (
    <section className="relative h-[380px] md:h-[470px] lg:h-[520px] overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0">
      {slides.map((item, index) => {
      const isActive = index === current;
      const optimized = `${item.url}?width=1600&format=webp&quality=80`;

      return (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[1100ms] ease-in-out ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${optimized})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      );
      })}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/60"></div>

      {/* HERO TEXT BLOCK */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 animate-[fadeIn_1.4s_ease]">
        <h1 className="text-white font-extrabold text-3xl md:text-5xl tracking-tight drop-shadow-lg">
          Excellence in Education
        </h1>
        <p className="text-gray-200 mt-3 md:text-lg max-w-2xl leading-relaxed">
          Empowering young minds with discipline, values, innovation, and lifelong learning.
        </p>

        <div className="mt-6 flex gap-4 flex-wrap justify-center">
          <a
            href="/admission"
            className="px-6 py-3 rounded-full font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-600/50 transition transform hover:-translate-y-[2px]"
          >
            Apply for Admission
          </a>
          <a
            href="/academics"
            className="px-6 py-3 rounded-full font-semibold border border-white/80 text-white hover:bg-white hover:text-black transition shadow-lg"
          >
            Explore Academics
          </a>
        </div>
      </div>

      {/* INDICATORS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              current === index ? "bg-white scale-110 shadow-md" : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
