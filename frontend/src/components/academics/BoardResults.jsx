import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Award, Trophy } from "lucide-react";
import SmartImage from "../SmartImages";
import { apiRequest } from "../../utils/ApiCall";
import { useNavigate } from "react-router-dom";

const BoardResults = () => {
  const [achievers, setAchievers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
    useEffect(() => {
        const loadAchievers = async () => {
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
      } finally {
        setLoading(false);
      }
    };

    loadAchievers();
  }, []);

  const board10 = useMemo(() => {
    return achievers.filter(
      (a) =>
        a.type === "Academic" &&
        String(a.class) === "10th"
    );
  }, [achievers]);

  const board12 = useMemo(() => {
    return achievers.filter(
      (a) =>
        a.type === "Academic" &&
        String(a.class) === "12th"
    );
  }, [achievers]);

  const stats10 = useMemo(() => {
    const topper = board10.find(
      (s) => s.rank === "1st"
    );

    const highest =
      board10.length > 0
        ? Math.max(
            ...board10.map((s) =>
              Number(s.percentage || 0)
            )
          )
        : 0;

    const above90 = board10.filter(
      (s) => Number(s.percentage || 0) >= 90
    ).length;

    return {
      topper,
      highest,
      above90,
    };
  }, [board10]);

  const stats12 = useMemo(() => {
    const topper = board12.find(
      (s) => s.rank === "1st"
    );

    const highest =
      board12.length > 0
        ? Math.max(
            ...board12.map((s) =>
              Number(s.percentage || 0)
            )
          )
        : 0;

    const above90 = board12.filter(
      (s) => Number(s.percentage || 0) >= 90
    ).length;

    return {
      topper,
      highest,
      above90,
    };
  }, [board12]);

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center py-20">
            <div className="w-14 h-14 border-4 border-indigo-200 rounded-full"></div>
            <div className="absolute w-14 h-14 border-4 border-transparent border-t-indigo-700 rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#15157d] mb-4">
            Board Results
          </h2>

          <p className="uppercase tracking-[0.25em] text-red-700 font-semibold text-sm">
            Academic Excellence
          </p>
        </motion.div>

        {/* RESULT CARDS */}

        <div className="grid lg:grid-cols-2 gap-10">
          {/* CLASS X */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#15157d] p-10 border-t-4 border-[#cca730] shadow-xl"
          >
            <Award
              size={54}
              className="mx-auto mb-6 text-[#ffe088]"
            />

            <h3 className="text-3xl font-bold text-white text-center mb-2">
              Class X (High School)
            </h3>

            <div className="text-7xl font-black text-[#ffe088] text-center mb-4">
              {stats10.highest || 0}%
            </div>

            <p className="uppercase tracking-[0.25em] text-sm text-gray-300 text-center mb-8">
              Highest Score
            </p>

            {stats10.topper && (
              <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#cca730]">
                  <SmartImage
                    src={stats10.topper.photo}
                    alt={stats10.topper.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h4 className="mt-4 text-xl font-bold text-white">
                  {stats10.topper.name}
                </h4>

                <p className="text-[#ffe088] font-semibold">
                  School Topper
                </p>
              </div>
            )}

            <div className="space-y-3 text-gray-200 text-center mb-8">
              <p>
                {stats10.above90} Students Above 90%
              </p>

              <p>
                {board10.length} Academic Achievers
              </p>

              <p>
                Consistent Excellence in Board Results
              </p>
            </div>

            <button
                onClick={() => navigate("/academic-results/10")}
                className="w-full py-3 border-2 border-[#cca730] text-[#ffe088] font-semibold hover:bg-[#cca730] hover:text-black transition-all">
                View Detailed Results
            </button>
          </motion.div>

          {/* CLASS XII */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-gray-100 p-10 border-t-4 border-red-700 shadow-xl"
          >
            <Trophy
              size={54}
              className="mx-auto mb-6 text-red-700"
            />

            <h3 className="text-3xl font-bold text-[#15157d] text-center mb-2">
              Class XII (Intermediate)
            </h3>

            <div className="text-7xl font-black text-red-700 text-center mb-4">
              {stats12.highest || 0}%
            </div>

            <p className="uppercase tracking-[0.25em] text-sm text-gray-500 text-center mb-8">
              Highest Score
            </p>

            {stats12.topper && (
              <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-red-700">
                  <SmartImage
                    src={stats12.topper.photo}
                    alt={stats12.topper.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h4 className="mt-4 text-xl font-bold text-[#15157d]">
                  {stats12.topper.name}
                </h4>

                <p className="text-red-700 font-semibold">
                  School Topper
                </p>
              </div>
            )}

            <div className="space-y-3 text-gray-600 text-center mb-8">
              <p>
                {stats12.above90} Students Above 90%
              </p>

              <p>
                {board12.length} Academic Achievers
              </p>

              <p>
                Excellence in Science & Humanities
              </p>
            </div>

            <button
                onClick={() => navigate("/academic-results/12")}
                className="w-full py-3 bg-[#cca730] text-black font-semibold hover:opacity-90 transition-all">
                View Detailed Results
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BoardResults;