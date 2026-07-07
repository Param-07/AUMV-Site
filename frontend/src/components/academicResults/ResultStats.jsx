import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  Star,
  Award,
} from "lucide-react";
import { apiRequest } from "../../utils/ApiCall";

const ResultsStats = ({ classId }) => {
  const [achievers, setAchievers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await apiRequest(
          "GET",
          "/achievers/getAchievers"
        );

        if (res.message === "success") {
          setAchievers(res.achievers || []);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, []);

  const filtered = useMemo(() => {
    return achievers.filter(
      (a) =>
        String(a.class) ===
          (classId === "10" ? "10th" : "12th")
    );
  }, [achievers, classId]);

  const stats = useMemo(() => {
    const highest =
      filtered.length > 0
        ? Math.max(
            ...filtered.map((s) =>
              Number(s.percentage || 0)
            )
          )
        : 0;

    const topperNames = filtered
      .filter((s) => Number(s.percentage || 0) === highest)
      .map((s) => s.name || "N/A")
      .filter(Boolean);

    const above90 = filtered.filter(
      (s) => Number(s.percentage || 0) >= 90
    ).length;

    return {
      topper: topperNames.length > 0 ? topperNames.join(", ") : "N/A",
      highest,
      above90,
      total: filtered.length,
    };
  }, [filtered]);

  const cards = [
    {
      title: "Highest Score",
      value: `${stats.highest}%`,
      icon: Trophy,
      color: "text-yellow-500",
    },
    {
      title: "Students Above 90%",
      value: stats.above90,
      icon: Medal,
      color: "text-red-600",
    },
    {
      title: "Total Achievers",
      value: stats.total,
      icon: Award,
      color: "text-indigo-700",
    },
    {
      title: "School Topper",
      value:
        stats.topper?.split(" ")[0] ||
        "N/A",
      icon: Star,
      color: "text-green-600",
    },
  ];

  return (
    <section className="pt-36 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="uppercase tracking-[0.25em] text-[#cca730] font-semibold text-sm">
            Performance Overview
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#15157d] mt-4 mb-5">
            Result Statistics
          </h2>

          <div className="w-24 h-1 bg-[#cca730] mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="bg-white border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <Icon
                  size={40}
                  className={`${card.color} mb-5`}
                />

                <div className="text-4xl font-black text-[#15157d] mb-3">
                  {card.value}
                </div>

                <p className="uppercase tracking-[0.2em] text-xs text-gray-500">
                  {card.title}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ResultsStats;