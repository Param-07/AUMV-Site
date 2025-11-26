import React from "react";
import { motion } from "framer-motion";
import useScrollToTop from "../hooks/useScrollToTop";

const Facilities = () => {
  useScrollToTop();

  const sections = [
    {
      id: "computer-lab",
      title: "Computer Lab",
      text: [
        "Our state-of-the-art Computer Lab is equipped with modern systems, high-speed internet, and updated software curriculum ensuring students learn programming, digital literacy, and creative computing skills.",
        "Under the supervision of trained faculty, students get hands-on exposure to technology that prepares them for the fast-evolving digital world.",
      ],
      image:
        "https://placehold.co/700x450/e4e7fb/222?text=Modern+Computer+Lab",
      alt: "Computer Lab",
      reverse: false,
    },
    {
      id: "library",
      title: "Library",
      text: [
        "Our library is a peaceful knowledge hub with thousands of academic and non-fiction books, reference journals, newspapers, and digital study material.",
        "Students are encouraged to develop a love for reading, research, and self-learning in a quiet and comfortable learning environment.",
      ],
      image:
        "https://placehold.co/700x450/e4e7fb/222?text=School+Library",
      alt: "Library",
      reverse: true,
    },
    {
      id: "transport",
      title: "Transport",
      text: [
        "Our school provides safe and reliable transportation through well-maintained buses covering major areas and remote locations for students and faculty.",
        "Each bus is equipped with experienced drivers, GPS support, and supervision to ensure punctuality and safety at every step.",
      ],
      image:
        "https://placehold.co/700x450/e4e7fb/222?text=School+Transport",
      alt: "Transport",
      reverse: false,
    },
    {
      id: "sports",
      title: "Sports Complex",
      text: [
        "A sound mind resides in a sound body — with this belief, our school offers spacious playgrounds and dedicated sports facilities for cricket, football, volleyball, badminton, and athletics.",
        "Students regularly participate in physical activities, inter-school tournaments, and fitness programs to build teamwork, leadership, and discipline.",
      ],
      image:
        "https://placehold.co/700x450/e4e7fb/222?text=Sports+Complex",
      alt: "Sports Complex",
      reverse: true,
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 py-16 md:py-24 overflow-hidden">
      {/* Floating gradient accents */}
      <div className="absolute top-0 left-0 w-52 h-52 bg-indigo-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-0 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl"></div>

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

        {sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            className={`flex flex-col md:flex-row items-center gap-10 md:gap-20 mb-24 ${
              section.reverse ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image Block */}
            <motion.div
              className="w-full md:w-1/2 relative"
              initial={{ x: section.reverse ? 120 : -120, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <img
                src={section.image}
                alt={section.alt}
                className="w-full h-auto rounded-2xl shadow-xl transform hover:scale-[1.02] transition duration-500"
              />
              {/* Accent behind image */}
              <div className="absolute inset-0 -z-10 translate-x-6 translate-y-6 bg-indigo-200/25 rounded-2xl"></div>
            </motion.div>

            {/* Text Block */}
            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
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

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
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
};

export default Facilities;
