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

const AdminNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("r_token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Teachers", path: "/teachers" },
    { icon: Trophy, label: "Achievers", path: "/achievers" },
    { icon: CalendarDays, label: "News/Events", path: "/events" },
    { icon: Bell, label: "Facilities", path: "/adminfacilities" },
    { icon: Images, label: "Gallery", path: "/adminGallery" },
    { icon: Video, label: "Video Gallery", path: "/videos" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 text-slate-800">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-slate-900 via-slate-950 to-black border-r border-slate-700/40 flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-2xl ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div>
          <div className="py-6 px-8 flex gap-4 border-b border-slate-700/40 items-center">
            <div className="flex justify-center items-center h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg">
              <GraduationCap size={26} />
            </div>
            <div>
              <h1 className="font-semibold text-lg tracking-tight text-white">College Admin</h1>
              <p className="text-[11px] text-slate-400">Management Panel</p>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1">
            {menuItems.map(({ icon: Icon, label, path }) => {
              const isActive = location.pathname === path;
              return (
                <button
                  key={label}
                  onClick={() => navigate(path)}
                  className={`group flex w-full items-center gap-4 px-4 py-3 rounded-xl text-sm transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md scale-[1.02]"
                      : "text-slate-300 hover:bg-slate-800/60 hover:scale-[1.01] hover:text-white"
                  }`}
                >
                  <Icon size={20} className={`${isActive ? "text-white" : "text-cyan-300 group-hover:text-cyan-400"}`} />
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="px-4 py-4 border-t border-slate-700/40">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-4 py-3 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 hover:text-red-300 transition font-medium"
          >
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      <div className="flex flex-col flex-1 lg:ml-64">
        <header className="fixed top-0 left-0 lg:left-64 right-0 z-40 flex items-center justify-between px-5 py-4 bg-white border-b border-slate-200 shadow-sm">
          <div className="flex items-center w-full max-w-lg">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden mr-4">
              {sidebarOpen ? (
                <X className="p-2 h-9 w-9 rounded-lg hover:bg-blue-600 hover:text-white transition" />
              ) : (
                <Menu className="p-2 h-9 w-9 rounded-lg hover:bg-blue-600 hover:text-white transition" />
              )}
            </button>

            <div className="relative flex items-center w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search here..."
                className="w-64 sm:w-full pl-11 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-blue-600 transition text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold shadow-md cursor-pointer select-none">
              AB
            </div>
            <div className="hidden sm:flex flex-col">
              <h1 className="font-semibold text-[15px]">{localStorage.getItem("username")}</h1>
              <p className="text-[12px] text-gray-500 tracking-wide">admincollege@edu</p>
            </div>
          </div>
        </header>

        <main className="pt-20 pb-6 min-h-screen bg-gray-100 px-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminNavbar;
