// import { useEffect, useState } from "react";
// import logo from "../assets/images/logo.png"; 

// export default function LoadingScreen() {
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     // Loading duration (1.5 sec). Change if needed.
//     const timer = setTimeout(() => {
//       setVisible(false);
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, []);

//   if (!visible) return null;

//   return (
//     <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
//       {/* School logo */}
//       <img
//         src = "../assets/images/logo.png" // change to your logo path
//         alt="School Logo"
//         className="w-32 h-32 object-contain animate-bounce"
//       />

//       {/* Loading text */}
//       <h1 className="mt-4 text-xl font-semibold text-gray-700 animate-pulse">
//         Loading...
//       </h1>
//     </div>
//   );
// }
