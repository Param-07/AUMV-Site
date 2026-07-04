
import React, { useEffect, useMemo, useState } from "react";
import {
  Trophy,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import SmartImage from "../SmartImages";
import useScrollToTop from "../../hooks/useScrollToTop";
import { apiRequest } from "../../utils/ApiCall";
import AcademicsHero from "./AcademicsHero";
import ScholasticPath from "./ScholasticPath";
import AcademicFramework from "./AcademicFramework";
import BoardResults from "./BoardResults";
import Methodology from "./Methodology";

const badgeColors = {
  "1st": "bg-yellow-400 text-black",
  "2nd": "bg-slate-300 text-black",
  "3rd": "bg-orange-400 text-black",

};

const BRANCH_OPTIONS = ["Science", "Humanities"];

export default function Academics() {
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

  const ContentLoader = () => (
  <div className="flex flex-col items-center justify-center py-24">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-indigo-200 rounded-full"></div>

      <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin"></div>
    </div>

    <p className="mt-6 text-lg font-semibold text-gray-600">
      Loading achievers...
    </p>
  </div>
);
  return (
    <>
    <AcademicsHero />
    <ScholasticPath />
    <AcademicFramework />
    <BoardResults />
    <Methodology />
    </>);
}

