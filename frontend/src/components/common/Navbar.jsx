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
      {/* Top Bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 bg-slate-900 text-slate-100 text-sm py-2 px-4 hidden md:block transition-transform duration-300 ${isScrolled ? "-translate-y-full" : "translate-y-0"}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-300" /> +91 9876543210
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-300" /> info@alokschool.edu.in
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-300" /> Chandauli, Uttar Pradesh
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-amber-200 transition-colors">
              Alumni
            </a>
            <a href="#" className="hover:text-amber-200 transition-colors">
              Jobs
            </a>
            <a
              href="/#/login"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-200 transition-colors"
            >
              Login
            </a>

          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`fixed left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all duration-300 top-0 ${isScrolled ? "md:top-0" : "md:top-[40px]"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 md:py-2.5">
            <Link to="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center ring-2 ring-indigo-700/20 shadow-md transition-transform group-hover:scale-[1.04]">
                <img src={logo} alt="School Logo" className="w-full h-full object-contain p-1" />
              </div>
              <div>
                <h3 className="text-indigo-900 text-xl font-semibold tracking-tight group-hover:text-indigo-700 transition">
                  ALOK INTER COLLEGE
                </h3>
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Chandauli
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            {!isAdmissionsPage && (
              <div className="hidden lg:flex items-center space-x-1 text-sm">
                {/* --- MENU ITEMS WITH NEW PREMIUM DROPDOWNS --- */}
                {[
                  { label: "Home", to: "/" },
                  {
                    label: "Academics",
                    to: "/academics",
                  },
                  {
                    label: "Facilities",
                    to: "/facilities",
                  },
                  {
                    label: "Admissions",
                    to: "/admission",
                  },
                  {
                    label: "Gallery",
                    to: "/gallery",
                  },
                  {
                    label: "Student Life",
                    to: "/student-life",
                  },
                  {
                    label: "Contact",
                    to: "/contact",
                    isHash: true,
                  },
                ].map(({ label, to, dropdown, isHash }, idx) => (
                  <div key={idx} className="relative group">
                    <NavLink
                      to={to}
                      hasDropdown={!!dropdown}
                      isHash={isHash}
                      className="group"
                      onClick={() =>
                          dropdown &&
                          handleDropdownToggle(label)
                      }
                  >
                      {label}
                  </NavLink>

                    {/* --- Dropdown */}
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

            {/* Desktop Prospectus Buttons for Admission Page */}
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

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100 transition"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          } bg-white/95 backdrop-blur-xl border-t border-slate-200`}
        >
          <div className="px-4 py-4 text-[15px] space-y-2 text-slate-800">
            <NavLink to="/" className="block" onClick={() => {setIsMenuOpen(false); setOpenDropdown(null);}}>Home</NavLink>

            {/* --- Mobile Dropdowns --- */}
            {[
              {
                key: "about",
                label: "About",
              },
              {
                key: "academics",
                label: "Academics",
              },
              {
                key: "facilities",
                label: "Facilities",
              },
              {
                key: "admissions",
                label: "Admissions",
              },
              {
                key: "gallery",
                label: "Gallery",
              },
              {
                key: "student-life",
                label: "Student Life",
              },
              {
                key: "contact",
                label: "Contact",
              },
            ].map(({ key, label, items }) => (
              <div key={key}>
                <button
                  onClick={() => handleDropdownToggle(key)}
                  className="w-full flex items-center justify-between px-3 py-2 font-medium text-slate-700 hover:text-indigo-900"
                >
                  {label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openDropdown === key ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === key && (
                  <div className="pl-5 py-1 space-y-1">
                    {items.map(([name, to], i) => (
                      <HashLink
                        smooth
                        to={to}
                        key={i}
                        className="block px-3 py-1.5 text-[14px] text-slate-600 hover:text-indigo-900"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                      >
                        {name}
                      </HashLink>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Login Link */}
            <div className="border-t border-slate-200 pt-3 mt-3">
              <Link
                to="/login"
                className="block px-3 py-2 text-sm font-medium text-indigo-800 hover:text-indigo-900 hover:bg-indigo-50 rounded-lg transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
