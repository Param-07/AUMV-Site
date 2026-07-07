import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import SmartImage from "../SmartImages";
import { apiRequest } from "../../utils/ApiCall";

const Class10Results = () => {
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

  const class10Students = useMemo(() => {
    return achievers
      .filter(
        (a) =>
          String(a.class) === "10th"
      )
      .sort(
        (a, b) =>
          Number(b.percentage || 0) -
          Number(a.percentage || 0)
      );
  }, [achievers]);

  const topper = class10Students[0];

  const podium = class10Students.slice(0, 3);

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="uppercase tracking-[0.25em] text-[#cca730] font-semibold text-sm">
            High School Examination
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#15157d] mt-4">
            Class X Results
          </h2>
        </motion.div>

        {/* Topper Feature */}

        {topper && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white shadow-xl overflow-hidden mb-20"
          >
            <div className="grid lg:grid-cols-2">

              <div className="h-[450px] overflow-hidden">
                <SmartImage
                  src={topper.photo}
                  alt={topper.name}
                  wrapperClassName="w-full h-full"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-10 flex flex-col justify-center">
                <span className="uppercase tracking-[0.25em] text-[#cca730] font-semibold text-sm">
                  School Topper
                </span>

                <h3 className="text-5xl font-black text-[#15157d] mt-4">
                  {topper.name}
                </h3>

                <div className="text-7xl font-black text-red-700 mt-6 mb-4">
                  {topper.percentage}%
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Outstanding academic achievement with
                  exceptional performance in the High School
                  Board Examination.
                </p>
              </div>

            </div>
          </motion.div>
        )}

        {/* Podium */}

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {podium.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white shadow-lg overflow-hidden"
            >
              <div className="h-[280px] overflow-hidden">
                <SmartImage
                  src={student.photo}
                  alt={student.name}
                  wrapperClassName="w-full h-full"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 text-center">
                <div className="text-sm uppercase tracking-[0.2em] text-[#cca730] font-semibold">
                  Rank {index + 1}
                </div>

                <h4 className="text-2xl font-bold text-[#15157d] mt-3">
                  {student.name}
                </h4>

                <div className="text-4xl font-black text-red-700 mt-4">
                  {student.percentage}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Merit Table */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white shadow-xl overflow-hidden"
        >
          <div className="p-8 border-b border-slate-200">
            <h3 className="text-3xl font-bold text-[#15157d]">
              Merit List
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#15157d] text-white">
                  <th className="p-4 text-left">Rank</th>
                  <th className="p-4 text-left">Student</th>
                  <th className="p-4 text-left">Percentage</th>
                </tr>
              </thead>

              <tbody>
                {class10Students.map(
                  (student, index) => (
                    <tr
                      key={student.id}
                      className="border-b border-slate-100"
                    >
                      <td className="p-4 font-bold text-[#15157d]">
                        #{index + 1}
                      </td>

                      <td className="p-4 font-medium">
                        {student.name}
                      </td>

                      <td className="p-4 font-bold text-red-700">
                        {student.percentage}%
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Class10Results;