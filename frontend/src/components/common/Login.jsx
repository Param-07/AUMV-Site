import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import { login } from "../../utils/ApiCall";
import { useNavigate } from "react-router-dom";

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
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <div className="rounded-full h-16 w-16 bg-slate-600 overflow-hidden">
            <img src={logo} alt="Logo" className="h-full w-full object-cover" />
          </div>

          {/* Heading */}
          <div className="text-center flex flex-col gap-2">
            <h1 className="font-bold text-2xl text-purple-900">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm">
              Sign in to access your school portal
            </p>
            <p className="text-amber-600 text-sm">विद्या ददाति विनयम्</p>
          </div>

          {/* Login Card */}
          <div className="w-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] rounded-xl p-6">
            <h1 className="text-lg font-bold text-purple-900 mb-4 text-center">
              Login to Your Account
            </h1>

            {/* Role Tabs */}
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
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <label className="text-sm">{label}</label>
              <input
                type="email"
                name="email"
                placeholder={placeholder}
                required
                onChange={handleChange}
                className="h-9 rounded-lg pl-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />

              <label className="text-sm">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                onChange={handleChange}
                className="h-9 rounded-lg pl-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />

              <div className="flex justify-between mt-2 text-xs">
                <label className="flex items-center gap-1">
                  <input type="checkbox" />
                  Remember me
                </label>
                <span className="text-amber-600 cursor-pointer hover:underline">
                  Forgot password?
                </span>
              </div>

              <button
                type="submit"
                className="h-9 w-full text-base font-bold text-white bg-purple-900 mt-3 rounded-lg hover:bg-purple-800 transition"
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
