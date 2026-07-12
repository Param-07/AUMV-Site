import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Award, ArrowRight } from "lucide-react";
import { useAppData } from "../../context/AppDataContext";
import SmartImage from "../SmartImages";

const StudentLifeHero = () => {
  const { gallery = [] } = useAppData();
  const [currentImage, setCurrentImage] = useState(0);

  /* ---------------- DYNAMIC DATA FILTER & FALLBACK ENGINE ---------------- */
  const studentLifeImages = useMemo(() => {
    const fallback = [
      {
        src: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?w=1800",
        title: "Learning Beyond Books",
        description: "Leadership, creativity, collaboration, and character development.",
      },
    ];

    if (!gallery || !gallery.length) return fallback;

    // Isolate explicit student life targeted image matrix collections
    const targetCollection = gallery.find(
      (item) => item.category === "Student Life Gallery"
    );

    if (!targetCollection || !targetCollection.images || !targetCollection.images.length) {
      // Secondary soft-matching if strict collection category label isn't present
      const looselyMatched = gallery.filter((item) => {
        const name = (item.category || "").toLowerCase();
        return name.includes("student") || name.includes("life") || name.includes("campus");
      });

      const secondaryImages = looselyMatched.flatMap((item) =>
        (item.images || []).map((img) => ({
          src: img.src || img.url,
          title: img.title || "Campus Experience",
          description: img.description || "Nurturing character, collaboration, and community.",
        }))
      );

      return secondaryImages.length > 0 ? secondaryImages : fallback;
    }

    return targetCollection.images.map((img) => ({
      src: img.src || img.url,
      title: img.title || "Learning Beyond Books",
      description: img.description || "Leadership, creativity, collaboration, and character development at every stage.",
    }));
  }, [gallery]);

  /* ---------------- SLIDER TIMER TRIGGER ---------------- */
  useEffect(() => {
    if (!studentLifeImages.length) return;

    // Clean reset vector if asset dimensions shift dynamically
    setCurrentImage(0);

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % studentLifeImages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [studentLifeImages.length]);

  const current = studentLifeImages[currentImage];

  return (
    <section
      className="
          relative
          grid
          grid-cols-[46%_54%] 
          min-h-[280px]
          sm:min-h-[380px]
          lg:min-h-[460px]
          bg-[#0d104f]
          overflow-hidden
        "
    >
      {/* ================= LEFT CONTROLS & CONTENT PANEL ================= */}
      <div
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-[#15157d]
          via-[#12156d]
          to-[#0d104f]
          flex
          items-center
          py-4
          px-3
          sm:px-8
          lg:px-12
        "
      >
        {/* Shrunk Decorative Background Element */}
        <div className="absolute -left-28 -bottom-24 w-64 h-64 rounded-full bg-[#cca730]/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Top Minimal Track Accent Line */}
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-4">
              <span className="w-4 sm:w-8 h-[1px] bg-[#cca730]/50" />
              <span className="uppercase tracking-[0.15em] sm:tracking-[0.25em] text-[8px] sm:text-[10px] text-[#cca730] font-semibold whitespace-nowrap">
                Campus Experience
              </span>
            </div>

            {/* Scaled Responsive Core Micro Headings */}
            <h1 className="text-lg sm:text-3xl md:text-5xl xl:text-6xl font-black text-white leading-tight">
              Beyond the
              <span className="block italic text-[#cca730] my-0">
                Classroom
              </span>
            </h1>

            {/* Locked Content Paragraph Block with Text-Clamping Guards */}
            <p className="mt-1.5 sm:mt-4 text-[10px] sm:text-sm md:text-base text-white/75 leading-relaxed max-w-md line-clamp-2 sm:line-clamp-3">
              At Alok Inter College, we cultivate leaders, innovators, artists, athletes, and responsible citizens. Student life is designed to nurture confidence, creativity, and lifelong friendships.
            </p>

            {/* Inline Action Layout System Group */}
            <div className="mt-3 sm:mt-5 flex flex-col sm:flex-row gap-1.5 sm:gap-3 w-full">
              <button className="group w-full sm:w-auto text-center whitespace-nowrap bg-[#cca730] text-[#15157d] px-2.5 sm:px-5 py-1.5 sm:py-2.5 text-[9px] sm:text-sm font-bold flex items-center justify-center gap-1 hover:scale-[1.02] transition-all duration-300">
                Explore Clubs
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform hidden sm:inline-block" />
              </button>

              <button className="w-full sm:w-auto text-center whitespace-nowrap border border-white/20 text-white px-2.5 sm:px-5 py-1.5 sm:py-2.5 text-[9px] sm:text-sm font-semibold hover:bg-white hover:text-[#15157d] transition-all duration-300">
                Join Leadership
                </button>
            </div>

            {/* Low-Profile Grid Matrix Metrics System */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-3 sm:mt-6 pt-3 sm:pt-5 border-t border-white/10">
              <div className="flex items-center gap-1.5 sm:gap-3">
                <div className="p-1 sm:p-2 bg-white/5 rounded">
                  <Users size={14} className="text-[#cca730] sm:scale-125" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-lg font-black text-white leading-none">20+</h4>
                  <p className="text-[7px] sm:text-xs text-white/60 tracking-tight mt-0.5 sm:mt-1">Clubs & Societies</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-3">
                <div className="p-1 sm:p-2 bg-white/5 rounded">
                  <Award size={14} className="text-[#cca730] sm:scale-125" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-lg font-black text-white leading-none">100+</h4>
                  <p className="text-[7px] sm:text-xs text-white/60 tracking-tight mt-0.5 sm:mt-1">Annual Events</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ================= RIGHT DYNAMIC IMAGE SLIDER PANEL ================= */}
      <div className="relative overflow-hidden group h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1.03 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 4.5, ease: "linear" },
            }}
            className="absolute inset-0"
          >
            <SmartImage
              src={current.src}
              alt={current.title || "Student Life Activity View"}
              wrapperClassName="w-full h-full"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Dark Core Mixing Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#15157d]/80 via-black/5 to-transparent" />

        {/* Compact Media Control Dot Matrices Array */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex gap-1 z-20 bg-black/30 backdrop-blur-md px-1.5 py-1 rounded-full scale-75 sm:scale-90">
          {studentLifeImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`transition-all duration-300 rounded-full h-1 ${
                currentImage === idx ? "w-3 sm:w-4 bg-[#cca730]" : "w-1 bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Minimal Micro Spotlight Floating Context Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`card-${currentImage}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-2 left-2 right-2 sm:left-auto sm:bottom-4 sm:right-4 bg-white/95 backdrop-blur-md p-2 sm:p-4 max-w-[220px] sm:max-w-xs shadow-xl border-l-4 border-[#cca730]"
          >
            <span className="uppercase tracking-wider text-[7px] sm:text-[9px] text-slate-500 font-semibold block">
              Student Activity Profile
            </span>
            <h3 className="mt-0.5 text-[10px] sm:text-base font-bold text-[#15157d] leading-tight truncate">
              {current.title}
            </h3>
            <p className="mt-0.5 text-slate-600 text-[9px] sm:text-xs leading-normal line-clamp-1 sm:line-clamp-2">
              {current.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default StudentLifeHero;