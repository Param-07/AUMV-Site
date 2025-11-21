import React, { useState } from "react";
import { useAppData } from "../context/AppDataContext";

export default function AchieversPublic() {
  const { achievers } = useAppData();
  const [selectedYear, setSelectedYear] = useState("All");

  const years = ["All", ...new Set(achievers.map((a) => a.year))];

  const filtered =
    selectedYear === "All"
      ? achievers
      : achievers.filter((a) => a.year === selectedYear);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-4xl text-center font-bold mb-10 text-purple-700">
        Our Achievers
      </h1>

      <div className="flex justify-center mb-8 gap-3 flex-wrap">
        {years.map((yr) => (
          <button
            key={yr}
            onClick={() => setSelectedYear(yr)}
            className={`px-4 py-2 rounded-full border transition ${
              selectedYear === yr
                ? "bg-purple-700 text-white"
                : "bg-white text-purple-700 border-purple-700 hover:bg-purple-100"
            }`}
          >
            {yr}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((ach, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 p-6"
          >
            <div className="w-full h-56 rounded-lg overflow-hidden mb-4">
              <img
                src={ach.photo}
                alt={ach.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-xl font-bold">{ach.name}</h2>

            <p className="text-purple-700 font-semibold mt-1">
              {ach.achievement}
            </p>

            <p className="mt-2 text-gray-600">{ach.description}</p>

            <div className="mt-3 text-sm opacity-70">
              <p>Class: {ach.class}</p>
              <p>Year: {ach.year}</p>
              {ach.percentage && <p>Percentage: {ach.percentage}%</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
