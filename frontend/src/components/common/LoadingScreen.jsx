import React, { useEffect, useState } from "react";
import logo from  "../../assets/images/logo.png"; 
import AlokSchool from "../../assets/images/logo.png"

export default function LoadingScreen() {
  const slides = [
    AlokSchool,
    logo
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999] overflow-hidden">

      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {slides.map((src, i) => (
          <img
            key={i}
            src={src}
            className={`
              absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms]
              ${index === i ? "opacity-20" : "opacity-0"}
            `}
            alt=""
          />
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Animated Logo */}
      <div className="relative flex flex-col items-center gap-6">
        <div className="animate-pulse">
          <img
            src={AlokSchool}
            alt="College Logo"
            className="w-32 h-32 object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]"
          />
        </div>
      </div>
    </div>
  );
}
