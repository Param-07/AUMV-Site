import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
} from "lucide-react";

const RecentHighlights = () => {
  const highlights = [
    {
      category: "NEWS",
      date: "October 12, 2024",
      title: "Annual Sports Meet 2024 Triumph",
      description:
        "Our athletes demonstrated exceptional skill and sportsmanship, securing multiple gold medals and setting new records.",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1000",
    },
    {
      category: "ACADEMIC",
      date: "September 28, 2024",
      title: "Science & Technology Exhibition",
      description:
        "Students showcased innovative projects in robotics, AI, renewable energy and modern science.",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1000",
    },
    {
      category: "CULTURAL",
      date: "September 15, 2024",
      title: "Grand Cultural Festival Celebration",
      description:
        "A vibrant showcase of music, dance, drama and artistic performances celebrating our heritage.",
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
        >
          <div>
            <span className="uppercase tracking-[0.25em] text-red-700 font-semibold text-sm block mb-3">
              What's New
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#15157d]">
              Recent Highlights
            </h2>

            <div className="w-20 h-[3px] bg-[#cca730] mt-5 rounded-full" />
          </div>

          <button className="hidden lg:flex items-center gap-2 font-semibold text-[#15157d] hover:text-red-700 transition-all">
            View All News
            <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute top-4 left-4">
                  <span className="bg-[#cca730] text-black text-xs font-bold px-4 py-2 rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                  <CalendarDays size={15} />
                  {item.date}
                </div>

                <h3 className="text-2xl font-bold text-[#15157d] mb-4 group-hover:text-red-700 transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {item.description}
                </p>

                <button className="flex items-center gap-2 text-[#cca730] font-semibold group-hover:gap-4 transition-all">
                  Read More

                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Button */}
        <div className="flex justify-center mt-12 lg:hidden">
          <button className="flex items-center gap-2 bg-[#15157d] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#0f0f5e] transition-all">
            View All News
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecentHighlights;