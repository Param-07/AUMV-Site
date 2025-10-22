import React from "react";
import { CalendarDays, Bell, Images, Video } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      icon: CalendarDays,
      label: "Upcoming Events",
      value: 8,
      sub: "3 this week",
      color: "bg-green-100 text-green-500",
    },
    {
      icon: Bell,
      label: "Active Announcements",
      value: 5,
      sub: "2 pending",
      color: "bg-blue-100 text-blue-500",
    },
    {
      icon: Images,
      label: "Gallery Items",
      value: 342,
      sub: "+28 this month",
      color: "bg-pink-100 text-pink-500",
    },
    {
      icon: Video,
      label: "Videos",
      value: 24,
      sub: "+5 this month",
      color: "bg-yellow-100 text-yellow-500",
    },
  ];
  const actions = [
    {
      icon: CalendarDays,
      label: "Add Events",
      color: "bg-green-500 text-white",
    },
    { icon: Bell, label: "Add Announcement", color: "bg-blue-500 text-white" },
    { icon: Images, label: "Add Images", color: "bg-pink-500 text-white" },
    { icon: Video, label: "Add Videos", color: "bg-yellow-500 text-white" },
  ];
  const Activity = [
    
  ]

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen overflow-y-auto">
      <div className="mb-6 p-6 rounded-xl bg-gradient-to-r from-purple-800 via-purple-500 to-purple-900 text-white">
        <h1 className="text-2xl font-bold">Welcome back, sir </h1>
        <p>Here's what's happening with your college website today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {stats.map(({ icon: Icon, label, value, sub, color }) => (
          <div
            key={label}
            className="bg-white rounded-xl p-5 shadow flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${color}`}>
                <Icon />
              </div>
              <div>
                <p className="text-gray-500">{label}</p>
                <h2 className="text-xl font-bold">{value}</h2>
                <p className="text-gray-400 text-sm">{sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className=" p-6 rounded-xl bg-white shadow mt-6 ">
        <h1 className="mb-5">Quick Actions</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {actions.map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className=" rounded-xl shadow justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <button
                  className={`p-8 rounded-lg flex flex-col h-full w-full items-center justify-center ${color}`}
                >
                  <Icon />
                  <p className="text-white-500">{label}</p>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=" p-6 rounded-xl bg-white shadow mt-6">
        <h1 className="mb-5">Recent Activity</h1>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Dashboard;