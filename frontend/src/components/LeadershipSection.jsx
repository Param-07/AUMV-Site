import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SmartImage from "./SmartImages";
import { apiRequest } from "../utils/ApiCall";

const LeadershipSection = () => {
  const [images, setImages] = useState({});
  const startDae = new Date("1994-01-01");
  const currentDate = new Date();
  const yearsLegacy = currentDate.getFullYear() - startDae.getFullYear();

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
      } catch (err) {
        console.error(err);
      }
    };

    loadImages();
  }, []);

  const leaders = [
    {
      title: "Director",
      name: "Shri Azad Bahadur Gupta",
      image: images.Director,
      quote:
        "Our mission is to create an environment where every child feels valued and inspired to reach their full potential. At Alok Inter College, we don't just teach; we ignite curiosity and nurture future leaders.",
    },
    {
      title: "Principal",
      name: "Dr. Anand Bahadur Gupta",
      image: images.Principal,
      quote:
        "Discipline, dedication, and integrity are the foundations of success. We are committed to providing every student with the knowledge and confidence required to excel in the modern world.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="uppercase tracking-[0.25em] text-red-700 font-semibold text-sm block mb-3">
            Voices of Guidance
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#15157d]">
            Leadership Perspective
          </h2>

          <div className="w-20 h-[3px] bg-[#cca730] mt-5 rounded-full" />
        </motion.div>

        {/* Leaders Grid */}
        <div className="grid lg:grid-cols-2 gap-14">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -60 : 60,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Image */}
                <div className="relative flex-shrink-0">
                  <div className="w-36 h-36 rounded-2xl overflow-hidden shadow-lg">
                    <SmartImage
                      src={
                        leader.image ||
                        "https://placehold.co/300x300/e2e8f0/475569?text=Leader"
                      }
                      alt={leader.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="absolute -bottom-3 -right-3 bg-[#cca730] p-3 rounded-xl shadow-lg">
                    <Quote className="text-white" size={20} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="italic text-gray-600 leading-relaxed text-lg mb-6">
                    "{leader.quote}"
                  </p>

                  <h4 className="text-2xl font-bold text-[#15157d]">
                    {leader.name}
                  </h4>

                  <span className="uppercase tracking-widest text-sm font-semibold text-red-700">
                    {leader.title}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {[
            [yearsLegacy+"+", "Years Legacy"],
            ["5000+", "Students"],
            ["100+", "Faculty"],
            ["100%", "Success Rate"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all"
            >
              <h3 className="text-3xl font-extrabold text-[#15157d]">
                {value}
              </h3>

              <p className="text-gray-500 mt-2">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LeadershipSection;