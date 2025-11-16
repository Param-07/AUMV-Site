import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { login } from "../utils/ApiCall";
import { useNavigate, NavLink } from "react-router-dom";
const Login = () => {
  const [role, setRole] = useState("student");
  const [formdata, setformdata] = useState({});
  const Navigate = useNavigate();
  const roleConfig = {
    student: {
      label: "Student ID or Email",
      placeholder: "Enter your student ID or email",
      buttonText: "Sign in as Student",
    },
    teacher: {
      label: "Teacher Email",
      placeholder: "Enter your teacher email",
      buttonText: "Sign in as Teacher",
    },
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

 const handleSubmit =async (e) => {
  e.preventDefault();
 const updatedData = { ...formdata, role };

    const finalData = new FormData();
    finalData.append("email", updatedData.email);
    finalData.append("password", updatedData.password);
    finalData.append("role", updatedData.role);

    const response = await login(finalData);
    console.log(response);

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
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-50">
      <div className="w-full max-w-md rounded-2xl p-2">
        <div className="flex flex-col items-center gap-6">
          <div className="rounded-full h-20 w-20 bg-slate-600 flex items-center justify-center overflow-hidden">
            <img
              src={logo}
              alt="Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-center mb-2 flex flex-col gap-3">
            <h1 className="font-bold text-2xl sm:text-3xl text-purple-900">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Sign in to access your school portal
            </p>
            <p className="text-amber-600 text-sm">विद्या ददाति विनयम्</p>
          </div>
          <div className="w-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] rounded-xl p-7">
            <h1 className="text-xl font-bold text-purple-900 mb-5 text-center">
              Login to Your Account
            </h1>
            <div className="grid grid-cols-3 border border-gray-600 rounded-full overflow-hidden text-center text-sm sm:text-base">
              {["student", "teacher", "admin"].map((r) => (
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
            <form className="flex flex-col gap-2 mt-4" onSubmit={handleSubmit}>
              <label>{label}</label>
              <input
                type="email"
                name="email"
                placeholder={placeholder}
                required
                onChange={handleChange}
                className="h-10 rounded-lg pl-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                onChange={handleChange}
                className="h-10 rounded-lg pl-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />

              <div className="flex justify-between mt-3 text-sm">
                <label className="flex items-center gap-1">
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="#" className="text-amber-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="h-10 w-full text-lg font-bold text-white bg-purple-900 mt-4 rounded-lg hover:bg-purple-800 transition"
              >
                {buttonText}
              </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4">
              Need help accessing your account?
            </p>
            <div className="text-sm flex justify-center gap-2 text-purple-900 mt-2">
              <a href="#" className="hover:underline">
                Contact School Administration
              </a>
              |
              <a href="#" className="hover:underline">
                Technical Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
