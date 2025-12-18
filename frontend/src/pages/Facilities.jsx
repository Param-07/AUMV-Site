import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import useScrollToTop from "../hooks/useScrollToTop";
import { useAppData } from "../context/AppDataContext";
import SmartImage from "../components/SmartImages";

const Facilities = () => {
  useScrollToTop();
  const { facilities = [] } = useAppData();

  const defaultDescriptions = {
    "Computer Lab": [
      "Our state-of-the-art Computer Lab is equipped with modern systems and internet.",
      "Students get hands-on programming exposure and digital skills training.",
    ],
    Library: [
      "A peaceful knowledge hub with academic and non-fiction books.",
      "Students develop reading habits and independent research skills.",
    ],
    Transport: [
      "Safe and reliable transportation facilities covering all local areas.",
      "GPS-enabled buses with experienced drivers ensure safe travel.",
    ],
    Sports: [
      "Dedicated playgrounds and sports areas for physical development.",
      "Students regularly participate in inter-school tournaments.",
    ],
  };

  const grouped = useMemo(() => {
    return facilities.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      item.facilities?.forEach((f) => {
        if (f?.src) acc[item.category].push(f.src);
      });
      return acc;
    }, {});
  }, [facilities]);

  const sections = useMemo(() => {
    return Object.keys(grouped).map((category, idx) => ({
      id: category.toLowerCase().replace(/\s+/g, "-"),
      title: category,
      text:
        defaultDescriptions[category] || [
          "This facility is actively used by students.",
        ],
      images: grouped[category],
      reverse: idx % 2 !== 0,
    }));
  }, [grouped]);

  const [currentSlide, setCurrentSlide] = useState({});

  useEffect(() => {
    if (!sections.length) return;

    const timers = sections.map((section, idx) => {
      if (!section.images.length) return null;
      return setInterval(() => {
        setCurrentSlide((prev) => ({
          ...prev,
          [idx]: ((prev[idx] ?? 0) + 1) % section.images.length,
        }));
      }, 3500);
    });

    return () => timers.forEach((t) => t && clearInterval(t));
  }, [sections]);

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 py-16 md:py-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-52 h-52 bg-indigo-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-0 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center text-4xl md:text-5xl font-extrabold text-indigo-900 mb-14"
        >
          World-Class Facilities for Holistic Growth
        </motion.h1>

        {sections.map((section, idx) => (
          <div
            key={section.id}
            id={section.id}
            className={`flex flex-col md:flex-row items-center gap-10 md:gap-20 mb-24 ${
              section.reverse ? "md:flex-row-reverse" : ""
            }`}
          >
            <motion.div
              className="w-full md:w-1/2 relative"
              initial={{ x: section.reverse ? 120 : -120, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-xl bg-gray-200">
                {section.images.map((img, slideIndex) => (
                  <SmartImage
                    key={slideIndex}
                    src={img}
                    alt={section.title}
                    width={1200}
                    wrapperClassName="absolute inset-0"
                    className={`w-full h-full object-cover transition-opacity duration-1000 ${
                      (currentSlide[idx] ?? 0) === slideIndex
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                ))}
              </div>

              <div className="absolute inset-0 -z-10 translate-x-6 translate-y-6 bg-indigo-200/25 rounded-2xl" />

              {section.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {section.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        setCurrentSlide((prev) => ({ ...prev, [idx]: i }))
                      }
                      className={`w-3 h-3 rounded-full transition ${
                        (currentSlide[idx] ?? 0) === i
                          ? "bg-indigo-600 scale-110"
                          : "bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4">
                {section.title}
              </h2>

              {section.text.map((para, i) => (
                <p
                  key={i}
                  className="text-gray-700 text-lg leading-relaxed mb-4"
                >
                  {para}
                </p>
              ))}
            </motion.div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg viewBox="0 0 1440 80" className="w-full fill-white">
          <path d="M0,64L120,58.7C240,53,480,43,720,48C960,53,1200,75,1320,85.3L1440,96L1440,0L0,0Z" />
        </svg>
      </div>
    </section>
  );
};

export default Facilities;
