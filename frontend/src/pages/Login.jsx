import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-2xl p-6">
        <div className="flex flex-col items-center gap-6">
          <div className="rounded-full h-20 w-20 bg-slate-600 flex items-center justify-center overflow-hidden">
            <img src={"Logo"} alt="Logo" className="h-full w-full object-cover" />
          </div>

          <div className="text-center">
            <h1 className="font-bold text-2xl sm:text-3xl text-purple-900">Welcome Back</h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Sign in to access your school portal
            </p>
            <p className="text-amber-600 text-sm">विद्या ददाति विनयम्</p>
          </div>

          <div className="w-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] rounded-xl p-5">
            <h1 className="text-xl font-bold text-purple-900 mb-4 text-center">
              Login to Your Account
            </h1>

            <div className="grid grid-cols-3 border border-gray-600 rounded-full overflow-hidden text-center text-sm sm:text-base">
              <p className="py-2 hover:bg-purple-900 cursor-pointer hover:text-white">Student</p>
              <p className="py-2 hover:bg-purple-900 cursor-pointer hover:text-white">Teacher</p>
              <p className="py-2 hover:bg-purple-900 cursor-pointer hover:text-white">Admin</p>
            </div>

            <form className="flex flex-col gap-2 mt-4">
              <label>Student ID or email</label>
              <input
                type="email"
                placeholder="Enter your student ID or email"
                className="h-10 rounded-lg pl-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
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

              <button className="h-10 w-full text-lg font-bold text-white bg-purple-900 mt-4 rounded-lg hover:bg-purple-800 transition">
                Sign in as Student
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
