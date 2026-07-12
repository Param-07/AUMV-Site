import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../../context/AppDataContext";
import SmartImage from "../SmartImages";

const FacilitiesGrid = () => {
  const navigate = useNavigate();
  const { facilities = [] } = useAppData();

  const [currentImages, setCurrentImages] = useState({});

  const defaultDescriptions = {
  "Computer Lab":
    "Modern computing infrastructure with high-speed internet, programming environments, and advanced digital tools to foster cutting-edge technological literacy.",

  "Smart Class":
    "Multimedia-enabled interactive learning spaces equipped with smartboards and audio-visual tools to elevate conceptual understanding and engagement.",

  "Library":
    "A comprehensive repository of academic literature, reference journals, and recreational media designed to cultivate a profound lifelong culture of reading.",

  "Transport":
    "A highly secure, strictly monitored, and well-managed fleet of school vehicles covering expansive routes to ensure comfortable daily commuting for students.",

  "Playground":
    "Expansive outdoor sports complexes and athletics fields designed to build physical fitness, strategic teamwork, competitive spirit, and leadership qualities.",

  "Science Lab":
    "Advanced scientific workstations fully equipped with premium apparatus for hands-on physics, chemistry, and biology experimentation and discovery.",
};

  const facilityCards = facilities.map((category) => ({
    id: category.category.toLowerCase().replace(/\s+/g, "-"),
    category: category.category,
    images: category.facilities?.map((f) => f.src) || [],
    description:
      defaultDescriptions[category.category] ||
      "Designed to support holistic student growth through modern infrastructure and academic excellence.",
  }));

  useEffect(() => {
    if (!facilityCards.length) return;

    const interval = setInterval(() => {
      setCurrentImages((prev) => {
        const updated = {};

        facilityCards.forEach((facility) => {
          const current = prev[facility.id] || 0;

          updated[facility.id] =
            (current + 1) %
            Math.max(facility.images.length, 1);
        });

        return updated;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [facilityCards]);

  if (!facilityCards.length) {
    return (
      <div className="text-center py-20 text-gray-500">
        No facilities available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      {facilityCards.map((facility, index) => {
        const isLarge = index % 3 === 0;

        const currentImage =
          facility.images[currentImages[facility.id] || 0];

        return (
          <motion.div
            key={facility.id}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`relative group bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#15157d] hover:-translate-y-2 transition-all duration-500 ${
              isLarge
                ? "md:col-span-8"
                : "md:col-span-4"
            }`}
          >
            {/* IMAGE SECTION */}

            <div
              className={`relative overflow-hidden ${
                isLarge
                  ? "aspect-video"
                  : "h-[260px]"
              }`}
            >
              <motion.div
                key={currentImage}
                initial={{ opacity: 0.4, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full"
              >
                <SmartImage
                  src={currentImage}
                  alt={facility.category}
                  wrapperClassName="w-full h-full"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Featured Badge */}
              {isLarge && (
                <div className="absolute top-4 right-4 bg-[#15157d] text-white px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                  Featured
                </div>
              )}

              {/* Image Indicators */}
              {facility.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {facility.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();

                        setCurrentImages((prev) => ({
                          ...prev,
                          [facility.id]: idx,
                        }));
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        (currentImages[facility.id] || 0) === idx
                          ? "w-6 bg-white"
                          : "w-2 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* CONTENT */}

            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-8 bg-[#cca730]" />

                <h3 className="text-2xl font-bold text-[#15157d]">
                  {facility.category}
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {facility.description}
              </p>

              {/* <button
                onClick={() =>
                  navigate(`/facilities/${facility.id}`)
                }
                className="inline-flex items-center gap-2 text-[#cca730] font-semibold hover:gap-4 transition-all duration-300"
              >
                Learn More

                <ArrowRight size={18} />
              </button> */}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FacilitiesGrid;