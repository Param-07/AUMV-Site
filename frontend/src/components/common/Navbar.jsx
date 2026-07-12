import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Download,
  ArrowLeft,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import logo from "../../assets/images/logo.png";

const NavLink = ({
  children,
  to,
  hasDropdown = false,
  isHash = false,
  className = "",
  onClick,
}) => {
  const location = useLocation();

  const isActive = isHash
    ? location.pathname + location.hash === to
    : location.pathname === to;

  if (hasDropdown) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`relative flex items-center px-3 py-2 text-[15px] font-semibold transition-all duration-300 ${
          isActive
            ? "text-[#15157d]"
            : "text-slate-600 hover:text-[#cca730]"
        } ${className}`}
      >
        {children}
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>
    );
  }

  const Component = isHash ? HashLink : Link;

  return (
    <Component
      smooth
      to={to}
      onClick={onClick}
      className={`relative px-3 py-2 font-semibold transition-all duration-300 ${
        isActive
          ? "text-[#15157d]"
          : "text-slate-600 hover:text-[#cca730]"
      } ${className}`}
    >
      {children}

      <span
        className={`absolute left-3 right-3 -bottom-[2px] h-[2px] bg-[#cca730] transition-all duration-300 ${
          isActive
            ? "opacity-100 scale-x-100"
            : "opacity-0 scale-x-0"
        }`}
      />
    </Component>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const handleDropdownToggle = (dropdown) =>
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAdmissionsPage = location.pathname === "/admissions";

  return (
    <>
      {/* ================= TOP CONTACT & UTILITY BAR ================= */}
      <div
        className={`
          fixed top-0 left-0 right-0 z-50 
          bg-slate-900 text-slate-100 
          /* Scaled micro-typography with rigid layout bounds to lock alignment math */
          text-[10px] xs:text-[11px] sm:text-sm 
          h-[54px] sm:h-[40px] 
          px-4 
          transition-transform duration-300 
          ${isScrolled ? "-translate-y-full" : "translate-y-0"}
        `}
      >
        <div className="max-w-7xl mx-auto h-full flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-1 sm:gap-0 py-1 sm:py-0">
          {/* Contact Details Wrapper Grid Layout */}
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-0.5 sm:gap-6">
            <span className="flex items-center gap-1 sm:gap-2">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-amber-300" /> +91 7398332780
            </span>
            <span className="flex items-center gap-1 sm:gap-2">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-amber-300" /> alokic003@gmail.com
            </span>
            <span className="flex items-center gap-1 sm:gap-2 hidden xs:flex">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-amber-300" /> Chandauli, UP
            </span>
          </div>

          {/* Quick Portal Action Sub-Links */}
          <div className="flex items-center gap-4 text-slate-300">
            <a href="#" className="hover:text-amber-200 transition-colors font-medium text-amber-300">
              Alumni
            </a>
            <a href="#" className="hover:text-amber-200 transition-colors font-medium text-amber-300">
              Jobs
            </a>
            <a
              href="/#/login"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-200 transition-colors font-medium text-amber-300"
            >
              Login
            </a>
          </div>
        </div>
      </div>

      {/* ================= MAIN NAVIGATION PANEL ================= */}
      <nav
        className={`
          fixed left-0 right-0 z-40 
          bg-white/90 backdrop-blur-xl 
          border-b border-slate-200 shadow-sm 
          transition-all duration-300 
          /* Responsive offset calculations matching the structural height metrics above */
          ${isScrolled ? "top-0" : "top-[54px] sm:top-[40px]"}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 md:py-2.5">
            <Link to="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center ring-2 ring-indigo-700/20 shadow-md transition-transform group-hover:scale-[1.04]">
                <img src={logo} alt="School Logo" className="w-full h-full object-contain p-1" />
              </div>
              <div>
                <h3 className="text-indigo-900 text-base sm:text-xl font-semibold tracking-tight group-hover:text-indigo-700 transition">
                  ALOK INTER COLLEGE
                </h3>
                <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Chandauli
                </p>
              </div>
            </Link>

            {/* Desktop Menu Options Grid Layout */}
            {!isAdmissionsPage && (
              <div className="hidden lg:flex items-center space-x-1 text-sm">
                {[
                  { label: "Home", to: "/" },
                  { label: "Academics", to: "/academics" },
                  { label: "Facilities", to: "/facilities" },
                  { label: "Admissions", to: "/admission" },
                  { label: "Gallery", to: "/gallery" },
                  { label: "Student Life", to: "/student-life" },
                  { label: "Contact", to: "/contact", isHash: true },
                ].map(({ label, to, dropdown, isHash }, idx) => (
                  <div key={idx} className="relative group">
                    <NavLink
                      to={to}
                      hasDropdown={!!dropdown}
                      isHash={isHash}
                      className="group"
                      onClick={() => dropdown && handleDropdownToggle(label)}
                    >
                      {label}
                    </NavLink>

                    {dropdown && (
                      <div className="absolute left-0 mt-2 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top scale-95 group-hover:scale-100 bg-white/95 backdrop-blur-xl rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.10)] ring-1 ring-slate-200">
                        <ul className="py-2">
                          {dropdown.map((item, i) => (
                            <li key={i}>
                              {item.external ? (
                                <a
                                  href={item.external}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block px-4 py-2 text-[14px] text-slate-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-amber-50 hover:text-indigo-900 transition rounded-lg"
                                >
                                  {item.label}
                                </a>
                              ) : (
                                <HashLink
                                  smooth
                                  to={item.to}
                                  className="block px-4 py-2 text-[14px] text-slate-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-amber-50 hover:text-indigo-900 transition rounded-lg"
                                >
                                  {item.label}
                                </HashLink>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Desktop Prospectus System Layout Controls */}
            {isAdmissionsPage && (
              <div className="hidden lg:flex items-center gap-2">
                <Link
                  to="/prospectus"
                  className="inline-flex items-center gap-2 border border-indigo-700 bg-white text-indigo-800 px-4 py-2 rounded-full shadow hover:bg-indigo-700 hover:text-white transition"
                >
                  <Download size={18} /> Prospectus
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-full shadow hover:bg-slate-900 hover:text-white transition"
                >
                  <ArrowLeft size={18} /> Back to Home
                </Link>
              </div>
            )}

            {/* Responsive Mobile Drawer Trigger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100 transition"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Collapsible Overlay Layout Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          } bg-white/95 backdrop-blur-xl border-t border-slate-200`}
        >
          <div className="px-4 py-4 text-[15px] space-y-2 text-slate-800">
            <NavLink
              to="/"
              className="block"
              onClick={() => {
                setIsMenuOpen(false);
                setOpenDropdown(null);
              }}
            >
              Home
            </NavLink>

            {[
              { label: "Academics", to: "/academics" },
              { label: "Facilities", to: "/facilities" },
              { label: "Admissions", to: "/admission" },
              { label: "Gallery", to: "/gallery" },
              { label: "Student Life", to: "/student-life" },
              { label: "Contact", to: "/contact", isHash: true },
            ].map(({ label, to, isHash }, idx) => (
              <NavLink
                key={idx}
                to={to}
                isHash={isHash}
                className="block"
                onClick={() => {
                  setIsMenuOpen(false);
                  setOpenDropdown(null);
                }}
              >
                {label}
              </NavLink>
            ))}

            {/* Secondary Mobile Inner Portal Shortcut */}
            <div className="border-t border-slate-200 pt-3 mt-3">
              <Link
                to="/login"
                className="block px-3 py-2 text-sm font-medium text-indigo-800 hover:text-indigo-900 hover:bg-indigo-50 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Login Portal
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;