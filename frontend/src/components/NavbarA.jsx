import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Trophy,
  CalendarDays,
  Bell,
  Images,
  Video,
  Settings,
  LogOut,
  GraduationCap,
  Menu,
  Search,
  X,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const NavbarA = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", color: "text-purple-600", path: "/" },
    { icon: Users, label: "Teachers", color: "text-blue-400", path: "/teachers" },
    { icon: Trophy, label: "Achievers", color: "text-orange-500", path: "/achievers" },
    { icon: CalendarDays, label: "News/Events", color: "text-green-400", path: "/news-events" },
    { icon: Bell, label: "Announcements", color: "text-blue-600", path: "/announcements" },
    { icon: Images, label: "Gallery", color: "text-pink-400", path: "/gallery" },
    { icon: Video, label: "Video Gallery", color: "text-orange-400", path: "/videos" },
    { icon: Settings, label: "Settings", color: "text-gray-400", path: "/settings" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div>
          {/* Logo */}
          <div className="py-6 px-8 flex gap-4 border-b border-slate-300 items-center">
            <div className="border border-purple-900 flex justify-center items-center rounded-xl bg-purple-900 text-white">
              <GraduationCap className="m-3" />
            </div>
            <div>
              <h1 className="font-bold text-xl whitespace-nowrap">College Admin</h1>
              <p className="text-sm text-slate-600">Dashboard</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2">
            {menuItems.map(({ icon: Icon, label, color, path }) => {
              const isActive = location.pathname === path;

              return (
                <button
                  key={label}
                  onClick={() => navigate(path)}
                  className={`group flex gap-5 rounded-2xl w-full py-3 px-4 items-center transition
                    ${
                      isActive
                        ? "bg-purple-900 text-white"
                        : "hover:bg-gray-200 text-gray-700"
                    }`}
                >
                  <Icon className={`${isActive ? "text-white" : color}`} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Logout */}
        <div className="px-5 py-4 border-t">
          <button className="flex gap-5 rounded-xl w-full py-3 px-4 items-center hover:bg-red-200 text-red-500 transition">
            <LogOut className="text-red-500" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 lg:ml-64">
        {/* Top Navbar */}
        <div className="fixed top-0 left-0 lg:left-64 right-0 z-40 bg-white border-b flex items-center justify-between p-4">
          <div className="flex items-center w-full max-w-md">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden mr-3"
            >
              {sidebarOpen ? (
                <X className="p-2 h-9 w-9 rounded-md hover:bg-purple-900 hover:text-white transition" />
              ) : (
                <Menu className="p-2 h-9 w-9 rounded-md hover:bg-purple-900 hover:text-white transition" />
              )}
            </button>
            <div className="relative flex w-full items-center">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-purple-600" />
              <input
                type="text"
                placeholder="Search..."
                className="peer w-60 sm:w-full pl-10 pr-3 py-2 border rounded-full outline-none focus:ring-2 focus:ring-purple-800 bg-slate-100"
              />
            </div>
          </div>
          <div className="flex items-center gap-x-5">
            <div className="h-[50px] w-[50px] rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700 cursor-pointer">
              AB
            </div>
            <div className="hidden sm:block">
              <h1 className="font-semibold">Admin User</h1>
              <p className="text-sm text-gray-600">admincollege@edu</p>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="pt-20 min-h-screen bg-gray-100 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default NavbarA;
