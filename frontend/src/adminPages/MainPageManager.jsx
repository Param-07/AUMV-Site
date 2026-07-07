import React, { useEffect, useState, useMemo } from "react";
import { Plus, Edit, Trash2, X, Upload, Home } from "lucide-react";
import SmartImage from "../components/SmartImages";
import { apiRequest } from "../utils/ApiCall";
import toast, { Toaster } from "react-hot-toast";

const CATEGORY_OPTIONS = [
  "Hero",
  "Principal",
  "Director",
];

export default function MainPageManager() {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(CATEGORY_OPTIONS[0]);
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

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter((i) => i.category === activeCategory);
  }, [items, activeCategory]);

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

      if(editing) toast.success("Content updated successfully");
      else toast.success("Content added successfully");
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
      toast.success("Content deleted successfully");
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
  <div className="min-h-screen bg-slate-50 p-6">
    <Toaster position="top-right" />

    {/* PAGE HEADER */}
    <div className="max-w-7xl mx-auto space-y-6">

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center shadow-sm">
            <Home size={28} className="text-blue-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Main Page Content
            </h1>

            <p className="text-slate-500 mt-1">
              Manage your school's primary homepage sections
            </p>
          </div>
        </div>

        <button
          onClick={() => setPopup(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition flex items-center gap-2"
        >
          <Plus size={18} />
          Add New Hero
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Home className="w-5 h-5 text-blue-600" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Total Items
            </p>

            <p className="text-3xl font-bold text-slate-900">
              {items.length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Upload className="w-5 h-5 text-green-600" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Categories
            </p>

            <p className="text-3xl font-bold text-slate-900">
              {CATEGORY_OPTIONS.length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <Edit className="w-5 h-5 text-purple-600" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Active Category
            </p>

            <p className="text-lg font-semibold text-slate-900">
              {activeCategory}
            </p>
          </div>
        </div>

      </div>

      {/* CATEGORY TABS */}
      <div className="flex gap-3 overflow-x-auto pb-2 border-b border-slate-200">

        {CATEGORY_OPTIONS.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {cat}
          </button>
        ))}

      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col"
        >
          {/* IMAGE */}
          <div className="relative h-56 overflow-hidden bg-slate-100">

            <SmartImage
              src={item.url}
              alt={item.category}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute top-3 right-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Live
            </div>

          </div>

          {/* CONTENT */}
          <div className="p-6 flex flex-col flex-1">

            <div className="flex-1">

              <div className="mb-3">
                <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                  {item.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {item.title ||
                  `${item.category} Section`}
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                {item.description ||
                  `Manage homepage content for the ${item.category} section. Upload images and update content displayed on the website.`}
              </p>

            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-6 pt-5 border-t border-slate-200">

              <button
                onClick={() => {
                  setEditing(item);
                  setFormData(item);
                  setPhotoPreview(item.url);
                  setPopup(true);
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-700 px-4 py-2.5 rounded-xl font-medium transition"
              >
                <Edit size={16} />
                Edit
              </button>

              <button
                onClick={() => openDeleteModal(item)}
                className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-500 hover:text-white text-red-600 px-4 py-2.5 rounded-xl font-medium transition"
              >
                <Trash2 size={16} />
                Remove
              </button>

            </div>

          </div>
        </div>
      ))}
      </div>
    </div>
      {/* Popup */}
    {popup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

    <div className="bg-white rounded-md shadow-xl w-full max-w-md flex flex-col max-h-[90vh] overflow-hidden">

      {/* HEADER */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200">

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {editing ? "Edit Content" : "Add New Content"}
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Manage homepage section content
          </p>
        </div>

        <button
          onClick={resetForm}
          className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition"
        >
          <X size={20} />
        </button>

      </div>

     {/* BODY */}
<div className="px-6 py-6 overflow-y-auto flex-1">

  {/* IMAGE PREVIEW */}
  <div className="mb-6 flex justify-center">
    <div className="w-40 h-40 rounded-md border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden">

      {photoPreview ? (
        <img
          src={photoPreview}
          alt="Preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="text-center text-slate-400">
          <Upload size={30} className="mx-auto mb-2" />
          <p className="text-sm font-medium">
            No Image Selected
          </p>
        </div>
      )}

    </div>
  </div>

  <form
    id="content-form"
    onSubmit={submit}
    className="space-y-5"
  >

    {/* UPLOAD */}
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Upload Image
      </label>

      <label className="block cursor-pointer">
        <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-slate-300 rounded-md hover:bg-slate-50 transition-colors">

          <div className="text-center">

            <Upload
              size={22}
              className="mx-auto text-slate-400 mb-2"
            />

            <span className="text-sm font-medium text-blue-600">
              Choose Image
            </span>

            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />

          </div>

        </div>
      </label>
    </div>

    {/* CATEGORY */}
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        Category
      </label>

      <select
        name="category"
        value={formData.category || ""}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">
          Select Category
        </option>

        {CATEGORY_OPTIONS.map((c) => (
          <option
            key={c}
            value={c}
          >
            {c}
          </option>
        ))}
      </select>
    </div>

  </form>

</div>

{/* FOOTER */}
<div className="px-6 py-4 border-t border-slate-200 bg-white flex justify-end gap-3">

  <button
    type="button"
    onClick={resetForm}
    className="px-4 py-2 text-sm border border-slate-300 rounded-md hover:bg-slate-50 transition"
  >
    Cancel
  </button>

  <button
    type="submit"
    form="content-form"
    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
  >
    {editing ? "Update Content" : "Add Content"}
  </button>

</div>

    </div>

  </div>
    )}

      {/* DELETE MODAL */}
    {deleteModal.open && (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

      <div className="bg-white rounded-md shadow-xl w-full max-w-md flex flex-col max-h-[90vh] overflow-hidden p-6">

        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={24} className="text-red-600" />
        </div>

        <h3 className="text-xl font-bold text-center text-slate-900">
          Delete Content
        </h3>

        <p className="text-slate-500 text-center mt-3">
          Are you sure you want to delete
          <span className="font-semibold text-slate-800">
            {" "}
            {deleteModal.hero?.category}
            {" "}
          </span>
          content?
        </p>

        <div className="flex gap-3 mt-8">

          <button
            onClick={closeDeleteModal}
            className="flex-1 border border-slate-300 py-3 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={confirmDelete}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
    )}

    {/* LOADER */}
    {loading && (
      <div className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-sm flex items-center justify-center">

        <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center">

          <div className="relative">

            <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>

            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>

          </div>

          <p className="mt-5 text-slate-700 font-semibold">
            {loadingMessage || "Please wait..."}
          </p>

        </div>

      </div>
    )}

  </div>
  );
}
