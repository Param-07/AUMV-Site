import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Trophy,
  CalendarDays,
  Bell,
  Images,
  Video,
  LogOut,
  GraduationCap,
  Menu,
  Search,
  X,
  RefreshCcw,
  Sun,
  Moon,
  Home,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const HEADER_H = 64; // px — single source of truth

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard",     path: "/dashboard"       },
  { icon: Home,            label: "Main Page",     path: "/mainpage"        },
  { icon: Users,           label: "Teachers",      path: "/teachers"        },
  { icon: Trophy,          label: "Achievers",     path: "/achievers"       },
  { icon: CalendarDays,    label: "News/Events",   path: "/events"          },
  { icon: Bell,            label: "Facilities",    path: "/adminfacilities" },
  { icon: Images,          label: "Gallery",       path: "/adminGallery"    },
  { icon: Video,           label: "Video Gallery", path: "/videos"          },
];

const AdminNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  const location = useLocation();
  const navigate  = useNavigate();

  /* Sync html class + localStorage whenever dark changes */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("r_token");
    navigate("/login");
  };

  /* ── theme tokens ── */
  const t = dark
    ? {
        shell:      "bg-slate-950 text-slate-100",
        sidebar:    "bg-slate-950 border-slate-800",
        sidebarDivider: "border-slate-800",
        navInactive:"text-slate-400 hover:bg-slate-800 hover:text-white",
        header:     "bg-slate-950/90 border-slate-800",
        searchBg:   "bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500",
        iconBtn:    "bg-slate-900 text-slate-300 hover:bg-slate-800",
        main:       "bg-slate-950",
        toggleIcon: <Sun  size={17} className="text-yellow-300" />,
      }
    : {
        shell:      "bg-white text-slate-900",
        sidebar:    "bg-white border-slate-200",
        sidebarDivider: "border-slate-200",
        navInactive:"text-slate-500 hover:bg-slate-100 hover:text-slate-900",
        header:     "bg-white/90 border-slate-200",
        searchBg:   "bg-slate-100 border-slate-200 text-slate-800 placeholder:text-slate-400",
        iconBtn:    "bg-slate-100 text-slate-600 hover:bg-slate-200",
        main:       "bg-white",
        toggleIcon: <Moon size={17} className="text-slate-500" />,
      };

  return (
    
    <div className={`${t.shell} h-screen overflow-hidden flex`}>

      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ════════════════════════════════
          SIDEBAR  (w-64, always on lg)
      ════════════════════════════════ */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-full w-64
          border-r flex flex-col
          transition-transform duration-300
          ${t.sidebar}
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo — exact same height as header */}
        <div
          style={{ height: HEADER_H }}
          className={`px-5 flex items-center gap-3 border-b ${t.sidebarDivider} flex-shrink-0`}
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-md flex-shrink-0">
            <GraduationCap className="text-white" size={20} />
          </div>
          <div className="min-w-0">
            <h1 className="font-semibold text-base leading-tight truncate">College Admin</h1>
            <p className="text-xs text-slate-400 truncate">Management Panel</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {menuItems.map(({ icon: Icon, label, path }) => {
            const active = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => { navigate(path); setSidebarOpen(false); }}
                className={`
                  flex items-center gap-3 w-full px-3 py-2.5 rounded-xl
                  text-sm font-medium transition-all duration-150
                  ${active
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                    : t.navInactive}
                `}
              >
                <Icon size={18} />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className={`p-3 border-t ${t.sidebarDivider} flex-shrink-0`}>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl
              bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all text-sm font-medium"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>

      {/* ════════════════════════════════
          RIGHT COLUMN  (header + main)
      ════════════════════════════════ */}
      <div className="flex flex-col flex-1 lg:ml-64 min-w-0">

        {/* ── Header ── */}
        <header
          style={{ height: HEADER_H }}
          className={`
            flex-shrink-0 w-full
            flex items-center justify-between
            px-5 border-b backdrop-blur-xl z-30
            ${t.header}
          `}
        >
          {/* Left: hamburger + search */}
          <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
            <button
              onClick={() => setSidebarOpen((s) => !s)}
              className="lg:hidden flex-shrink-0"
            >
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <div className="relative flex-1 max-w-sm">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search..."
                className={`
                  w-full pl-9 pr-4 py-2 rounded-xl border text-sm
                  outline-none focus:ring-2 focus:ring-cyan-400 transition
                  ${t.searchBg}
                `}
              />
            </div>
          </div>

          {/* Right: refresh, theme, avatar */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => navigate(0)}
              title="Refresh"
              className={`p-2.5 rounded-xl transition-all duration-500 hover:rotate-180 ${t.iconBtn}`}
            >
              <RefreshCcw size={17} />
            </button>

            <button
              onClick={() => setDark((d) => !d)}
              title="Toggle theme"
              className={`p-2.5 rounded-xl transition ${t.iconBtn}`}
            >
              {t.toggleIcon}
            </button>

            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600
              text-white flex items-center justify-center font-semibold text-sm select-none">
              {localStorage.getItem("username")?.[0]?.toUpperCase() ?? "A"}
            </div>
          </div>
        </header>

        {/* ── Page content ── */}
        {/* flex-1 + overflow-y-auto fills the remaining height exactly — no gap */}
        <main className={`flex-1 overflow-y-auto ${t.main}`}>
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminNavbar;