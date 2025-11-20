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
import ErrorModal from "./ErrorModal";
import toast, { Toaster } from "react-hot-toast";

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
  const [darkMode, setDarkMode] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;
  const galleryPaths = ["/adminGallery", "/videos", "/images"];
  const isGalleryLayout = galleryPaths.includes(currentPath);

  const handleOpenPopup = (item = null, type) => {
    if (type === "error") setFormData({ ...item });
    else {
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
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      if (name === "photo" && file?.type.startsWith("image/")) setPhotoPreview(URL.createObjectURL(file));
      if (name === "resume" && file) setResumePreview(file.name);
    } else setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePopupForm = () => {
    let errs = {};
    formFields.forEach((field) => {
      if (field.required) {
        if (field.type === "file" && editingTeacher) {
          if (!formData[field.name] && !editingTeacher[field.name]) errs[field.name] = `${field.label} is required`;
        } else {
          if (!formData[field.name]?.toString().trim()) errs[field.name] = `${field.label} is required`;
        }
      }
    });
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePopupForm()) {
      toast.error("Fill required fields");
      return;
    }
    setLocalLoading(true);
    if (editingTeacher) onFormSubmit?.({ ...formData, id: editingTeacher.id, mode: "edit" });
    else onFormSubmit?.({ ...formData, mode: "add" });
    handleClosePopup();
    setTimeout(() => setLocalLoading(false), 350);
  };

  const openDeleteModal = (teacher) => setDeleteModal({ open: true, teacher });
  const closeDeleteModal = () => setDeleteModal({ open: false, teacher: null });
  const confirmDelete = () => {
    if (deleteModal.teacher) onHandleDelete?.(deleteModal.teacher.id);
    closeDeleteModal();
  };

  const handleError = (title) => {
    onSetError?.(null);
    if (title === "Upload Error" || title === "Editing Error") handleOpenPopup(prevData, "error");
  };

  const processedData = useMemo(() => {
    let arr = Array.isArray(data) ? data : [];
    if (isGalleryLayout && selectedCategory !== "All") arr = arr.filter((it) => it.category === selectedCategory);
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
      @keyframes fadeIn{from{opacity:0;}to{opacity:1;}} 
      .animate-fadeIn{animation:fadeIn .28s;} 
      @keyframes scaleIn{from{transform:scale(.96);opacity:0;}to{transform:scale(1);opacity:1;}} 
      .animate-scaleIn{animation:scaleIn .28s;} 
      @keyframes shimmer{0%{background-position:-200px 0;}100%{background-position:200px 0;}} 
      .skeleton{background:linear-gradient(90deg,rgba(255,255,255,.08)25%,rgba(255,255,255,.17)50%,rgba(255,255,255,.08)75%);background-size:400px 100%;animation:shimmer 1.2s infinite;}
    `}</style>
  );

  const rootClass = darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800";
  const cardClass = darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800";
  const subtleBg = darkMode ? "bg-gray-800" : "bg-white";
  const controlBg = darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300";
  const inputText = darkMode ? "text-gray-100" : "text-gray-800";
  const mutedText = darkMode ? "text-gray-300" : "text-gray-600";

  return (
    <div className={`${rootClass} min-h-screen p-6 transition-all duration-300`}>
      {animations}
      <Toaster position="top-right" />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          {Icon && <div className={`${color || "bg-purple-100"} p-3 rounded-xl`}><Icon size={22} /></div>}
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-sm opacity-80">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 p-2 rounded-lg shadow-sm ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-300"}`}>
            <SearchIcon size={16} className="opacity-70" />
            <input
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Search teachers, subjects or gallery..."
              className={`outline-none bg-transparent text-sm ${inputText}`}
            />
          </div>

          <button onClick={() => setDarkMode((s) => !s)} className={`p-2 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button onClick={() => handleOpenPopup()} className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-2 rounded-full">
            <Plus size={16} /> {buttonText || "Add"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${cardClass} rounded-2xl p-4 shadow`}>
          <h3 className="font-semibold">Overview</h3>
          <p className="text-sm mt-2" style={{ color: darkMode ? undefined : undefined }}>{description}</p>
          <div className="mt-4">
            <p className="text-sm opacity-70">Showing</p>
            <div className="mt-2 text-xl font-bold">{processedData.length}</div>
            <p className="text-xs opacity-60 mt-1">records</p>
          </div>
        </div>

        <div className="md:col-span-2">
          {isGalleryLayout ? (
            <div className={`${cardClass} rounded-2xl shadow p-6`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className={`${darkMode ? "text-gray-100" : "text-gray-800"} text-xl font-semibold`}>Gallery</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition ${selectedCategory === cat ? "bg-purple-700 text-white border-purple-700" : `${darkMode ? "bg-gray-700 text-gray-200 border-gray-600" : "bg-gray-100 text-gray-700 border-gray-200"}`}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {processedData.map((item, index) => (
                  <div key={index} className={`group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition relative ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                    {item.file_url?.endsWith(".mp4") ? (
                      <video src={item.file_url} className="w-full h-40 object-cover" controls />
                    ) : item.file_url ? (
                      <img src={item.file_url} alt={item.description || "Gallery item"} className="w-full h-40 object-cover group-hover:scale-[1.03] transition-transform" />
                    ) : (
                      <div className={`w-full h-40 flex items-center justify-center ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}><Image size={40} /></div>
                    )}

                    <div className="p-4">
                      <h3 className={`${darkMode ? "text-gray-100" : "text-gray-800"} font-semibold truncate`}>{item.description || "Untitled"}</h3>
                      {item.uploaded_at && <p className={`${darkMode ? "text-gray-300" : "text-gray-500"} text-xs mt-1`}>{item.uploaded_at}</p>}
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <button onClick={() => openDeleteModal(item)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm"><Trash2 size={14} /> Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {loading ? (
                Array.from({ length: skeletonCount }).map((_, i) => (
                  <div key={i} className={`rounded-2xl p-4 shadow ${darkMode ? "bg-gray-800" : "bg-white"} skeleton`} aria-hidden>
                    <div className="flex justify-center">
                      <div className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-full w-24 h-24 mb-4`} />
                    </div>
                    <div className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} h-4 rounded mt-2 w-3/4 mb-2`} />
                    <div className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} h-3 rounded mt-1 w-1/2 mb-4`} />
                    <div className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} h-3 rounded w-full`} />
                  </div>
                ))
              ) : processedData.length === 0 ? (
                <div className={`${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"} p-6 rounded-2xl shadow text-center`}>
                  <p className="opacity-70">No records found</p>
                </div>
              ) : (
                processedData.map((teacher) => (
                  <div key={teacher.id} className={`${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"} rounded-2xl p-4 shadow hover:shadow-lg transform transition`}>
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <img src={teacher.photo} alt={teacher.name} className="h-24 w-24 rounded-full object-cover border-4" style={{ borderColor: darkMode ? undefined : undefined }} />
                      </div>

                      <div className="text-center mt-3">
                        <h3 className="font-semibold text-lg">{teacher.name}</h3>
                        <p className={`${darkMode ? "text-purple-300" : "text-purple-600"} font-medium`}>{teacher.subject}</p>
                        <a href={teacher.resume} target="_blank" rel="noopener noreferrer" className={`${darkMode ? "text-blue-300" : "text-blue-600"} underline text-sm mt-1 inline-block`}>View Resume</a>
                      </div>

                      <div className="flex gap-3 mt-4">
                        <button onClick={() => { setEditingTeacher(teacher); setFormData({ ...teacher }); setPhotoPreview(teacher.photo || null); setResumePreview(null); setFormErrors({}); setIsPopupOpen(true); }} className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-full hover:bg-blue-700 transition"><Edit size={14} /> Edit</button>

                        <button onClick={() => openDeleteModal(teacher)} className="flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-full hover:bg-red-700 transition"><Trash2 size={14} /> Delete</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className={`${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"} w-[95%] max-w-2xl rounded-2xl p-6 md:p-8 shadow-2xl animate-scaleIn relative overflow-y-auto max-h-[90vh]`}>
            <button onClick={handleClosePopup} className={`absolute top-4 right-4 p-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}><X size={20} /></button>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 flex flex-col items-center gap-4">
                <div className={`w-36 h-36 rounded-xl overflow-hidden border-2 ${darkMode ? "border-gray-700" : "border-gray-200"}`}><img src={photoPreview || editingTeacher?.photo || "/placeholder.png"} alt="preview" className="w-full h-full object-cover" /></div>

                <div className="text-center"><p className="font-semibold">{editingTeacher ? "Edit Teacher" : heading}</p><p className="text-sm opacity-70">{editingTeacher ? "Update details" : description}</p></div>
              </div>

              <div className="md:w-2/3">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formFields.map((field, idx) => {
                    const value = formData[field.name] ?? "";
                    const hasError = !!formErrors[field.name];

                    return (
                      <div key={idx} className="relative">
                        {field.type === "textarea" ? (
                          <>
                            <label className="text-sm mb-1 block">{field.label} {field.required && <span className="text-red-500">*</span>}</label>
                            <textarea name={field.name} placeholder={field.placeholder} required={field.required} value={value} onChange={handleChange} className={`w-full p-3 rounded-lg border ${hasError ? "border-red-500" : controlBg} bg-transparent`} />
                          </>
                        ) : field.type === "file" ? (
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">{field.label} {field.required && <span className="text-red-500">*</span>}</label>
                            <div className="flex items-center gap-3">
                              <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}>
                                <Upload size={16} />
                                <span className="text-sm">{formData[field.name]?.name || (field.name === "photo" ? "(Upload Photo)" : "(Upload Resume)")}</span>
                                <input type="file" name={field.name} accept={field.name === "photo" ? "image/*" : "application/pdf,image/*"} onChange={handleChange} className="hidden" required={field.required && !editingTeacher} />
                              </label>
                              {field.name === "resume" && (resumePreview || editingTeacher?.resume) && <div className="text-sm" style={{ color: darkMode ? undefined : undefined }}>{resumePreview || "Existing resume available"}</div>}
                            </div>
                          </div>
                        ) : field.type === "select" ? (
                          <>
                            <label className="text-sm mb-1 block">{field.label} {field.required && <span className="text-red-500">*</span>}</label>
                            <select name={field.name} value={value} onChange={handleChange} required={field.required} className={`w-full p-3 rounded-lg border ${hasError ? "border-red-500" : controlBg} bg-transparent`}>
                              <option value="">{field.placeholder || "Select"}</option>
                              {field.options?.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                            </select>
                          </>
                        ) : (
                          <>
                            <label className="text-sm mb-1 block">{field.label} {field.required && <span className="text-red-500">*</span>}</label>
                            <input name={field.name} type={field.type} placeholder={field.placeholder} value={value} onChange={handleChange} required={field.required} className={`w-full p-3 rounded-lg border ${hasError ? "border-red-500" : controlBg} bg-transparent`} />
                          </>
                        )}

                        {hasError && <p className="text-red-500 text-sm mt-1">{formErrors[field.name]}</p>}
                      </div>
                    );
                  })}

                  <div className="flex items-center gap-3 mt-2">
                    <button type="submit" className="px-4 py-2 rounded-lg bg-purple-700 text-white hover:bg-purple-800">{editingTeacher ? "Update" : "Add"}</button>
                    <button type="button" onClick={handleClosePopup} className={`px-4 py-2 rounded-lg ${darkMode ? "bg-gray-700" : "border"}`}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteModal.open && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className={`${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"} rounded-xl p-6 shadow-2xl max-w-sm w-[92%]`}>
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Confirm Delete</h3>
                <p className="text-sm opacity-80 mt-2">Are you sure you want to delete <span className="font-semibold">{deleteModal.teacher?.name || deleteModal.teacher?.title}</span>?</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={closeDeleteModal} className={`px-4 py-2 rounded-lg ${darkMode ? "bg-gray-700" : "border"}`}>Cancel</button>
              <button onClick={confirmDelete} className="px-4 py-2 rounded-lg bg-red-600 text-white">Delete</button>
            </div>
          </div>
        </div>
      )}

      {(loading || localLoading) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 animate-fadeIn">
          <div className="flex flex-col items-center gap-5">
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            <p className="text-purple-200 text-lg font-medium tracking-wide">{loadingMessage || "Loading..."}</p>
          </div>
        </div>
      )}

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
