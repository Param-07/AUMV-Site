import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, X, Upload } from "lucide-react";
import SmartImage from "../components/SmartImages";
import { apiRequest } from "../utils/ApiCall";
import toast, { Toaster } from "react-hot-toast";

const CATEGORY_OPTIONS = [
  "Hero",
  "About",
  "Principal",
  "Director",
  "Vision",
];

export default function MainPageManager() {
  const [items, setItems] = useState([]);
  const [popup, setPopup] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [deleteModal, setDeleteModal] = useState({ open: false, hero: null });

  const loadItems = async () => {
    setLoading(true);
    setLoadingMessage("Loading content...");
    try {
      const res = await apiRequest("GET", "/mainPage/getHero");
      if (res.message === "success") setItems(res.hero || []);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const resetForm = () => {
    setPopup(false);
    setEditing(null);
    setFormData({});
    setPhotoPreview(null);
  };

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData(p => ({ ...p, [name]: file }));
      if (file) setPhotoPreview(URL.createObjectURL(file));
    } else {
      setFormData(p => ({ ...p, [name]: value }));
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!formData.category) return toast.error("Category required");
    if (!editing && !formData.photo) return toast.error("Photo required");

    setLoading(true);
    setLoadingMessage(editing ? "Updating content..." : "Adding content...");

    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));

      const endpoint = editing
        ? `/mainPage/editHero/${editing.id}`
        : "/mainPage/addHero";
      const method = editing ? "PUT" : "POST";

      const res = await apiRequest(method, endpoint, fd);

      setItems(prev =>
        editing
          ? prev.map(i => i.id === editing.id ? res.hero : i)
          : [...prev, res.hero]
      );

      resetForm();
    } catch {
      toast.error("Operation failed");
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  const remove = async (id) => {
    setLoading(true);
    setLoadingMessage("Deleting...");
    try {
      await apiRequest("DELETE", `/mainPage/deleteHero/${id}`);
      setItems(prev => prev.filter(i => i.id !== id));
    } catch {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  const openDeleteModal = (hero) =>
    setDeleteModal({ open: true, hero });

  const closeDeleteModal = () =>
    setDeleteModal({ open: false, hero: null });
  const confirmDelete = () => {
    if (deleteModal.hero) {
        remove(deleteModal.hero.id)
    }
    closeDeleteModal();
  };


  const cardGlass =
    "bg-white/5 backdrop-blur-xl border border-cyan-400/10 shadow-[0_18px_45px_rgba(0,0,0,0.65)]";
  const chipInactive =
    "bg-white/5 border border-cyan-200/20 text-slate-200 hover:border-cyan-300/40";
  const mutedText = "text-slate-300";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 p-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold">Main Page Content</h1>
          <p className="text-slate-300 text-sm">
            Manage About, Principal, Director & Vision sections
          </p>
        </div>
        <button
          onClick={() => setPopup(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-700 text-slate-950 px-5 py-2 rounded-full font-semibold shadow-lg"
        >
          <Plus size={16} /> Add Content
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div
            key={item.id}
            className="bg-white/5 backdrop-blur-xl border border-cyan-400/10 rounded-2xl p-5 shadow-xl"
          >
            <div className="h-40 rounded-xl overflow-hidden border border-cyan-400/20">
              <SmartImage
                src={item.url}
                alt={item.category}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-lg font-semibold text-cyan-300 mt-4">
              {item.category}
            </h3>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setEditing(item);
                  setFormData(item);
                  setPhotoPreview(item.url);
                  setPopup(true);
                }}
                className="px-4 py-1.5 rounded-full text-xs bg-cyan-500 text-slate-950 font-semibold"
              >
                <Edit size={14} /> Edit
              </button>
              <button
                onClick={() => openDeleteModal(item)}
                className="px-4 py-1.5 rounded-full text-xs bg-red-500 text-white font-semibold"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup */}
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl">
          <div className="bg-white/5 border border-cyan-400/10 w-[95%] max-w-2xl rounded-3xl p-6">
            <div className="flex justify-end mb-3">
              <button onClick={resetForm}><X /></button>
            </div>

            <form onSubmit={submit} className="grid gap-4">
              <div className="flex justify-center">
                <div className="w-32 h-32 rounded-xl overflow-hidden border border-cyan-300/40">
                  <img
                    src={photoPreview || "/placeholder.png"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <label className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-950/40 border border-slate-700 cursor-pointer">
                <Upload size={16} /> Upload Photo
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>

              <select
                name="category"
                value={formData.category || ""}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-slate-950/40 border border-slate-700"
              >
                <option value="">Select Category</option>
                {CATEGORY_OPTIONS.map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-700 text-slate-950 py-3 rounded-lg font-semibold shadow-lg"
              >
                {editing ? "Update Content" : "Add Content"}
              </button>
            </form>
          </div>
        </div>
      )}

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

      {loading && (
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
    </div>
  );
}
