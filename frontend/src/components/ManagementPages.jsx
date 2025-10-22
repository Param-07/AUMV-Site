import React from "react";
import { Plus, Filter, Search } from "lucide-react";

const ManagementPages = ({ title, subtitle, buttonText, columns, data }) => {
  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        <button className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-900 text-white px-5 py-2 rounded-full shadow hover:opacity-90 transition">
          <Plus className="inline mr-2" size={18} /> {buttonText}
        </button>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
          <h1 className="text-bold text-2xl">All Records</h1>
          <p className="text-gray-600">
            Showing 1–{data.length} of {data.length} records
          </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex w-full items-center">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-purple-600" />
              <input
                type="text"
                placeholder="Search..."
                className="peer w-60 sm:w-full pl-10 pr-3 py-2 border rounded-full outline-none focus:ring-2 focus:ring-purple-800 bg-slate-100"
              />
            </div>
            <button className="flex items-center gap-1 text-gray-600 border px-3 py-2 rounded-full hover:bg-purple-800 hover:text-white">
              <Filter size={16} /> Filters
            </button>
          </div>
        </div>

        <table className="w-full text-left border border-gray-200">
          <thead>
            <tr className="border-b bg-gray-100">
              {columns.map((col) => (
                <th key={col} className="py-3 px-4 text-gray-600 font-medium">
                  {col}
                </th>
              ))}
              <th className="py-3 px-4 text-gray-600 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-200">
                {Object.values(row).map((val, i) => (
                  <td key={i} className="py-3 px-4">
                    {val}
                  </td>
                ))}
                <td className="py-3 px-4 flex gap-3">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagementPages;
