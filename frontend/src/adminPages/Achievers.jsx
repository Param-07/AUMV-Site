import React, { useEffect, useMemo, useState } from "react";
import { Plus, Edit, Trash2, X, Upload, Trophy} from "lucide-react";
import SmartImage from "../components/SmartImages";
import { apiRequest } from "../utils/ApiCall";
import toast, { Toaster } from "react-hot-toast";

const badgeStyles = {
  "1st": "bg-yellow-400 text-black",
  "2nd": "bg-slate-300 text-black",
  "3rd": "bg-orange-400 text-black",
};

const CATEGORY_OPTIONS = [
  "Sports",
  "Cultural",
  "Music",
  "Dance",
  "Drama",
  "Art",
  "Science",
  "Robotics",
  "Literary",
  "Other",
];

const LEVEL_OPTIONS = [
  "School",
  "District",
  "State",
  "National",
  "International",
];

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

  const loadAchievers = async () => {
    setLoading(true);
    setLoadingMessage("Loading achievers...");
    try {
      const res = await apiRequest("GET", "/achievers/getAchievers");
      if (res.message === "success") setAchievers(res.achievers || []);
    } catch {
      toast.error("Failed to load achievers");
    }
    finally{
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
      Object.entries(formData).forEach(([Key, value])=>{
        finalData.append(Key, value);
      });

      const endpoint = editing ? `/achievers/editAchiever/${editing?.id}` : "/achievers/addAchiever";
      const method = editing ? "PUT" : "POST";

      const response = await apiRequest(
        method,
        endpoint,
        finalData
      );
      setAchievers((prev) => {
        if (editing) {
          prev.map((a) => (a.id === editing.id ? { ...a, ...response.achievers } : a));
        }
        else{
          [...prev, response.achievers];
        }
      });
    } catch {
      toast.error("Something went wrong");
    }
    finally{
      resetForm(activeTab);
      setLocalLoading(false);
      setLoadingMessage("");
    }
  };

  const remove = async (id) => {
    try{
      setLocalLoading(true);
      setLoadingMessage("Deleting achiever...");
      const response = await apiRequest("DELETE", `/achievers/deleteAchiever/${id}`);
    }
    catch(error){
      toast.error("Failed to delete achiever");
    }
    finally{
      setAchievers((prev) => prev.filter((a) => a.id !== id));
      setLocalLoading(false);
      setLoadingMessage("");
    }
  };

  const openDeleteModal = (achiever) =>
    setDeleteModal({ open: true, achiever });

  const closeDeleteModal = () =>
    setDeleteModal({ open: false, achiever: null });

  const confirmDelete = () => {
    if (deleteModal.achiever) {
        remove(deleteModal.achiever.id)
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-700 shadow-lg">
              <Trophy size={24} className="text-slate-950" />
              <div className="absolute -inset-0.5 rounded-2xl bg-cyan-400/50 blur-lg opacity-60 pointer-events-none" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Achievers</h1>
              <p className="text-sm text-slate-400">
                Manage academic & extracurricular achievers
              </p>
            </div>
          </div>

        <button
          onClick={() => {
            resetForm(activeTab);
            setPopup(true);
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-700 text-slate-950 px-5 py-2 rounded-full text-sm font-semibold shadow-lg"
        >
          <Plus size={16} /> Add Achiever
        </button>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {["Academic", "Extra Curricular"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setFormData({ type: tab });
            }}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
              activeTab === tab
                ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 shadow-lg"
                : "bg-white/5 border border-cyan-300/20 text-slate-200 hover:border-cyan-300/40"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievers.map((a) => (
          <div
            key={a.id}
            className="bg-white/5 backdrop-blur-xl border border-cyan-400/10 rounded-2xl p-5 shadow-xl"
          >
            <div className="relative flex justify-center">
              <div className="h-24 w-24 rounded-full overflow-x-hidden ring-2 ring-cyan-400/70">
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
              <h3 className="font-semibold text-lg">{a.name}</h3>
              <p className="text-cyan-300 text-sm">{a.achievement}</p>

              {a.percentage && (
                <p className="text-emerald-300 text-sm mt-1">
                  {a.percentage}%
                </p>
              )}

              {a.level && (
                <p className="text-slate-400 text-sm">{a.level}</p>
              )}

              {a.description && (
                <p className="text-slate-300 text-xs mt-2 line-clamp-3">
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
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950"
              >
                <Edit size={14} /> Edit
              </button>
              <button
                // onClick={() => remove(a.id)}
                onClick={() => openDeleteModal(a)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-red-500 hover:bg-red-600 text-white"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup */}
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xl">
          <div className="bg-white/5 backdrop-blur-xl border border-cyan-400/10 w-[95%] max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex justify-end px-4 py-3">
              <button onClick={() => resetForm(activeTab)}>
                <X />
              </button>
            </div>

            <form
              onSubmit={submit}
              className="px-6 pb-6 overflow-y-auto max-h-[calc(90vh-56px)] grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Image */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-28 h-28 rounded-2xl overflow-hidden bg-slate-900/70 border border-cyan-300/40">
                  <img
                    src={photoPreview || "/placeholder.png"}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-950/40 border border-slate-700 cursor-pointer text-sm">
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
                  className="w-full p-3 rounded-lg bg-slate-950/40 border border-slate-700"
                />

                <select
                  name="rank"
                  value={formData.rank || ""}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-slate-950/40 border border-slate-700"
                >
                  <option value="">Rank (optional)</option>
                  <option>1st</option>
                  <option>2nd</option>
                  <option>3rd</option>
                </select>

                {activeTab === "Academic" && (
                  <>
                    <input
                      name="class"
                      placeholder="Class"
                      value={formData.class || ""}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-slate-950/40 border border-slate-700"
                    />
                    <input
                      name="percentage"
                      type="number"
                      placeholder="Percentage"
                      value={formData.percentage || ""}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-slate-950/40 border border-slate-700"
                    />
                  </>
                )}

                {activeTab === "Extra Curricular" && (
                  <>
                    <select
                      name="category"
                      value={formData.category || ""}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg bg-slate-950/40 border border-slate-700"
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
                      className="w-full p-3 rounded-lg bg-slate-950/40 border border-slate-700"
                    >
                      <option value="">Select Level</option>
                      {LEVEL_OPTIONS.map((l) => (
                        <option key={l}>{l}</option>
                      ))}
                    </select>
                  </>
                )}

                <input
                  name="year"
                  type="number"
                  placeholder="Year"
                  value={formData.year || ""}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-slate-950/40 border border-slate-700"
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-slate-950/40 border border-slate-700"
                />

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-700 text-slate-950 py-3 rounded-lg font-semibold shadow-lg"
                >
                  {editing ? "Update Achiever" : "Add Achiever"}
                </button>
              </div>
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
    </div>
  );
}
