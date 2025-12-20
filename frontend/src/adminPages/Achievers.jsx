import React, { useEffect, useMemo, useState } from "react";
import { Plus, Edit, Trash2, X, Upload } from "lucide-react";
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

  const loadAchievers = async () => {
    setLoading(true);
    try {
      const res = await apiRequest("GET", "/achievers/getAchievers");
      if (res.message === "success") setAchievers(res.achievers || []);
    } catch {
      toast.error("Failed to load achievers");
    }
    setLoading(false);
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
      const finalData = new FormData();
      Object.entries(formData).forEach(([Key, value])=>{
        finalData.append(Key, value);
      });
      console.log(formData);
      const endpoint = editing ? `/achievers/editAchiever/${editing?.id}` : "/achievers/addAchiever";
      const method = editing ? "PUT" : "POST";
      await apiRequest(
        method,
        endpoint,
        finalData
      );
      resetForm(activeTab);
      loadAchievers();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const remove = async (id) => {
    await apiRequest("DELETE", `/achievers/deleteAchiever/${id}`);
    loadAchievers();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 p-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Achievers
          </h1>
          <p className="text-sm text-slate-300">
            Manage academic & extracurricular achievers
          </p>
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
      <div className="flex gap-3 mb-8">
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
                onClick={() => remove(a.id)}
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

      {loading && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          Loading...
        </div>
      )}
    </div>
  );
}
