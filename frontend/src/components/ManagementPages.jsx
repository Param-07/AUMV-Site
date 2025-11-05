import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Plus, Filter, Search, Edit, Trash2, X, Upload, Image } from "lucide-react";

const ManagementPages = ({
  icon: Icon,
  color,
  title,
  subtitle,
  buttonText,
  columns,
  data,
  formFields = [],
  onFormSubmit,
  heading,
  description,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [filePreview, setFilePreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const location = useLocation();
  const currentPath = location.pathname;

  const galleryPaths = ["/adminGallery", "/videos", "/images"];
  const isGalleryLayout = galleryPaths.includes(currentPath);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setFormData({});
    setFilePreview(null);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      if (file && file.type.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(file));
      } else {
        setFilePreview(null);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit?.(formData);
    handleClosePopup();
  };

  const categories = ["All", "Teachers", "Students", "Events", "Infrastructure", "Sports", "Cultural Activities", "Others"];

  const filteredData =
    selectedCategory === "All"
      ? data
      : data.filter((item) => item.category === selectedCategory);

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className={`flex items-center justify-center p-4 rounded-xl ${color}`}>
              <Icon size={24} />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-gray-600">{subtitle}</p>
          </div>
        </div>

        <button
          onClick={handleOpenPopup}
          className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-900 text-white px-5 py-2 rounded-full shadow hover:opacity-90 transition"
        >
          <Upload className="inline mr-2" size={18} /> {buttonText}
        </button>
      </div>

      {isGalleryLayout ? (
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex flex-col mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-gray-700 font-semibold">Browse by Category</h2>
              <p className="text-sm text-gray-500">
                {filteredData.length} photos in this category
              </p>
            </div>

            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                    selectedCategory === cat
                      ? "bg-purple-700 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-purple-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {filteredData.map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl p-3 shadow-md border hover:shadow-lg transition duration-300 bg-gradient-to-br from-white to-${item.color || "gray"}-50`}
              >
                <div className="overflow-hidden rounded-xl">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-36 object-cover rounded-xl mb-3"
                    />
                  ) : (
                    <div className="w-full h-36 bg-gray-100 flex items-center justify-center text-gray-400">
                      <Image size={40} />
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-gray-800 truncate">
                  {item.title || "Untitled"}
                </h3>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="font-semibold text-xl">All Records</h2>
              <p className="text-gray-600">
                Showing 1–{data.length} of {data.length} records
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex w-full items-center">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-60 sm:w-full pl-10 pr-3 py-2 border rounded-full outline-none focus:ring-2 focus:ring-purple-800 bg-slate-100"
                />
              </div>
              <button className="flex items-center gap-1 text-gray-600 border px-3 py-2 rounded-full hover:bg-purple-800 hover:text-white">
                <Filter size={16} /> Filters
              </button>
            </div>
          </div>

          <table className="w-full text-left border border-gray-200">
            <thead>
              <tr className="border-b bg-gray-100 whitespace-nowrap">
                {columns.map((col) => (
                  <th key={col} className="py-3 px-4 text-gray-600 font-medium">
                    {col}
                  </th>
                ))}
                <th className="py-3 px-4 text-gray-600 font-medium text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b hover:bg-gray-200 whitespace-nowrap"
                >
                  {Object.values(row).map((val, i) => (
                    <td key={i} className="py-3 px-4">
                      {val}
                    </td>
                  ))}
                  <td className="py-3 px-4 flex gap-2 justify-end">
                    <button className="text-blue-600 flex hover:bg-blue-100 p-2 rounded-full px-4 items-center">
                      <Edit className="text-sm mr-1" /> Edit
                    </button>
                    <button className="text-red-500 flex hover:bg-red-100 rounded-full px-4 items-center">
                      <Trash2 className="text-xs mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Popup Form */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="rounded-2xl shadow-2xl p-6 md:p-8 w-[90%] max-w-lg relative overflow-y-scroll h-[80%] bg-gray-100">
            <button
              onClick={handleClosePopup}
              className="absolute top-3 right-3 text-black hover:text-purple-800"
            >
              <X size={22} />
            </button>

            <div className="flex flex-col mb-5">
              <h2 className="text-xl font-semibold">{heading}</h2>
              <p>{description}</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {formFields.map((field, idx) => (
                <div key={idx} className="flex flex-col">
                  <label htmlFor={field.name} className="text-gray-700 font-medium mb-1">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className={`border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 ${field.className || ""}`}
                    />
                  ) : field.type === "file" ? (
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-purple-600 transition">
                      <label className="cursor-pointer flex flex-col items-center gap-2 text-gray-600">
                        <Upload className="text-purple-700" size={20} />
                        <span className="text-sm font-medium flex flex-col items-center justify-center">
                          {formData[field.name]?.name || "(Upload a file)"}
                        </span>
                        <input
                          id={field.name}
                          name={field.name}
                          type="file"
                          accept={field.accept || "*"}
                          onChange={handleChange}
                          required={field.required}
                          // className="hidden"
                        />
                      </label>
                      {filePreview && (
                        <img
                          src={filePreview}
                          alt="Preview"
                          className="mt-3 rounded-lg w-28 h-28 object-cover border"
                        />
                      )}
                    </div>
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className={`border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 ${field.className || ""}`}
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-purple-800 text-white py-2 rounded-lg hover:bg-purple-900 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagementPages;