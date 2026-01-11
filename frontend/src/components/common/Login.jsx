import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import alokSchoolBg from "../../assets/images/AlokSchool.png";
import { login } from "../../utils/ApiCall";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const [role, setRole] = useState("admin");
  const [formdata, setformdata] = useState({});
  const Navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const roleConfig = {
    admin: {
      label: "Admin Email",
      placeholder: "Enter your admin email",
      buttonText: "Sign in as Admin",
    },
  };

  const { label, placeholder, buttonText } = roleConfig[role];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = new FormData();
    finalData.append("email", formdata.email);
    finalData.append("password", formdata.password);
    finalData.append("role", role);

    const response = await login(finalData);

    if (response.message === "Login successful") {
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("r_token", response.refresh_token);
      localStorage.setItem("username", response.username);
      Navigate("/dashboard");
    } else {
      alert(response.error || "Login failed. Please try again.");
    }
  };

  return (
    <div 
      className="fixed inset-0 overflow-hidden flex bg-cover bg-center"
      style={{ backgroundImage: `url('${alokSchoolBg}')` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="ml-auto w-full max-w-md px-4 py-4 relative z-10 flex flex-col justify-center">
        <div className="flex flex-col items-center gap-4">
          {/* Login Card */}
          <div className="w-full bg-white/50 shadow-[0_4px_15px_rgba(0,0,0,0.1)] rounded-xl p-6 backdrop-blur-sm">
            {/* Logo */}
            <div className="flex flex-col justify-center items-center mb-6 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg py-6 px-6">
              <div className="flex justify-center items-center mb-3">
                <div className="rounded-full h-16 w-16 bg-white overflow-hidden shadow-lg flex-shrink-0">
                  <img src={logo} alt="Logo" className="h-full w-full object-cover" />
                </div>
                <div className="text-2xl text-white mx-3">|</div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white tracking-tight">ALOK INTER</h3>
                  <p className="text-xs text-purple-100 uppercase tracking-wider">College</p>
                </div>
              </div>
              {/* Tagline inside background */}
              <p className="text-amber-300 text-sm font-semibold">विद्या ददाति विनयम्</p>
            </div>

            <div className="grid grid-cols-1 border border-gray-600 rounded-full overflow-hidden text-sm text-center mb-4">
              {["admin"].map((r) => (
                <p
                  key={r}
                  onClick={() => setRole(r)}
                  className={`py-2 cursor-pointer transition ${
                    role === r
                      ? "bg-purple-900 text-white"
                      : "text-gray-700"
                  }`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </p>
              ))}
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <label className="text-sm font-semibold text-gray-700">{label}</label>
              <div className="flex items-center border-2 border-gray-300 rounded-lg pl-3 bg-white/80 hover:border-purple-400 transition focus-within:ring-2 focus-within:ring-purple-400 focus-within:border-purple-400">
                <Mail className="w-5 h-5 text-purple-600 font-bold" strokeWidth={2.5} />
                <input
                  type="email"
                  name="email"
                  placeholder={placeholder}
                  required
                  onChange={handleChange}
                  className="h-10 flex-1 border-none focus:outline-none pl-3 bg-transparent text-gray-700 placeholder-gray-500"
                />
              </div>

              <label className="text-sm font-semibold text-gray-700">Password</label>
              <div className="flex items-center border-2 border-gray-300 rounded-lg pl-3 bg-white/80 hover:border-purple-400 transition focus-within:ring-2 focus-within:ring-purple-400 focus-within:border-purple-400">
                <Lock className="w-5 h-5 text-purple-600 font-bold" strokeWidth={2.5} />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  onChange={handleChange}
                  className="h-10 flex-1 border-none focus:outline-none pl-3 bg-transparent text-gray-700 placeholder-gray-500"
                />
              </div>

              <div className="flex justify-between mt-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-700">Remember me</span>
                </label>
                <span className="text-purple-600 cursor-pointer hover:underline font-medium">
                  Forgot password?
                </span>
              </div>

              <button
                type="submit"
                className="h-11 w-full text-base font-bold text-white bg-gradient-to-r from-purple-700 to-purple-900 mt-4 rounded-lg hover:from-purple-800 hover:to-purple-950 transition shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
              >
                {buttonText}
              </button>
            </form>

            <p className="text-center text-xs text-gray-600 mt-3">
              Need help accessing your account?
            </p>

            <div className="text-xs flex justify-center gap-2 text-purple-900 mt-1">
              <span className="hover:underline cursor-pointer">
                Contact School Administration
              </span>
              |
              <span className="hover:underline cursor-pointer">
                Technical Support
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
