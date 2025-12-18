import React, { useState, useEffect } from "react";
import SmartImage from "../components/SmartImages";
import {
  Plus,
  Trash2,
  Upload,
  X,
  RotateCcw,
  Image as ImageIcon,
} from "lucide-react";
import { apiRequest } from "../utils/ApiCall";
import toast, { Toaster } from "react-hot-toast";

export default function AdminFacilities() {
  const [groups, setGroups] = useState([]); // grouped data
  const [loading, setLoading] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    category: "",
    image: null,
  });

  const categories = [
    "Computer Lab",
    "Smart Class",
    "Library",
    "Transport",
    "Playground",
    "Science Lab",
    "Music Room",
    "Art Room",
  ];

  const cardGlass =
    "bg-white/6 backdrop-blur-xl border border-cyan-400/8 shadow-[0_18px_45px_rgba(2,6,23,0.55)]";

  const loadFacilities = async () => {
    try {
      setLoading(true);
      const data = await apiRequest("GET", "/facilities/");
      setGroups(data.facilities || []);
    } catch {
      toast.error("Failed to load facilities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFacilities();
  }, []);

  const handleFile = (e) =>
    setFormData({ ...formData, image: e.target.files[0] });

  const handleSubmit = async () => {
    if (!formData.category || !formData.image) {
      return toast.error("All fields required");
    }

    try {
      setLocalLoading(true);

      const form = new FormData();
      form.append("category", formData.category);
      form.append("image", formData.image);

      await apiRequest("POST", "/facilities/addFacilities", form);

      toast.success("Facility added");
      setModalOpen(false);
      setFormData({ category: "", image: null });
      await loadFacilities();
    } catch {
      toast.error("Upload failed");
    } finally {
      setLocalLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLocalLoading(true);
      await apiRequest("DELETE", `/facilities/delete/${id}`);

      setGroups((prev) =>
        prev.map((g) => ({
          ...g,
          facilities: g.facilities.filter((f) => f.id !== id),
        }))
      );

      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-50 p-6">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-cyan-400 to-blue-700 shadow-[0_12px_30px_rgba(3,7,18,0.8)]">
              <ImageIcon className="text-slate-900" />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">
                School Facilities
              </h1>
              <p className="text-sm text-slate-300">
                Manage facility images grouped by category
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadFacilities}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/70 border border-slate-700 text-slate-200 hover:bg-slate-800 transition"
            >
              <RotateCcw size={16} /> Refresh
            </button>

            <button
              onClick={() => setModalOpen(true)}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-700 text-slate-900 font-semibold shadow-lg hover:opacity-95 active:scale-95"
            >
              <Plus size={16} /> Add Facility
              <span className="absolute -inset-0.5 rounded-full bg-cyan-400/30 blur opacity-50" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-10 text-center text-slate-400">Loading...</div>
        ) : groups.length === 0 ? (
          <div
            className={`${cardGlass} rounded-2xl p-10 text-center border border-cyan-400/8`}
          >
            <p className="text-slate-300">No facilities added yet.</p>
          </div>
        ) : (
          groups.map((group, gIndex) => (
            <div key={gIndex} className="mb-10">
              <h2 className="text-xl font-semibold mb-4 text-cyan-300">
                {group.category}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {group.facilities.map((item) => (
                  <div
                    key={item.id}
                    className={`${cardGlass} rounded-2xl overflow-hidden relative group`}
                  >
                    <div className="w-full h-56 overflow-hidden">
                      <SmartImage
                        src={item.src}
                        alt={group.category}
                        width={900}
                        wrapperClassName="w-full h-full"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{group.category}</h3>
                    </div>

                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 p-2 rounded-lg text-white hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="w-full max-w-md bg-slate-900/70 border border-cyan-400/8 rounded-2xl p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/50 hover:bg-slate-800/70"
            >
              <X size={18} />
            </button>

            <h2 className="text-2xl font-semibold mb-2">Add Facility</h2>

            <label className="block text-sm mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-50 mb-4"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label className="block text-sm mb-2">Facility Image</label>
            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-800 cursor-pointer mb-6">
              <Upload size={18} className="text-cyan-300" />
              <span className="text-sm text-slate-200">
                {formData.image?.name || "Choose image"}
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </label>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSubmit}
                disabled={localLoading}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-900 rounded-xl font-semibold hover:opacity-95 disabled:opacity-60"
              >
                Add Facility
              </button>

              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-800 text-slate-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {(localLoading || loading) && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin" />
              <div className="absolute inset-0 rounded-full border-4 border-cyan-500/10 blur" />
              <div className="absolute inset-4 rounded-full bg-cyan-400/20 animate-pulse" />
            </div>
            <p className="text-cyan-200 font-medium">Working...</p>
          </div>
        </div>
      )}
    </div>
  );
}
