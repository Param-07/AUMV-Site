import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useScrollToTop from "../hooks/useScrollToTop";
import { apiRequest } from "../utils/ApiCall";
import SmartImage from "../components/SmartImages";

export default function AboutSection() {
  useScrollToTop();

  const [images, setImages] = useState({});

  useEffect(() => {
    const loadImages = async () => {
      try {
        const res = await apiRequest("GET", "/mainPage/getHero");
        if (res.message === "success") {
          const map = {};
          res.hero.forEach((item) => {
            map[item.category] = item.url;
          });
          setImages(map);
        }
      } catch {
        console.error("Failed to load main page images");
      }
    };
    loadImages();
  }, []);

  const sections = [
    {
      id: "about",
      category: "About",
      title: "About Our School",
      text: [
        "Alok Higher Secondary School, Chandauli has been a beacon of excellence since its establishment. We are committed to providing quality education that nurtures young minds and shapes future leaders.",
        'Our school follows the motto "विद्या ददाति विनयम्" (Knowledge bestows humility) and strives to create an environment where students can flourish academically, socially, and morally.',
      ],
      image:
        images.About ||
        "https://placehold.co/700x450/dae1f6/2f2f93?text=Front+View+of+School",
      alt: "Front View of School",
      reverse: false,
    },
    {
      id: "principal",
      category: "Principal",
      title: "Principal's Desk",
      text: [
        "At Alok Inter College, we believe education is not just about books, but about building character, nurturing values, and inspiring a lifelong passion for learning.",
        "Our dedicated staff and holistic approach ensure that students excel academically while also growing into responsible citizens.",
      ],
      image:
        images.Principal ||
        "https://placehold.co/700x450/dae1f6/2f2f93?text=Principal+of+Alok+School",
      alt: "Principal of Alok School",
      reverse: true,
    },
    {
      id: "director",
      category: "Director",
      title: "Director's Desk",
      text: [
        "Education is the most powerful tool that can transform lives and societies. At Alok Inter College, our goal is to provide a nurturing environment where innovation, discipline, and creativity are encouraged.",
        "We are committed to building an institution that fosters intellectual growth, leadership, and values.",
      ],
      image:
        images.Director ||
        "https://placehold.co/700x450/dae1f6/2f2f93?text=Director+of+Alok+School",
      alt: "Director of Alok School",
      reverse: false,
    },
    {
      id: "vision",
      category: "Vision",
      title: "Vision & Mission",
      text: [
        "Our goal is to provide a nurturing environment where innovation, discipline, and creativity are encouraged.",
        "We foster intellectual growth, leadership, and values, shaping future leaders for the nation.",
      ],
      image:
        images.Vision ||
        "https://placehold.co/700x450/dae1f6/2f2f93?text=Our+Vision+and+Mission",
      alt: "Our Vision and Mission",
      reverse: true,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="absolute -top-20 left-10 w-40 h-40 bg-indigo-200/30 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-10 w-52 h-52 bg-purple-300/30 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center text-4xl md:text-5xl font-extrabold text-indigo-900 mb-12"
        >
          Shaping Futures with Excellence
        </motion.h1>

        {sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            className={`flex flex-col md:flex-row items-center gap-10 md:gap-20 mb-20 ${
              section.reverse ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image Block */}
            <motion.div
              className="w-full md:w-1/2 relative"
              initial={{ x: section.reverse ? 130 : -130, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="w-full h-[260px] md:h-[320px] overflow-hidden rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.13)]">
                <SmartImage
                  src={section.image}
                  alt={section.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.05]"
                />
              </div>

              <div className="absolute inset-0 -z-10 translate-x-6 translate-y-6 bg-indigo-300/20 rounded-2xl" />
            </motion.div>

            {/* Text Block */}
            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4">
                {section.title}
              </h2>

              {section.text.map((line, idx) => (
                <p
                  key={idx}
                  className="text-gray-700 text-lg leading-relaxed mb-4"
                >
                  {line}
                </p>
              ))}
            </motion.div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full fill-white"
        >
          <path d="M0,64L120,58.7C240,53,480,43,720,48C960,53,1200,75,1320,85.3L1440,96L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z" />
        </svg>
      </div>
    </section>
  );
}
