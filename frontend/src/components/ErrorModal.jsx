import React from "react";
import { AlertTriangle, XCircle, CheckCircle } from "lucide-react";

export default function ErrorModal({ 
  type = "error", 
  title, 
  message, 
  onClose 
}) {
  const icons = {
    error: <XCircle className="text-red-600 w-10 h-10" />,
    warning: <AlertTriangle className="text-yellow-500 w-10 h-10" />,
    success: <CheckCircle className="text-green-500 w-10 h-10" />,
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl text-center">
        <div className="flex justify-center mb-3">{icons[type]}</div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-5">{message}</p>
        <button
          onClick={onClose}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
}
