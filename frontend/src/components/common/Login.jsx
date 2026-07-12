import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  School,
  Users,
  BadgeCheck,
  ShieldCheck,
  KeyRound,
  LogIn,
  GraduationCap,
} from "lucide-react";

import logo from "../../assets/images/logo.png";
import alokSchoolBg from "../../assets/images/AlokSchool.png";
import { login } from "../../utils/ApiCall";

const Login = () => {
  const navigate = useNavigate();

  const [portal, setPortal] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const finalData = new FormData();

    finalData.append("email", formdata.email);
    finalData.append("password", formdata.password);
    finalData.append("role", "admin");

    try {
      const response = await login(finalData);

      if (response.message === "Login successful") {
        localStorage.setItem("token", response.access_token);
        localStorage.setItem("r_token", response.refresh_token);
        localStorage.setItem("username", response.username);

        navigate("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");

      setformdata({
        email: "",
        password: "",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    switch (portal) {
      case "student":
        return "Enter Student Enrollment ID";
      case "parent":
        return "Enter Registered Mobile/ID";
      case "staff":
        return "Enter Staff Employee ID";
      default:
        return "Enter Username";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f8] text-[#1c1b1b]">
            {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="ALOK INTER COLLEGE"
              className="h-12 w-12 object-contain"
            />

            <h1 className="font-serif text-xl md:text-2xl font-bold text-indigo-900 tracking-tight">
              ALOK INTER COLLEGE
            </h1>
          </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            <Link className="text-gray-700 hover:text-red-700 transition" to="/">
              Home
            </Link>

            <Link className="text-gray-700 hover:text-red-700 transition" to="/academics">
              Academics
            </Link>

            <Link className="text-gray-700 hover:text-red-700 transition" to="/facilities">
              Facilities
            </Link>

            <Link className="text-gray-700 hover:text-red-700 transition" to="/gallery">
              Gallery
            </Link>

            <Link className="text-gray-700 hover:text-red-700 transition" to="/student-life">
              Student Life
            </Link>

            <Link className="text-gray-700 hover:text-red-700 transition" to="/admissions">
              Admissions
            </Link>

            <Link className="px-6 py-2 bg-indigo-900 text-white rounded-md hover:bg-indigo-800 transition" to="/contact">
              Contact Us
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 pt-24 relative flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-indigo-950/60 z-10"></div>

          <img
            src={alokSchoolBg}
            alt="School Campus"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Login Container */}
        <div className="relative z-20 w-full max-w-xl mx-4">
          <div className="bg-white/85 backdrop-blur-xl border border-white/40 rounded-xl shadow-2xl p-8 md:p-12">
            {/* Branding Header */}
            <div className="text-center mb-10">
              <img
                src={logo}
                alt="School Crest"
                className="w-20 h-20 mx-auto mb-4"
              />

              <h2 className="font-serif text-3xl font-bold text-indigo-900">
                Portal Authentication
              </h2>

              <div className="w-16 h-[2px] bg-yellow-600 mx-auto mt-3"></div>

              <p className="uppercase tracking-[4px] text-xs text-gray-600 mt-4">
                Heritage Edition | Secure Access
              </p>
            </div>

            {/* Portal Selector */}
            <div className="flex border-b border-gray-300 mb-8">
              <button
                type="button"
                onClick={() => setPortal("student")}
                className={`flex-1 py-4 flex flex-col items-center gap-2 transition ${
                  portal === "student"
                    ? "border-b-4 border-yellow-700 text-indigo-900"
                    : "text-gray-500"
                }`}
              >
                <GraduationCap size={22} />
                <span className="font-medium">Student</span>
              </button>

              <button
                type="button"
                onClick={() => setPortal("parent")}
                className={`flex-1 py-4 flex flex-col items-center gap-2 transition ${
                  portal === "parent"
                    ? "border-b-4 border-yellow-700 text-indigo-900"
                    : "text-gray-500"
                }`}
              >
                <Users size={22} />
                <span className="font-medium">Parent</span>
              </button>

              <button
                type="button"
                onClick={() => setPortal("staff")}
                className={`flex-1 py-4 flex flex-col items-center gap-2 transition ${
                  portal === "staff"
                    ? "border-b-4 border-yellow-700 text-indigo-900"
                    : "text-gray-500"
                }`}
              >
                <BadgeCheck size={22} />
                <span className="font-medium">Staff</span>
              </button>
            </div>
                        {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username / Email */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-600 mb-2 font-semibold">
                  Email / Username
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    required
                    value={formdata.email}
                    onChange={handleChange}
                    placeholder={getPlaceholder()}
                    className="w-full bg-transparent border-b border-gray-400 pl-8 pb-2 pt-2 focus:outline-none focus:border-indigo-900 focus:border-b-2 transition text-indigo-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs uppercase tracking-wider text-gray-600 font-semibold">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-yellow-700 hover:text-yellow-800 text-xs font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formdata.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-transparent border-b border-gray-400 pl-8 pr-10 pb-2 pt-2 focus:outline-none focus:border-indigo-900 focus:border-b-2 transition text-indigo-900"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-900"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-gray-300"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600"
                >
                  Remember me on this device
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm animate-pulse">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-900 text-white py-4 rounded-md font-semibold shadow-lg hover:shadow-xl transition-all active:scale-[0.98] border-b-4 border-yellow-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="opacity-25"
                      />

                      <path
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"
                      />
                    </svg>

                    Logging In...
                  </>
                ) : (
                  <>
                    LOGIN TO PORTAL
                    <LogIn size={18} />
                  </>
                )}
              </button>
                            {/* Security Indicators */}
              <div className="pt-6 flex items-center justify-center gap-8 opacity-70">
                <div className="flex items-center gap-2 text-gray-600">
                  <ShieldCheck size={16} />
                  <span className="text-[11px] uppercase font-semibold tracking-wider">
                    SSL Secure
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <KeyRound size={16} />
                  <span className="text-[11px] uppercase font-semibold tracking-wider">
                    AES-256 Bit
                  </span>
                </div>
              </div>
            </form>
          </div>

          {/* Help Text */}
          <p className="text-center mt-6 text-white text-sm drop-shadow-lg">
            Need help accessing your account?{" "}
            <button
              type="button"
              className="text-yellow-300 font-semibold hover:underline"
            >
              Visit the IT Helpdesk
            </button>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-950 text-white border-t-4 border-yellow-600">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid md:grid-cols-3 gap-10">
          
          {/* About */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-yellow-300 mb-4">
              ALOK COLLEGE
            </h3>

            <p className="text-gray-300 leading-relaxed">
              Empowering future leaders through rigorous academics,
              innovation, discipline, and ethical values.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="uppercase tracking-widest text-yellow-300 text-sm font-semibold mb-4">
              Quick Links
            </h4>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <button className="text-left hover:text-yellow-300 transition">
                Academic Calendar
              </button>

              <button className="text-left hover:text-yellow-300 transition">
                Privacy Policy
              </button>

              <button className="text-left hover:text-yellow-300 transition">
                Terms of Service
              </button>

              <button className="text-left hover:text-yellow-300 transition">
                Alumni Association
              </button>

              <button className="text-left hover:text-yellow-300 transition">
                Careers
              </button>

              <button className="text-left hover:text-yellow-300 transition">
                Site Map
              </button>
            </div>
          </div>

          {/* Connect */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="uppercase tracking-widest text-yellow-300 text-sm font-semibold mb-4">
                Connect
              </h4>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition">
                  F
                </div>

                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition">
                  I
                </div>

                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition">
                  M
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-8">
              © {new Date().getFullYear()} Alok Inter College Chandauli.
              All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;