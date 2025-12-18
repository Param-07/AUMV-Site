import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Upload,
  Image,
  Sun,
  Moon,
  Search as SearchIcon,
} from "lucide-react";
import ErrorModal from "./common/ErrorModal";
import toast, { Toaster } from "react-hot-toast";
import SmartImage from "./SmartImages";

const ManagementPages = ({
  icon: Icon,
  color,
  title,
  subtitle,
  buttonText,
  data = [],
  formFields = [],
  onFormSubmit,
  heading,
  description,
  loading,
  loadingMessage,
  categories = ["All", "Sports"],
  error,
  onSetError,
  onHandleDelete,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [prevData, setPrevData] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [deleteModal, setDeleteModal] = useState({ open: false, teacher: null });
  const [searchQ, setSearchQ] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [localLoading, setLocalLoading] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;
  const galleryPaths = ["/adminGallery", "/videos", "/images"];
  const isGalleryLayout = galleryPaths.includes(currentPath);

  const handleOpenPopup = (item = null, type) => {
    if (type === "error") {
      setFormData({ ...item });
    } else {
      if (item) {
        setEditingTeacher(item);
        setFormData({ ...item });
        setPrevData({ ...item });
        setPhotoPreview(item.photo || null);
      } else {
        setEditingTeacher(null);
        setFormData({});
        setPhotoPreview(null);
      }
    }
    setFormErrors({});
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setEditingTeacher(null);
    setFormData({});
    setPhotoPreview(null);
    setFormErrors({});
  };

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      if (name === "photo" && file?.type.startsWith("image/")) {
        setPhotoPreview(URL.createObjectURL(file));
      }
      if (name === "resume" && file) {
        setResumePreview(file.name);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validatePopupForm = () => {
    let errs = {};
    formFields.forEach((field) => {
      if (field.required) {
        if (field.type === "file" && editingTeacher) {
          if (!formData[field.name] && !editingTeacher[field.name]) {
            errs[field.name] = `${field.label} is required`;
          }
        } else {
          if (!formData[field.name]?.toString().trim()) {
            errs[field.name] = `${field.label} is required`;
          }
        }
      }
    });
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePopupForm()) {
      toast.error("Fill all required fields");
      return;
    }
    setLocalLoading(true);
    if (editingTeacher) {
      onFormSubmit?.({ ...formData, id: editingTeacher.id, mode: "edit" });
    } else {
      onFormSubmit?.({ ...formData, mode: "add" });
    }
    handleClosePopup();
    setTimeout(() => setLocalLoading(false), 350);
  };

  const openDeleteModal = (teacher) =>
    setDeleteModal({ open: true, teacher });

  const closeDeleteModal = () =>
    setDeleteModal({ open: false, teacher: null });

  const confirmDelete = () => {
    if (deleteModal.teacher) {
      onHandleDelete?.(deleteModal.teacher.id);
    }
    closeDeleteModal();
  };

  const handleError = (title) => {
    onSetError?.(null);
    if (title === "Upload Error" || title === "Editing Error") {
      handleOpenPopup(prevData, "error");
    }
  };

  const processedData = useMemo(() => {
    let arr = Array.isArray(data) ? data : [];
    if (isGalleryLayout && selectedCategory !== "All") {
      arr = arr.filter((it) => it.category === selectedCategory);
    }
    if (searchQ.trim()) {
      const q = searchQ.toLowerCase();
      arr = arr.filter(
        (it) =>
          it.name?.toLowerCase().includes(q) ||
          it.title?.toLowerCase().includes(q) ||
          it.description?.toLowerCase().includes(q) ||
          it.subject?.toLowerCase().includes(q)
      );
    }
    return arr;
  }, [data, selectedCategory, searchQ, isGalleryLayout]);

  const skeletonCount = 6;

  const animations = (
    <style>{`
      @keyframes fadeIn {from {opacity: 0;} to {opacity: 1;}}
      .animate-fadeIn {animation: fadeIn .28s;}
      @keyframes scaleIn {from {transform: scale(.96); opacity: 0;} to {transform: scale(1); opacity: 1;}}
      .animate-scaleIn {animation: scaleIn .28s;}
      @keyframes shimmer {0% {background-position: -200px 0;} 100% {background-position: 200px 0;}}
      .skeleton {background: linear-gradient(90deg, rgba(255,255,255,.03) 25%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.03) 75%); background-size: 400px 100%; animation: shimmer 1.2s infinite;}
    `}</style>
  );

  const rootClass = darkMode
    ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50"
    : "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-50";

  const cardGlass =
    "bg-white/5 backdrop-blur-xl border border-cyan-400/10 shadow-[0_18px_45px_rgba(0,0,0,0.65)]";
  const chipInactive =
    "bg-white/5 border border-cyan-200/20 text-slate-200 hover:border-cyan-300/40";
  const mutedText = "text-slate-300";

  return (
    <div className={`${rootClass} min-h-screen p-6 transition-all duration-300`}>
      {animations}
      <Toaster position="top-right" />

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div className="flex items-center gap-4">
          {Icon && (
            <div
              className={`relative h-12 w-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-700 shadow-[0_15px_40px_rgba(0,0,0,0.6)]`}
            >
              <Icon size={22} className="text-slate-950" />
              <div className="absolute -inset-0.5 rounded-2xl bg-cyan-400/30 blur-2 opacity-60 pointer-events-none" />
            </div>
          )}
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {title}
            </h1>
            <p className={`text-sm ${mutedText}`}>{subtitle}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-full ${cardGlass}`}
          >
            <SearchIcon size={16} className="text-slate-300" />
            <input
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Search by name, subject, title..."
              className={`outline-none bg-transparent text-sm w-52 md:w-64 text-slate-50 placeholder:text-slate-400`}
            />
          </div>

          <button
            onClick={() => setDarkMode((s) => !s)}
            className={`relative p-2 rounded-full ${cardGlass} text-slate-100 hover:border-cyan-300/60 transition`}
          >
            {darkMode ? (
              <Sun size={16} className="text-yellow-300" />
            ) : (
              <Moon size={16} className="text-sky-300" />
            )}
            <span className="absolute -inset-1 rounded-full bg-cyan-400/20 blur opacity-40 pointer-events-none" />
          </button>

          <button
            onClick={() => handleOpenPopup()}
            className="relative flex items-center gap-2 bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-700 text-slate-950 px-5 py-2 rounded-full text-sm font-semibold shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.85)] active:scale-95 transition"
          >
            <Plus size={16} />
            {buttonText || "Add"}
            <span className="absolute -inset-0.5 rounded-full bg-cyan-400/40 blur-md opacity-70 pointer-events-none" />
          </button>
        </div>
      </div>

      {/* Content layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overview glass card */}
        <div className={`${cardGlass} rounded-2xl p-5`}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm tracking-wide text-slate-100">
              Overview
            </h3>
            <div className="flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] text-sky-300">
              <span className="h-1 w-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
              Live
            </div>
          </div>

          <p className={`text-sm mt-3 ${mutedText}`}>{description}</p>

          <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-xl bg-white/5 border border-cyan-500/20 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wide text-slate-400">
                Total Records
              </p>
              <p className="mt-1 text-2xl font-semibold text-sky-100">
                {processedData.length}
              </p>
            </div>
            <div className="rounded-xl bg-white/5 border border-sky-400/20 px-4 py-3">
              <p className="text-[11px] uppercase tracking-wide text-slate-400">
                Status
              </p>
              <p className="mt-1 text-sm text-emerald-300">
                {loading ? "Updating..." : "Synchronized"}
              </p>
            </div>
          </div>
        </div>

        {/* Main panel */}
        <div className="lg:col-span-2 space-y-6">
          {isGalleryLayout ? (
            // ----- GALLERY MODE -----
            <div className={`${cardGlass} rounded-2xl p-6`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">
                    Gallery Management
                  </h2>
                  <p className={`text-sm mt-1 ${mutedText}`}>
                    Curate and organize visual memories across events & sections.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${
                        selectedCategory === cat
                          ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 border-transparent shadow-[0_12px_30px_rgba(0,0,0,0.75)]"
                          : chipInactive
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {processedData.map((item, index) => (
                  <div
                    key={index}
                    className={`group rounded-2xl overflow-hidden ${cardGlass} relative`}
                  >
                    {item.file_url?.endsWith(".mp4") ? (
                      <video
                        src={item.file_url}
                        className="w-full h-40 object-cover bg-black"
                        controls
                      />
                    ) : item.file_url ? (
                      <SmartImage
                        src={item.file_url}
                        alt={item.description || "Gallery item"}
                        width={900}
                        wrapperClassName="w-full h-40"
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-40 flex items-center justify-center bg-slate-900/80">
                        <Image size={40} className="text-slate-500" />
                      </div>
                    )}

                    <div className="p-4 space-y-1">
                      <h3 className="font-semibold text-sm truncate text-slate-50">
                        {item.description || "Untitled"}
                      </h3>
                      {item.uploaded_at && (
                        <p className={`text-xs ${mutedText}`}>
                          {item.uploaded_at}
                        </p>
                      )}
                    </div>

                    <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <button
                        onClick={() => openDeleteModal(item)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-1 text-xs font-semibold shadow-lg"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

                {!loading && processedData.length === 0 && (
                  <div
                    className={`${cardGlass} col-span-full rounded-2xl border border-dashed border-cyan-300/40 flex flex-col items-center justify-center py-10`}
                  >
                    <Image className="text-slate-500" size={32} />
                    <p className={`mt-3 text-sm ${mutedText}`}>
                      No gallery items found. Use “Add” to upload photos.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // ----- CARD MODE (TEACHER / OTHER RECORDS) -----
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {loading ? (
                Array.from({ length: skeletonCount }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl p-4 ${cardGlass} skeleton`}
                    aria-hidden
                  >
                    <div className="flex justify-center">
                      <div className="bg-slate-800/80 rounded-full w-24 h-24 mb-4" />
                    </div>
                    <div className="bg-slate-800/80 h-4 rounded mt-2 w-3/4 mb-2" />
                    <div className="bg-slate-800/80 h-3 rounded mt-1 w-1/2 mb-4" />
                    <div className="bg-slate-800/80 h-3 rounded w-full" />
                  </div>
                ))
              ) : processedData.length === 0 ? (
                <div
                  className={`${cardGlass} p-6 rounded-2xl text-center col-span-full border border-dashed border-cyan-300/40`}
                >
                  <p className={`text-sm ${mutedText}`}>
                    No records found. Try searching differently or add a new one.
                  </p>
                </div>
              ) : (
                processedData.map((teacher) => (
                  <div
                    key={teacher.id}
                    className={`${cardGlass} rounded-2xl p-5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] transform hover:-translate-y-0.5 transition`}
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <div className="h-24 w-24 rounded-full overflow-hidden ring-2 ring-cyan-400/70 shadow-[0_12px_30px_rgba(0,0,0,0.9)]">
                          <SmartImage
                            src={teacher.photo}
                            alt={teacher.name}
                            width={500}
                            wrapperClassName="h-full w-full"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="text-center mt-3">
                        <h3 className="font-semibold text-lg text-slate-50">
                          {teacher.name}
                        </h3>
                        <p className="text-sm text-cyan-300 font-medium">
                          {teacher.subject}
                        </p>
                        {teacher.resume && (
                          <a
                            href={teacher.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-sky-300 underline mt-1 inline-block"
                          >
                            View Resume
                          </a>
                        )}
                      </div>

                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => {
                            setEditingTeacher(teacher);
                            setFormData({ ...teacher });
                            setPhotoPreview(teacher.photo || null);
                            setResumePreview(null);
                            setFormErrors({});
                            setIsPopupOpen(true);
                          }}
                          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md transition"
                        >
                          <Edit size={14} />
                          Edit
                        </button>

                          <button
                          onClick={() => openDeleteModal(teacher)}
                          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md transition"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Popup (Add/Edit) */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xl animate-fadeIn">
          <div
            className={`${cardGlass} w-[95%] max-w-3xl rounded-3xl p-6 md:p-8 animate-scaleIn relative overflow-y-auto max-h-[90vh]`}
          >
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 border border-slate-600 text-slate-100 hover:bg-white/20 transition"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Left: preview */}
              <div className="md:w-1/3 flex flex-col items-center gap-4">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-slate-900/80 border border-cyan-300/40">
                  <img
                    src={photoPreview || editingTeacher?.photo || "/placeholder.png"}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm text-slate-50">
                    {editingTeacher ? "Edit Record" : heading}
                  </p>
                  <p className={`text-xs mt-1 ${mutedText}`}>
                    {editingTeacher
                      ? "Update the existing details carefully."
                      : description}
                  </p>
                </div>
              </div>

              {/* Right: form */}
              <div className="md:w-2/3">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formFields.map((field, idx) => {
                    const value = formData[field.name] ?? "";
                    const hasError = !!formErrors[field.name];

                    if (field.type === "textarea") {
                      return (
                        <div key={idx}>
                          <label className="text-sm mb-1 block text-slate-100">
                            {field.label}{" "}
                            {field.required && (
                              <span className="text-red-400">*</span>
                            )}
                          </label>
                          <textarea
                            name={field.name}
                            placeholder={field.placeholder}
                            required={field.required}
                            value={value}
                            onChange={handleChange}
                            className={`w-full p-3 rounded-lg border bg-slate-950/40 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-cyan-400 ${
                              hasError
                                ? "border-red-500"
                                : "border-slate-700/70"
                            }`}
                          />
                          {hasError && (
                            <p className="text-red-400 text-xs mt-1">
                              {formErrors[field.name]}
                            </p>
                          )}
                        </div>
                      );
                    }

                    if (field.type === "file") {
                      return (
                        <div key={idx} className="flex flex-col gap-2">
                          <label className="text-sm font-medium text-slate-100">
                            {field.label}{" "}
                            {field.required && (
                              <span className="text-red-400">*</span>
                            )}
                          </label>
                          <div className="flex flex-wrap items-center gap-3">
                            <label
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm bg-slate-950/40 border-slate-700/70 text-slate-100`}
                            >
                              <Upload size={16} />
                              <span>
                                {formData[field.name]?.name ||
                                  (field.name === "photo"
                                    ? "Upload photo"
                                    : "Upload file")}
                              </span>
                              <input
                                type="file"
                                name={field.name}
                                accept={
                                  field.name === "photo"
                                    ? "image/*"
                                    : "application/pdf,image/*"
                                }
                                onChange={handleChange}
                                className="hidden"
                                required={field.required && !editingTeacher}
                              />
                            </label>

                            {field.name === "resume" &&
                              (resumePreview || editingTeacher?.resume) && (
                                <div
                                  className={`text-xs ${mutedText} truncate max-w-[150px]`}
                                >
                                  {resumePreview || "Existing resume available"}
                                </div>
                              )}
                          </div>
                          {hasError && (
                            <p className="text-red-400 text-xs mt-1">
                              {formErrors[field.name]}
                            </p>
                          )}
                        </div>
                      );
                    }

                    if (field.type === "select") {
                      return (
                        <div key={idx}>
                          <label className="text-sm mb-1 block text-slate-100">
                            {field.label}{" "}
                            {field.required && (
                              <span className="text-red-400">*</span>
                            )}
                          </label>
                          <select
                            name={field.name}
                            value={value}
                            onChange={handleChange}
                            required={field.required}
                            className={`w-full p-3 rounded-lg border bg-slate-950/40 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-cyan-400 ${
                              hasError
                                ? "border-red-500"
                                : "border-slate-700/70"
                            }`}
                          >
                            <option value="">
                              {field.placeholder || "Select"}
                            </option>
                            {field.options?.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          {hasError && (
                            <p className="text-red-400 text-xs mt-1">
                              {formErrors[field.name]}
                            </p>
                          )}
                        </div>
                      );
                    }

                    return (
                      <div key={idx}>
                        <label className="text-sm mb-1 block text-slate-100">
                          {field.label}{" "}
                          {field.required && (
                            <span className="text-red-400">*</span>
                          )}
                        </label>
                        <input
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          value={value}
                          onChange={handleChange}
                          required={field.required}
                          className={`w-full p-3 rounded-lg border bg-slate-950/40 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-cyan-400 ${
                            hasError
                              ? "border-red-500"
                              : "border-slate-700/70"
                          }`}
                        />
                        {hasError && (
                          <p className="text-red-400 text-xs mt-1">
                            {formErrors[field.name]}
                          </p>
                        )}
                      </div>
                    );
                  })}

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-700 text-slate-950 text-sm font-semibold shadow-[0_15px_40px_rgba(0,0,0,0.9)] hover:shadow-[0_20px_55px_rgba(0,0,0,1)] active:scale-95 transition"
                    >
                      {editingTeacher ? "Update" : "Add"}
                    </button>
                    <button
                      type="button"
                      onClick={handleClosePopup}
                      className="px-4 py-2 rounded-lg text-sm bg-slate-950/50 border border-slate-700 text-slate-100 hover:bg-slate-900/80 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/70 backdrop-blur-xl animate-fadeIn">
          <div
            className={`${cardGlass} rounded-2xl p-6 max-w-sm w-[92%] animate-scaleIn`}
          >
            <h3 className="text-lg font-semibold tracking-tight text-slate-50">
              Confirm Delete
            </h3>
            <p className={`text-sm mt-2 ${mutedText}`}>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-sky-200">
                {deleteModal.teacher?.name || deleteModal.teacher?.title}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 rounded-lg text-sm bg-slate-950/50 border border-slate-700 text-slate-100 hover:bg-slate-900/80 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg text-sm bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {(loading || localLoading) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-xl z-[200] animate-fadeIn">
          <div className="flex flex-col items-center gap-6">
            
            {/* 🔥 Neon Ring Loader */}
            <div className="relative">
              {/* outer rotate ring */}
              <div className="w-20 h-20 rounded-full border-4 border-transparent border-t-purple-400 animate-[spin_1.2s_linear_infinite]"></div>
              {/* inner glow ring */}
              <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.55)]"></div>
              {/* pulsing core */}
              <div className="absolute inset-[22%] rounded-full bg-purple-500/60 animate-pulse shadow-[0_0_16px_rgba(168,85,247,0.8)]"></div>
            </div>

            {/* 🔥 Dynamic text */}
            <p className="text-purple-200 text-lg font-semibold tracking-wide animate-pulse drop-shadow-lg">
              {loadingMessage || "Please wait..."}
            </p>
          </div>
        </div>
      )}

      {/* Error modal */}
      {error && (
        <ErrorModal
          type={error.type}
          title={error.title}
          message={error.message}
          onClose={() => handleError(error.title)}
        />
      )}
    </div>
  );
};

export default ManagementPages;
