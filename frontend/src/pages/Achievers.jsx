
import React, { useEffect, useMemo, useState } from "react";
import {
  Trophy,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import SmartImage from "../components/SmartImages";
import useScrollToTop from "../hooks/useScrollToTop";
import { apiRequest } from "../utils/ApiCall";

const badgeColors = {
  "1st": "bg-yellow-400 text-black",
  "2nd": "bg-slate-300 text-black",
  "3rd": "bg-orange-400 text-black",
};

const BRANCH_OPTIONS = ["Science", "Humanities"];

export default function AchieversPublic() {
  useScrollToTop();
  const location = useLocation();

  const [achievers, setAchievers] = useState([]);
  const [activeTab, setActiveTab] = useState("Academic");
  const [year, setYear] = useState("All");
  const [filterClass, setFilterClass] = useState(null); // Filter by specific class
  const [selectedBranch, setSelectedBranch] = useState("All"); // Filter by branch for class 12th
  const [loading, setLoading] = useState(true);

  // Detect class from URL hash
  useEffect(() => {
    const hash = location.hash;
    if (hash === "#top-scholars-10") {
      setFilterClass("10th");
    } else if (hash === "#top-scholars-12") {
      setFilterClass("12th");
    } else {
      setFilterClass(null);
    }
  }, [location.hash]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiRequest("GET", "/achievers/getAchievers");

        if (res.message === "success") {
          setAchievers(res.achievers || []);
        }
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    load();
  }, []);

  const years = useMemo(() => {
    const y = [...new Set(achievers.map((a) => a.year))].filter(Boolean);

    return ["All", ...y];
  }, [achievers]);

  const filtered = useMemo(() => {
    let result = achievers.filter(
      (a) =>
        a.type === activeTab &&
        (year === "All" || String(a.year) === String(year))
    );

    // Filter by class if specified via URL hash
    if (filterClass) {
      result = result.filter((a) => String(a.class) === String(filterClass));
    }

    // Filter by branch if class is 12th
    if (filterClass === "12th" && selectedBranch !== "All") {
      result = result.filter((a) => a.branch === selectedBranch);
    }

    return result;
  }, [achievers, activeTab, year, filterClass, selectedBranch]);

  const topper = useMemo(() => {
    if (activeTab !== "Academic") return null;

    return filtered
      .filter((a) => a.rank === "1st")
      .sort(
        (a, b) =>
          Number(b.percentage || 0) -
          Number(a.percentage || 0)
      )[0];
  }, [filtered, activeTab]);

  const podium = useMemo(() => {
    if (activeTab !== "Academic") return [];

    return [
      filtered.find((a) => a.rank === "1st"),
      filtered.find((a) => a.rank === "2nd"),
      filtered.find((a) => a.rank === "3rd"),
    ].filter(Boolean);
  }, [filtered, activeTab]);

  const classSort = (cls) => {
    const num = parseInt(String(cls).replace(/\D/g, ""));
    return isNaN(num) ? 999 : num;
  };

  const sortedClasses = useMemo(() => {
    const grouped = {};

    filtered.forEach((a) => {
      if (!a.class) return;

      const cls = String(a.class);

      if (!grouped[cls]) grouped[cls] = [];

      grouped[cls].push(a);
    });

    Object.keys(grouped).forEach((cls) => {
      grouped[cls].sort((a, b) => {
        const rankOrder = {
          "1st": 1,
          "2nd": 2,
          "3rd": 3,
        };

        return (
          (rankOrder[a.rank] || 99) -
          (rankOrder[b.rank] || 99)
        );
      });
    });

    return Object.keys(grouped)
      .sort((a, b) => classSort(a) - classSort(b))
      .map((cls) => ({
        className: cls,
        students: grouped[cls].slice(0, 3),
      }));
  }, [filtered]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-indigo-600 text-xl font-semibold">
          Loading Achievers...
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-indigo-900 mb-4">
            Our Achievers
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Celebrating excellence in academics and extracurricular achievements.
          </p>
        </div>

        {/* TABS */}
        <div className="flex justify-center gap-4 mb-8">
          {["Academic", "Extra Curricular"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
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

        {/* YEAR FILTER */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="px-8 py-4 rounded-xl border-2 border-indigo-300 shadow-md text-base font-semibold bg-white text-indigo-900 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition min-w-[300px]"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y === "All" ? "All Years" : y}
              </option>
            ))}
          </select>

          {/* BRANCH FILTER - Only show for class 12th */}
          {filterClass === "12th" && (
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-8 py-4 rounded-xl border-2 border-indigo-300 shadow-md text-base font-semibold bg-white text-indigo-900 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition min-w-[200px]"
            >
              <option value="All">All Branches</option>
              {BRANCH_OPTIONS.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          )}
        </div>


        {/* TOPPER OF THE YEAR */}
        {activeTab === "Academic" && topper && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 rounded-[32px] p-10 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center gap-8">

                <div className="w-44 h-44 rounded-full overflow-hidden ring-8 ring-yellow-300">
                  <SmartImage
                    src={topper.photo}
                    alt={topper.name}
                    width={500}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <Trophy
                      size={40}
                      className="text-yellow-300"
                    />
                    <h2 className="text-4xl font-black">
                      Topper Of The Year
                    </h2>
                  </div>

                  <h3 className="text-3xl font-bold">
                    {topper.name}
                  </h3>

                  <p className="text-xl mt-2">
                    Class {topper.class}
                  </p>

                  <p className="text-3xl font-black text-yellow-200 mt-3">
                    {topper.percentage}%
                  </p>

                  <p className="opacity-80 mt-2">
                    Session {topper.year}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )} 

        {/* CLASS WISE */}
        <div className="space-y-20">
          {sortedClasses.map((cls) => (
            <div key={cls.className} className="flex justify-end pr-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cls.students.map((student) => (
                  <motion.div
                    key={student.id}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all flex flex-col h-64"
                  >
                    {/* 70% Image Area */}
                    <div className="flex-[7] relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600">
                      <SmartImage
                        src={student.photo}
                        alt={student.name}
                        width={400}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Rank Badge */}
                      {/* <div className="absolute top-2 right-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-bold ${badgeColors[student.rank]}`}
                        >
                          {student.rank}
                        </span>
                      </div> */}
                    </div>

                    {/* 30% Text Area */}
                    <div className="flex-[3] bg-white p-2 flex flex-col justify-center items-center text-center">
                      <div className="flex items-center gap-3 justify-center">
                        <GraduationCap className="text-black-600" size={20} />
                        <h4 className="text-lg font-bold text-black-800 line-clamp-1">
                          {student.name}
                        </h4>
                      </div>

                      <p className="text-lg font-black text-red-600 mt-1">
                        {student.percentage}%
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

