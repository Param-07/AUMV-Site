import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Plus, Filter, Search, Edit, Trash2, X, Upload, Image } from "lucide-react";
import { deleteTeacherData } from "../utils/ApiCall";

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
  onHandleDelete,
  heading,
  description,
  loading,
  loadingMessage,
  categories,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [filePreview, setFilePreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  const location = useLocation();
  const currentPath = location.pathname;

  const galleryPaths = ["/adminGallery", "/videos", "/images"];
  const isGalleryLayout = galleryPaths.includes(currentPath);

  // ✅ Open popup (Add/Edit)
  const handleOpenPopup = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
      setFilePreview(item.file_url || null);
    } else {
      setEditingItem(null);
      setFormData({});
      setFilePreview(null);
    }
    setIsPopupOpen(true);
  };

  // ✅ Close popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setEditingItem(null);
    setFormData({});
    setFilePreview(null);
  };

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));

      if (file && file.type.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(file));
      } else if (file && file.type.startsWith("video/")) {
        setFilePreview(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      onFormSubmit?.({ ...formData, id: editingItem.id, mode: "edit" });
    } else {
      onFormSubmit?.({ ...formData, mode: "add" });
    }
    handleClosePopup();
  };

  // ✅ Delete item
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      onHandleDelete?.(id);
    }
  };

  // ✅ Category filter
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
          onClick={() => handleOpenPopup()}
          className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-900 text-white px-5 py-2 rounded-full shadow hover:opacity-90 transition"
        >
          <Upload className="inline mr-2" size={18} /> {buttonText}
        </button>
      </div>

      {/* ✅ GALLERY LAYOUT */}
      {isGalleryLayout ? (
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex flex-col mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-gray-700 font-semibold">Browse by Category</h2>
              <p className="text-sm text-gray-500">
                {filteredData.length} items in this category
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
                className="relative group rounded-2xl shadow-md border hover:shadow-xl transition duration-300 overflow-hidden"
              >
                {item.file_url ? (
                  item.file_url.endsWith(".mp4") ? (
                    <video
                      src={item.file_url}
                      className="w-full h-48 object-cover"
                      controls
                    />
                  ) : (
                    <img
                      src={item.file_url}
                      alt={item.description || "Gallery Image"}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                    <Image size={40} />
                  </div>
                )}

                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>

                <div className="p-3 bg-white">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {item.description || "Untitled"}
                  </h3>
                  {item.uploaded_at && (
                    <p className="text-sm text-gray-500">{item.uploaded_at}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // ✅ TEACHER TABLE LAYOUT
        <div className="bg-white rounded-xl shadow p-6">
          <div className="overflow-x-auto w-full">
            <table className="min-w-full border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100 border-b">
                  {["Photo", "Name", "Subject", "Resume", "Actions"].map((heading) => (
                    <th
                      key={heading}
                      className="py-3 px-4 text-gray-700 font-semibold text-center uppercase tracking-wide"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((teacher) => (
                  <tr key={teacher.id} className="border-b hover:bg-gray-50 whitespace-nowrap">
                    <td className="py-3 px-4 text-center">
                      <img
                        src={teacher.photo}
                        alt={teacher.name}
                        title={teacher.name}
                        className="h-12 w-12 object-cover rounded-full border inline-block"
                      />
                    </td>
                    <td className="py-3 px-4 text-center font-medium">{teacher.name}</td>
                    <td className="py-3 px-4 text-center">{teacher.subject}</td>
                    <td className="py-3 px-4 text-center">
                      <a
                        href={teacher.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleOpenPopup(teacher)}
                          className="flex items-center gap-1 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded-full"
                        >
                          <Edit size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(teacher.id)}
                          className="flex items-center gap-1 text-red-500 hover:bg-red-100 px-3 py-1 rounded-full"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ✅ Popup Form */}
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
              <h2 className="text-xl font-semibold">
                {editingItem ? "Edit Record" : heading}
              </h2>
              <p>{description}</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {formFields.map((field) => (
                <div key={field.name} className="flex flex-col gap-2">
                  <label htmlFor={field.name} className="text-gray-700 font-medium">
                    {field.label}
                  </label>

                  {field.type === "file" ? (
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-purple-600 transition">
                      <label
                        htmlFor={field.name}
                        className="cursor-pointer flex flex-col items-center gap-2 text-gray-600"
                      >
                        <Upload className="text-purple-700" size={20} />
                        <span className="text-sm font-medium flex flex-col items-center justify-center">
                          {formData[field.name]?.name || "(Upload image or video)"}
                        </span>
                        <p className="text-xs text-gray-400 mt-1">
                          Accepted: Images or Videos only
                        </p>
                        <input
                          id={field.name}
                          name={field.name}
                          type="file"
                          accept={field.accept}
                          onChange={handleChange}
                          required={field.required && !editingItem}
                          className="hidden"
                        />
                      </label>

                      {filePreview && (
                        field.accept.includes("video") ? (
                          <video
                            src={filePreview}
                            className="mt-3 rounded-lg w-32 h-32 object-cover border"
                            controls
                          />
                        ) : (
                          <img
                            src={filePreview}
                            alt="Preview"
                            className="mt-3 rounded-lg w-28 h-28 object-cover border"
                          />
                        )
                      )}

                      {!filePreview && editingItem?.file_url && (
                        editingItem.file_url.endsWith(".mp4") ? (
                          <video
                            src={editingItem.file_url}
                            className="mt-3 rounded-lg w-32 h-32 object-cover border"
                            controls
                          />
                        ) : (
                          <img
                            src={editingItem.file_url}
                            alt={editingItem.description}
                            className="mt-3 rounded-lg w-28 h-28 object-cover border"
                          />
                        )
                      )}
                    </div>
                  ) : field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 bg-white"
                    >
                      <option value="">{field.placeholder || "Select an option"}</option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      required={field.required}
                      className="border rounded-lg p-3 h-24 resize-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className="border rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
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

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center gap-3">
            <svg
              className="animate-spin h-6 w-6 text-purple-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx={12}
                cy={12}
                r={10}
                stroke="currentColor"
                strokeWidth={4}
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <p className="text-sm font-medium text-gray-700">{loadingMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagementPages;