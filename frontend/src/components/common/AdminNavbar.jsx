import React, { useEffect, useState } from "react";
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
  RefreshCcw,
  Sun,
  Moon,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("r_token");
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
    <div className="flex h-screen overflow-hidden bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-slate-900 via-slate-950 to-black border-r border-slate-700/40 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div>
          <div className="py-6 px-8 flex gap-4 border-b border-slate-700/40 items-center">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white shadow-lg">
              <GraduationCap size={26} />
            </div>
            <div>
              <h1 className="font-semibold text-lg text-white">College Admin</h1>
              <p className="text-xs text-slate-400">Management Panel</p>
            </div>
          </div>

          <nav className="px-3 py-5 space-y-1">
            {menuItems.map(({ icon: Icon, label, path }) => {
              const isActive = location.pathname === path;
              return (
                <button
                  key={label}
                  onClick={() => navigate(path)}
                  className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl text-sm transition ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                      : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  {label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="px-4 py-4 border-t border-slate-700/40">
          <button
            onClick={handleLogout}
            className="flex gap-4 w-full px-4 py-3 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 lg:ml-64">
        {/* Header */}
        <header className="fixed top-0 left-0 lg:left-64 right-0 z-40 flex items-center justify-between px-5 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 w-full max-w-lg">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
              {sidebarOpen ? <X /> : <Menu />}
            </button>

            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm"
              />
            </div>

            {/* Refresh */}
            <button
              onClick={() => navigate(0)}
              className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 hover:rotate-180 transition"
              title="Refresh"
            >
              <RefreshCcw size={18} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-slate-200 dark:bg-slate-800"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="h-11 w-11 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold">
              {localStorage.getItem("username")?.[0] || "A"}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="pt-20 pb-6 min-h-screen px-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminNavbar;
