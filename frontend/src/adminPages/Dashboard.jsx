import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Bell,
  Images,
  Video,
  Sun,
  Moon,
  Activity as ActivityIcon,
  Users,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const [activities, setActivities] = useState([
    {
      id: 1,
      label: "Gallery Updated",
      description: "5 new photos added to Annual Function album.",
      time: "10 min ago",
      icon: Images,
    },
    {
      id: 2,
      label: "Event Created",
      description: "Science Exhibition scheduled for next week.",
      time: "45 min ago",
      icon: CalendarDays,
    },
    {
      id: 3,
      label: "Announcement",
      description: "New circular for unit test published.",
      time: "2 hours ago",
      icon: Bell,
    },
  ]);

  const stats = [
    {
      icon: CalendarDays,
      label: "Upcoming Events",
      value: 8,
      sub: "3 this week",
      colorLight: "bg-blue-100 text-blue-600",
      colorDark: "bg-blue-500/20 text-blue-300",
    },
    {
      icon: Bell,
      label: "Active Announcements",
      value: 5,
      sub: "2 pending",
      colorLight: "bg-yellow-100 text-yellow-600",
      colorDark: "bg-yellow-500/20 text-yellow-300",
    },
    {
      icon: Images,
      label: "Gallery Items",
      value: 342,
      sub: "+28 this month",
      colorLight: "bg-indigo-100 text-indigo-600",
      colorDark: "bg-indigo-500/20 text-indigo-300",
    },
    {
      icon: Video,
      label: "Videos",
      value: 24,
      sub: "+5 this month",
      colorLight: "bg-rose-100 text-rose-600",
      colorDark: "bg-rose-500/20 text-rose-300",
    },
  ];

  const actions = [
    {
      icon: CalendarDays,
      label: "Add Event",
      route: "/events",
      activityMessage: "Opened Events section to add a new event.",
    },
    {
      icon: Bell,
      label: "Add Announcement",
      route: "/announcements",
      activityMessage: "Opened Announcements to publish a new notice.",
    },
    {
      icon: Images,
      label: "Add Image",
      route: "/adminGallery",
      activityMessage: "Opened Photo Gallery to upload images.",
    },
    {
      icon: Video,
      label: "Add Video",
      route: "/videos",
      activityMessage: "Opened Video Gallery to upload a new video.",
    },
  ];

  const admissionsData = [
    { month: "Apr", admissions: 30 },
    { month: "May", admissions: 45 },
    { month: "Jun", admissions: 52 },
    { month: "Jul", admissions: 60 },
    { month: "Aug", admissions: 48 },
    { month: "Sep", admissions: 40 },
  ];

  const resultsData = [
    { name: "Class 9", percentage: 88 },
    { name: "Class 10", percentage: 92 },
    { name: "Class 11", percentage: 85 },
    { name: "Class 12", percentage: 94 },
  ];

  const handleActionClick = (action) => {
    if (action.route) navigate(action.route);
    const NewIcon = action.icon;
    const newEntry = {
      id: Date.now(),
      label: action.label,
      description: action.activityMessage,
      time: "Just now",
      icon: NewIcon,
    };
    setActivities((prev) => [newEntry, ...prev].slice(0, 7));
  };

  const rootBg = darkMode
    ? "bg-slate-950 text-slate-50"
    : "bg-gray-100 text-slate-900";
  const cardBg = darkMode ? "bg-slate-900 border-slate-800" : "bg-white";
  const borderColor = darkMode ? "border-slate-800" : "border-gray-200";
  const textSubtle = darkMode ? "text-slate-400" : "text-gray-500";

  return (
    <div className={`flex-1 p-6 min-h-screen overflow-y-auto ${rootBg}`}>
      <div className="flex items-center justify-between mb-6 gap-4">
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex-1 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-700 to-indigo-600 text-white shadow-lg"
        >
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
            Welcome back, Sir 👋
          </h1>
          <p className="mt-1 text-indigo-200 text-sm md:text-base">
            Here is a quick overview of what’s happening on your school website
            today.
          </p>
        </motion.div>

        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className={`shrink-0 ml-2 p-3 rounded-2xl border ${borderColor} ${
            darkMode ? "bg-slate-900" : "bg-white"
          } shadow-sm hover:shadow-md transition flex items-center gap-2`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span className="hidden md:inline text-sm">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map(
          (
            { icon: Icon, label, value, sub, colorLight, colorDark },
            index
          ) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className={`rounded-2xl px-6 py-5 shadow hover:shadow-lg transition-all border ${borderColor} ${cardBg}`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl ${
                    darkMode ? colorDark : colorLight
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className={`${textSubtle} text-xs uppercase tracking-wide`}>
                    {label}
                  </p>
                  <h2 className="text-2xl font-bold mt-1">{value}</h2>
                  <p className={`${textSubtle} text-xs mt-0.5`}>{sub}</p>
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className={`rounded-2xl p-6 shadow border ${borderColor} ${cardBg}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Users size={18} />
                Admissions Trend
              </h2>
              <p className={`${textSubtle} text-xs mt-1`}>
                Monthly new admissions overview
              </p>
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={admissionsData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="month" stroke={darkMode ? "#e5e7eb" : "#4b5563"} />
                <YAxis stroke={darkMode ? "#e5e7eb" : "#4b5563"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#020617" : "#ffffff",
                    borderRadius: 12,
                    borderColor: "#e5e7eb",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="admissions"
                  stroke="#4f46e5"
                  strokeWidth={2.2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          viewport={{ once: true }}
          className={`rounded-2xl p-6 shadow border ${borderColor} ${cardBg}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp size={18} />
                Board Results
              </h2>
              <p className={`${textSubtle} text-xs mt-1`}>
                Average percentage by class
              </p>
            </div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resultsData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="name" stroke={darkMode ? "#e5e7eb" : "#4b5563"} />
                <YAxis stroke={darkMode ? "#e5e7eb" : "#4b5563"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#020617" : "#ffffff",
                    borderRadius: 12,
                    borderColor: "#e5e7eb",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="percentage" radius={[8, 8, 0, 0]} fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          viewport={{ once: true }}
          className={`rounded-2xl p-6 shadow border ${borderColor} ${cardBg}`}
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ActivityIcon size={18} />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {actions.map(({ icon: Icon, label, route, activityMessage }) => (
              <motion.button
                key={label}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  handleActionClick({ icon: Icon, label, route, activityMessage })
                }
                className={`flex flex-col items-center justify-center rounded-xl px-3 py-4 text-xs md:text-sm font-medium ${
                  darkMode
                    ? "bg-slate-900 text-slate-100 border border-slate-700"
                    : "bg-indigo-50 text-indigo-900 border border-indigo-100"
                } shadow-sm`}
              >
                <Icon className="mb-1 h-5 w-5" />
                <span className="text-center">{label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        viewport={{ once: true }}
        className={`mt-8 rounded-2xl p-6 shadow border ${borderColor} ${cardBg}`}
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ActivityIcon size={18} />
          Recent Activity
        </h2>
        {activities.length === 0 ? (
          <p className={textSubtle}>No recent activity yet.</p>
        ) : (
          <div className="space-y-4 border-l border-dashed border-indigo-300 pl-5">
            {activities.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="relative flex flex-col gap-1 pb-2"
                >
                  <span className="absolute -left-7 top-1 w-3 h-3 rounded-full bg-indigo-500 shadow-md"></span>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-indigo-500" />
                    <p className="font-medium text-sm">{item.label}</p>
                    <span className={`${textSubtle} text-[11px]`}>
                      • {item.time}
                    </span>
                  </div>
                  <p className={`${textSubtle} text-xs`}>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
