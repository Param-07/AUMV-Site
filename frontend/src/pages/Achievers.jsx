import React, { useEffect, useMemo, useState } from "react";
import { Trophy, GraduationCap, Sparkles } from "lucide-react";
import SmartImage from "../components/SmartImages";
import useScrollToTop from "../hooks/useScrollToTop";
import { apiRequest } from "../utils/ApiCall";
import { motion } from "framer-motion";

const podiumOrder = ["1st", "2nd", "3rd"];

const badgeColors = {
  "1st": "bg-yellow-400 text-black",
  "2nd": "bg-slate-300 text-black",
  "3rd": "bg-orange-400 text-black",
};

export default function AchieversPublic() {
  useScrollToTop();
  const [achievers, setAchievers] = useState([]);
  const [activeTab, setActiveTab] = useState("Academic");
  const [year, setYear] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiRequest("GET", "/achievers/getAchievers");
        if (res.message === "success") setAchievers(res.achievers || []);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    load();
  }, []);

  const years = useMemo(() => {
    const y = [...new Set(achievers.map((a) => a.year))].filter(Boolean);
    return ["All", ...y.sort((a, b) => b - a)];
  }, [achievers]);

  const filtered = useMemo(() => {
    return achievers.filter(
      (a) =>
        a.type === activeTab &&
        (year === "All" || String(a.year) === String(year))
    );
  }, [achievers, activeTab, year]);

  const topper = useMemo(() => {
    if (activeTab !== "Academic") return null;
    return filtered
      .filter((a) => a.rank === "1st")
      .sort((a, b) => (b.percentage || 0) - (a.percentage || 0))[0];
  }, [filtered, activeTab]);

  const classWise = useMemo(() => {
    const map = {};
    filtered.forEach((a) => {
      if (!a.class) return;
      if (!map[a.class]) map[a.class] = [];
      map[a.class].push(a);
    });
    return map;
  }, [filtered]);

  const podium = useMemo(
    () => podiumOrder.map((r) => filtered.find((a) => a.rank === r)),
    [filtered]
  );

  return (
    <section className="bg-gradient-to-b from-[#F4F1FF] to-white py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-3">
            Our Achievers
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Honouring excellence in academics and achievements beyond classrooms
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-6">
          {["Academic", "Extra Curricular"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition ${
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-white border border-indigo-200 text-indigo-700"
              }`}
            >
              {tab === "Academic" ? (
                <GraduationCap className="inline h-4 mr-2" />
              ) : (
                <Sparkles className="inline h-4 mr-2" />
              )}
              {tab}
            </button>
          ))}
        </div>

        {/* Year Filter */}
        <div className="flex justify-center mb-10">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="px-6 py-2 border rounded-xl text-indigo-700 font-medium shadow"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y === "All" ? "All Years" : y}
              </option>
            ))}
          </select>
        </div>

        {/* Topper of the Year */}
        {topper && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl"
          >
            <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-yellow-300">
              <SmartImage src={topper.photo} alt={topper.name} width={400} />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold flex items-center gap-2">
                <Trophy className="text-yellow-300" /> Topper of the Year
              </h2>
              <p className="text-xl mt-2 font-semibold">{topper.name}</p>
              <p className="opacity-90">
                Class {topper.class} • {topper.percentage}%
              </p>
              <p className="opacity-80 mt-1">{topper.year}</p>
            </div>
          </motion.div>
        )}

        {/* Podium */}
        <div className="flex justify-center gap-6 mb-20">
          {podium.map(
            (a, i) =>
              a && (
                <motion.div
                  key={a.id}
                  initial={{ y: 60, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.15 }}
                  className={`flex flex-col items-center ${
                    i === 0 ? "mt-10" : i === 2 ? "mt-16" : ""
                  }`}
                >
                  <div
                    className={`px-4 py-1 rounded-full text-sm font-bold mb-2 ${badgeColors[a.rank]}`}
                  >
                    {a.rank}
                  </div>
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-indigo-300">
                    <SmartImage src={a.photo} alt={a.name} width={300} />
                  </div>
                  <p className="font-semibold mt-2">{a.name}</p>
                </motion.div>
              )
          )}
        </div>

        {/* Class-wise Academic */}
        {activeTab === "Academic" &&
          Object.keys(classWise).map((cls) => (
            <div key={cls} className="mb-14">
              <h3 className="text-2xl font-bold text-indigo-800 mb-6">
                Class {cls}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {classWise[cls].map((a) => (
                  <div
                    key={a.id}
                    className="bg-white rounded-2xl shadow-xl p-6 text-center"
                  >
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-indigo-200">
                      <SmartImage src={a.photo} alt={a.name} width={300} />
                    </div>
                    <h4 className="mt-4 font-semibold text-lg">{a.name}</h4>
                    <p className="text-indigo-600">{a.percentage}%</p>
                    {a.rank && (
                      <span
                        className={`inline-block mt-2 px-3 py-1 text-xs rounded-full font-bold ${badgeColors[a.rank]}`}
                      >
                        {a.rank}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
