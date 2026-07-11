import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  BadgePercent,
  GraduationCap,
  HeartHandshake,
} from "lucide-react";
import scholar1 from "../../assets/images/Scholar1.jpeg"
import scholar2 from "../../assets/images/Scholar2.jpeg"
import scholar3 from "../../assets/images/Scholar3.jpeg"
import scholar4 from "../../assets/images/Scholar4.jpeg"

const scholarships = [
  {
    icon: Award,
    title: "Merit Scholarship",
    description:
      "Awarded to students with outstanding academic achievements and exceptional performance.",
  },
  {
    icon: BadgePercent,
    title: "Need-Based Support",
    description:
      "Financial assistance for deserving students from economically weaker backgrounds.",
  },
  {
    icon: GraduationCap,
    title: "Academic Excellence",
    description:
      "Special concessions for board toppers and students with remarkable academic records.",
  },
  {
    icon: HeartHandshake,
    title: "Special Category Aid",
    description:
      "Support programs available for eligible students under applicable categories.",
  },
];

const ScholarshipSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="uppercase tracking-[0.25em] text-red-700 font-semibold text-sm">
              Opportunities For All
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#15157d] mt-4 mb-6">
              Scholarships &
              <span className="block text-[#cca730]">
                Financial Aid
              </span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              We believe that quality education should be accessible to
              every deserving student. Our scholarship programs reward
              excellence, encourage talent, and support students who
              require financial assistance.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {scholarships.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all"
                  >
                    <Icon
                      size={28}
                      className="text-[#cca730] mb-3"
                    />

                    <h3 className="font-bold text-[#15157d] mb-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Editorial Image Layout */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-5">
                <div className="h-64 rounded-none overflow-hidden shadow-xl">
                  <img
                    src={scholar1}
                    alt="Scholarship"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="h-40 rounded-none overflow-hidden shadow-xl">
                  <img
                    src={scholar2}
                    alt="Students"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-5 pt-10">
                <div className="h-40 rounded-none overflow-hidden shadow-xl">
                  <img
                    src={scholar3}
                    alt="Education"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="h-64 rounded-none overflow-hidden shadow-xl">
                  <img
                    src={scholar4}
                    alt="Scholar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating Stat Card */}
            <div className="absolute -bottom-8 left-10 bg-[#15157d] text-white rounded-2xl px-8 py-6 shadow-2xl">
              <div className="text-4xl font-extrabold text-[#cca730]">
                100+
              </div>

              <p className="text-sm text-gray-300">
                Scholarships Awarded
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScholarshipSection;