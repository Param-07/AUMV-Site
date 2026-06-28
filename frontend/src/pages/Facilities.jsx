import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Building2 } from "lucide-react";
import useScrollToTop from "../hooks/useScrollToTop";
import { useAppData } from "../context/AppDataContext";
import SmartImage from "../components/SmartImages";

const Facilities = () => {
  useScrollToTop();

  const { facilities = [] } = useAppData();

  const navigate = useNavigate();
  const { facilityId } = useParams();

  const defaultDescriptions = {
    "Computer Lab": [
      "Our modern Computer Lab provides students with hands-on experience in programming, digital literacy, and emerging technologies.",
      "Equipped with high-speed internet and updated systems, it helps students build strong technical foundations."
    ],

    Library: [
      "The library serves as a center for learning, exploration, and research.",
      "Students have access to a wide collection of academic, reference, and recreational books."
    ],

    Playground: [
      "Our spacious playground encourages physical fitness, teamwork, and sportsmanship.",
      "Students participate in various outdoor activities and inter-school competitions throughout the year."
    ]
  };

  const sections = useMemo(() => {
    return facilities.map((item) => ({
      id: item.category.toLowerCase().replace(/\s+/g, "-"),
      title: item.category,
      images: item.facilities?.map((f) => f.src) || [],
      text: defaultDescriptions[item.category] || [
        "This facility plays an important role in supporting students' overall growth and development."
      ]
    }));
  }, [facilities]);

  const [activeFacility, setActiveFacility] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (!sections.length) return;

    if (!facilityId) {
      setActiveFacility(0);
      return;
    }

    const index = sections.findIndex(
      (section) => section.id === facilityId
    );

    if (index >= 0) {
      setActiveFacility(index);
      setCurrentImage(0);
    }
  }, [facilityId, sections]);

  const selectedFacility = sections[activeFacility];

  useEffect(() => {
    if (!selectedFacility?.images?.length) return;

    const timer = setInterval(() => {
      setCurrentImage(
        (prev) => (prev + 1) % selectedFacility.images.length
      );
    }, 3500);

    return () => clearInterval(timer);
  }, [selectedFacility]);

  const handleFacilityChange = (index) => {
    navigate(`/facilities/${sections[index].id}`);
  };

  if (!sections.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          No facilities available.
        </p>
      </div>
    );
  }

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50 to-white py-16 md:py-24 overflow-hidden" style={{ marginTop: "95px" }}>
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-4">
            {activeFacility === 0 ? "Facilities At AIC" : sections[activeFacility].title}
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Discover the infrastructure and learning spaces that help
            students achieve academic excellence and holistic growth.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          {/* LEFT SECTION */}
          <div>
            {/* IMAGE SLIDER */}
            <div className="relative aspect-[16/9] overflow-hidden shadow-2xl bg-gray-200">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0"
                >
                  <SmartImage
                    src={selectedFacility.images[currentImage]}
                    alt={selectedFacility.title}
                    width={1400}
                    wrapperClassName="w-full h-full"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* DOTS */}
            {selectedFacility.images.length > 1 && (
              <div className="flex justify-center gap-2 mt-5">
                {selectedFacility.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentImage === idx
                        ? "bg-indigo-600 scale-110"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* DESCRIPTION */}
            <motion.div
              key={activeFacility}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-lg mt-8 p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-7 h-7 text-indigo-600" />

                <h2 className="text-3xl font-bold text-indigo-900">
                  {selectedFacility.title}
                </h2>
              </div>

              {selectedFacility.text.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-700 leading-relaxed text-lg mb-4"
                >
                  {paragraph}
                </p>
              ))}

              <div className="mt-6 text-sm text-gray-500">
                Facility {activeFacility + 1} of {sections.length}
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div>
            <div className="sticky top-24 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-indigo-700 to-indigo-600 text-white p-5">
                <h3 className="text-xl font-bold">
                  School Facilities
                </h3>

                <p className="text-indigo-100 text-sm mt-1">
                  Select a facility to explore
                </p>
              </div>

              <div className="p-3">
                {sections.map((facility, index) => (
                  <button
                    key={facility.id}
                    onClick={() => handleFacilityChange(index)}
                    className={`w-full text-left p-4 rounded-2xl mb-2 transition-all duration-300 ${
                      activeFacility === index
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "hover:bg-indigo-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {facility.title}
                      </span>

                      {activeFacility === index && (
                        <span className="text-sm">●</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Facilities;
