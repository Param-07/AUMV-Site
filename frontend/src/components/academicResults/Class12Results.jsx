import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import SmartImage from "../SmartImages";
import { apiRequest } from "../../utils/ApiCall";

const Class12Results = () => {
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

  const class12Students = useMemo(() => {
    return achievers.filter(
      (a) =>
        a.type === "Academic" &&
        String(a.class) === "12th"
    );
  }, [achievers]);

  const scienceStudents = useMemo(() => {
    return class12Students
      .filter(
        (s) =>
          s.branch &&
          s.branch.toLowerCase() === "science"
      )
      .sort(
        (a, b) =>
          Number(b.percentage || 0) -
          Number(a.percentage || 0)
      );
  }, [class12Students]);

  const humanitiesStudents = useMemo(() => {
    return class12Students
      .filter(
        (s) =>
          s.branch &&
          s.branch.toLowerCase() === "humanities"
      )
      .sort(
        (a, b) =>
          Number(b.percentage || 0) -
          Number(a.percentage || 0)
      );
  }, [class12Students]);

  const scienceTopper = scienceStudents[0];
  const humanitiesTopper = humanitiesStudents[0];

  const StreamCard = ({
    title,
    topper,
    students,
    color,
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white shadow-xl overflow-hidden"
    >
      <div
        className={`p-8 text-white ${color}`}
      >
        <h3 className="text-3xl font-bold">
          {title}
        </h3>

        <p className="mt-2 opacity-90">
          Stream Excellence
        </p>
      </div>

      {topper && (
        <div className="p-8 border-b border-slate-200">
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <SmartImage
                src={topper.photo}
                alt={topper.name}
                wrapperClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="uppercase text-xs tracking-[0.2em] text-gray-500">
                Stream Topper
              </div>

              <h4 className="text-2xl font-bold text-[#15157d] mt-1">
                {topper.name}
              </h4>

              <div className="text-4xl font-black text-red-700 mt-2">
                {topper.percentage}%
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-8">
        <div className="space-y-4">
          {students.slice(0, 5).map(
            (student, index) => (
              <div
                key={student.id}
                className="flex items-center justify-between border-b border-slate-100 pb-4"
              >
                <div>
                  <div className="font-semibold text-[#15157d]">
                    {student.name}
                  </div>

                  <div className="text-sm text-gray-500">
                    Rank #{index + 1}
                  </div>
                </div>

                <div className="text-xl font-bold text-red-700">
                  {student.percentage}%
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="uppercase tracking-[0.25em] text-[#cca730] font-semibold text-sm">
            Intermediate Examination
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#15157d] mt-4">
            Class XII Results
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">

          <StreamCard
            title="Science Stream"
            topper={scienceTopper}
            students={scienceStudents}
            color="bg-[#15157d]"
          />

          <StreamCard
            title="Humanities Stream"
            topper={humanitiesTopper}
            students={humanitiesStudents}
            color="bg-red-700"
          />

        </div>

      </div>
    </section>
  );
};

export default Class12Results;