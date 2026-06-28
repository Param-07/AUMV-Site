import React, { useEffect, useMemo, useState } from "react";
import { Plus, Edit, Trash2, X, Upload, Trophy, UploadIcon } from "lucide-react";
import SmartImage from "../components/SmartImages";
import { apiRequest } from "../utils/ApiCall";
import toast, { Toaster } from "react-hot-toast";

const badgeStyles = {
  "1st": "bg-yellow-400 text-black",
  "2nd": "bg-slate-300 text-black",
  "3rd": "bg-orange-400 text-black",
};

const CATEGORY_OPTIONS = [
  "Sports", "Cultural", "Music", "Dance", "Drama",
  "Art", "Science", "Robotics", "Literary", "Other",
];

const LEVEL_OPTIONS = [
  "School", "District", "State", "National", "International",
];

const CLASS_OPTIONS = [
  "10th", "12th"
];

const BRANCH_OPTIONS = [
  "Science", "Humanities"
];

const BOARD_OPTIONS = ["CBSE", "UP Board"];

export default function Achievers() {
  const [achievers, setAchievers] = useState([]);
  const [activeTab, setActiveTab] = useState("Academic");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ type: "Academic" });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, achiever: null });
  const [loadingMessage, setLoadingMessage] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [yearError, setYearError] = useState("");
  const [percentageError, setPercentageError] = useState("");

  const yearRegex = /^\d{4}-\d{2}$/; // Format: 2025-26
  const validateYear = (year) => {
    if (!year) return false; // Allow empty
    if (!yearRegex.test(year)) {
      setYearError("Format: YYYY-YY (e.g., 2025-26)");
      return false;
    }
    setYearError("");
    return true;
  };

  const loadAchievers = async () => {
    setLoading(true);
    setLoadingMessage("Loading achievers...");
    try {
      const res = await apiRequest("GET", "/achievers/getAchievers");
      if (res.message === "success") setAchievers(res.achievers || []);
    } catch {
      toast.error("Failed to load achievers");
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  useEffect(() => {
    loadAchievers();
  }, []);

  const filteredAchievers = useMemo(
    () => achievers.filter((a) => a.type === activeTab),
    [achievers, activeTab]
  );

  const resetForm = (type = activeTab) => {
    setPopup(false);
    setEditing(null);
    setFormData({ type });
    setPhotoPreview(null);
  };

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData((p) => ({ ...p, [name]: file }));
      if (file?.type.startsWith("image/")) {
        setPhotoPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
      if (name === "year") {
        validateYear(value);
      }
      else if (name === "percentage") {
        if (value < 0 || value > 100) {
          setPercentageError("Percentage must be between 0 and 100");
        } else {
          setPercentageError("");
        }
      }
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.year) {
      toast.error("Fill all required fields");
      return;
    }

    if (!editing && !formData.photo) {
      toast.error("Photo is required");
      return;
    }

    try {
      setLocalLoading(true);
      setLoadingMessage(editing ? "Updating achiever..." : "Adding achiever...");

      const finalData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        finalData.append(key, value);
      });

      const endpoint = editing
        ? `/achievers/editAchiever/${editing?.id}`
        : "/achievers/addAchiever";
      const method = editing ? "PUT" : "POST";

      const response = await apiRequest(method, endpoint, finalData);

      if (editing) {
        setAchievers((prev) =>
          prev.map((a) => (a.id === editing.id ? { ...a, ...response.achievers } : a))
        );
      } else {
        setAchievers((prev) => [...prev, response.achievers]);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      resetForm(activeTab);
      setLocalLoading(false);
      setLoadingMessage("");
    }
  };

  const remove = async (id) => {
    try {
      setLocalLoading(true);
      setLoadingMessage("Deleting achiever...");
      await apiRequest("DELETE", `/achievers/deleteAchiever/${id}`);
    } catch {
      toast.error("Failed to delete achiever");
    } finally {
      setAchievers((prev) => prev.filter((a) => a.id !== id));
      setLocalLoading(false);
      setLoadingMessage("");
    }
  };

  const openDeleteModal = (achiever) => setDeleteModal({ open: true, achiever });
  const closeDeleteModal = () => setDeleteModal({ open: false, achiever: null });

  const confirmDelete = () => {
    if (deleteModal.achiever) remove(deleteModal.achiever.id);
    closeDeleteModal();
  };

  /* ── shared style tokens ── */
  const inputCls =
    "w-full p-3 rounded-lg bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition";

  return (
    <div className="min-h-screen bg-white text-slate-900 p-6">
      <Toaster position="top-right" />

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-700 shadow-lg">
            <Trophy size={24} className="text-white" />
            <div className="absolute -inset-0.5 rounded-2xl bg-cyan-400/30 blur-lg opacity-60 pointer-events-none" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Achievers
            </h1>
            <p className="text-sm text-slate-400">
              Manage academic &amp; extracurricular achievers
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            resetForm(activeTab);
            setPopup(true);
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg hover:opacity-90 transition"
        >
          <Plus size={16} /> Add Achiever
        </button>
      </div>

      {/* ── Tabs ── */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {["Academic", "Extra Curricular"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setFormData({ type: tab });
            }}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition border ${
              activeTab === tab
                ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white border-transparent shadow-md"
                : "bg-white border-slate-200 text-slate-600 hover:border-cyan-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievers.map((a) => (
          <div
            key={a.id}
            className="bg-white border border-slate-100 rounded-2xl p-5 shadow-md hover:shadow-lg transition"
          >
            <div className="relative flex justify-center">
              <div className="h-24 w-24 rounded-full overflow-hidden ring-2 ring-cyan-400/70">
                <SmartImage
                  src={a.photo}
                  alt={a.name}
                  width={500}
                  className="w-full h-full object-cover"
                />
              </div>
              {a.rank && (
                <span
                  className={`absolute -top-2 -right-2 px-3 py-1 text-xs rounded-full font-bold ${badgeStyles[a.rank]}`}
                >
                  {a.rank}
                </span>
              )}
            </div>

            <div className="text-center mt-4">
              <h3 className="font-semibold text-lg text-slate-900">{a.name}</h3>
              <p className="text-cyan-500 text-sm">{a.achievement}</p>

              {a.percentage && (
                <p className="text-emerald-500 text-sm mt-1">{a.percentage}%</p>
              )}
              {a.level && (
                <p className="text-slate-400 text-sm">{a.level}</p>
              )}
              {a.description && (
                <p className="text-slate-500 text-xs mt-2 line-clamp-3">
                  {a.description}
                </p>
              )}
            </div>

            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={() => {
                  setEditing(a);
                  setFormData(a);
                  setPhotoPreview(a.photo);
                  setPopup(true);
                }}
                className="flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-white transition"
              >
                <Edit size={14} /> Edit
              </button>
              <button
                onClick={() => openDeleteModal(a)}
                className="flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold bg-red-500 hover:bg-red-600 text-white transition"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Add / Edit Popup ── */}
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 w-[95%] max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-semibold text-slate-800">
                {editing ? "Edit Achiever" : "Add Achiever"}
              </h2>
              <button
                onClick={() => resetForm(activeTab)}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={submit}
              className="px-6 pb-6 pt-4 overflow-y-auto max-h-[calc(90vh-72px)] grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Image upload */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-28 h-28 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                      <Upload size={32} />
                      <span className="text-xs text-center">No image</span>
                    </div>
                  )}
                </div>
                <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer text-sm text-slate-600 hover:bg-slate-100 transition">
                  <Upload size={16} />
                  Upload Photo
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Fields */}
              <div className="md:col-span-2 space-y-4">
                <input
                  name="name"
                  placeholder="Student / Team Name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className={inputCls}
                />

                <select
                  name="rank"
                  value={formData.rank || ""}
                  onChange={handleChange}
                  className={inputCls}
                >
                  <option value="">Rank (optional)</option>
                  <option>1st</option>
                  <option>2nd</option>
                  <option>3rd</option>
                </select>

                {activeTab === "Academic" && (
                  <>
                    <select
                      name="class"
                      value={formData.class || ""}
                      onChange={handleChange}
                      className={inputCls}
                    >
                      <option value="">Select Class</option>
                      {CLASS_OPTIONS.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>

                    {formData.class === "12th" && (
                      <select
                        name="branch"
                        value={formData.branch || ""}
                        onChange={handleChange}
                        className={inputCls}
                      >
                        <option value="">Select Branch</option>
                        {BRANCH_OPTIONS.map((b) => (
                          <option key={b}>{b}</option>
                        ))}
                      </select>
                    )}

                    <input
                      name="percentage"
                      type="number"
                      placeholder="Percentage"
                      value={formData.percentage || ""}
                      onChange={handleChange}
                      className={inputCls}
                    />
                    {percentageError && (
                      <p className="text-red-500 text-sm mt-1">{percentageError}</p>
                    )}

                    <select
                      name="board"
                      value={formData.board || ""}
                      onChange={handleChange}
                      className={inputCls}
                    >
                      <option value="">Select Board</option>
                      {BOARD_OPTIONS.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </>
                )}

                {activeTab === "Extra Curricular" && (
                  <>
                    <select
                      name="category"
                      value={formData.category || ""}
                      onChange={handleChange}
                      className={inputCls}
                    >
                      <option value="">Select Category</option>
                      {CATEGORY_OPTIONS.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>

                    <select
                      name="level"
                      value={formData.level || ""}
                      onChange={handleChange}
                      className={inputCls}
                    >
                      <option value="">Select Level</option>
                      {LEVEL_OPTIONS.map((l) => (
                        <option key={l}>{l}</option>
                      ))}
                    </select>
                  </>
                )}

                <div>
                  <input
                    name="year"
                    placeholder="Academic session / Year (e.g., 2025-26)"
                    value={formData.year || ""}
                    onChange={handleChange}
                    className={`${inputCls} ${yearError ? "border-red-500 focus:ring-red-400" : ""}`}
                  />
                  {yearError && (
                    <p className="text-red-500 text-sm mt-1">{yearError}</p>
                  )}
                </div>

                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  className={inputCls}
                  rows={3}
                />

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-700 text-white py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
                >
                  {editing ? "Update Achiever" : "Add Achiever"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ── */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-sm w-[92%] shadow-xl">
            <h3 className="text-lg font-semibold text-slate-800">Confirm Delete</h3>
            <p className="text-sm mt-2 text-slate-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-700">
                {deleteModal.achiever?.name || deleteModal.achiever?.title}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 rounded-lg text-sm bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg text-sm bg-red-500 hover:bg-red-600 text-white font-semibold shadow-sm transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Global Loading Overlay ── */}
      {(loading || localLoading) && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-[200]">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-transparent border-t-cyan-500 animate-[spin_1.2s_linear_infinite]" />
              <div className="absolute inset-0 rounded-full border-4 border-cyan-200/40" />
              <div className="absolute inset-[22%] rounded-full bg-cyan-400/30 animate-pulse" />
            </div>
            <p className="text-cyan-600 text-lg font-semibold tracking-wide animate-pulse">
              {loadingMessage || "Please wait..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}