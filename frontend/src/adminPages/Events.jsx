import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, X, Sun, Moon, CalendarDays } from "lucide-react";
import { apiRequest } from "../utils/ApiCall";
import ErrorModal from "../components/common/ErrorModal";
import toast, { Toaster } from "react-hot-toast";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, title: "" });
  const [darkMode, setDarkMode] = useState(true); // default for neo-glass
  const [searchQ, setSearchQ] = useState("");

  const [form, setForm] = useState({
    title: "",
    valid_till: "",
    description: "",
  });

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setLoadingMessage("Loading events...");
      const data = await apiRequest("GET", "/events/");
      setEvents(data.events || []);
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const validateForm = () => {
    let temp = {};
    if (!form.title.trim()) temp.title = "Event title is required";
    if (!form.valid_till) temp.valid_till = "Date is required";
    if (!form.description.trim()) temp.description = "Description required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateForm()) return toast.error("Fill all required fields");

    const finalData = new FormData();
    Object.entries(form).forEach(([k, v]) => finalData.append(k, v));

    if (editingEvent) {
      try {
        setLoading(true);
        setLoadingMessage("Updating event...");
        const r = await apiRequest("PUT", `/events/edit/${editingEvent.id}`, finalData);
        setEvents((p) => p.map((ev) => (ev.id === editingEvent.id ? { ...ev, ...r.event } : ev)));
        toast.success("Event updated");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        setLoadingMessage("Adding event...");
        const r = await apiRequest("POST", "/events/addEvents", finalData);
        setEvents((p) => [...p, r.event]);
        toast.success("Event added");
      } finally {
        setLoading(false);
      }
    }

    setModalOpen(false);
    setEditingEvent(null);
    setForm({ title: "", valid_till: "", description: "" });
    setErrors({});
  };

  const openEditModal = (ev) => {
    setEditingEvent(ev);
    setForm({
      title: ev.title,
      valid_till: ev.valid_till,
      description: ev.description,
    });
    setModalOpen(true);
  };

  const openAddModal = () => {
    setEditingEvent(null);
    setForm({ title: "", valid_till: "", description: "" });
    setModalOpen(true);
  };

  const openDeleteModal = (id, title) => setDeleteModal({ open: true, id, title });
  const closeDeleteModal = () => setDeleteModal({ open: false, id: null, title: "" });

  const confirmDelete = async () => {
    try {
      setLoading(true);
      setLoadingMessage("Deleting event...");
      const r = await apiRequest("DELETE", `/events/delete/${deleteModal.id}`);
      if (r.message === "deleted") {
        setEvents((p) => p.filter((e) => e.id !== deleteModal.id));
        toast.success("Event deleted");
      }
    } finally {
      setLoading(false);
      closeDeleteModal();
    }
  };

  const filteredEvents = events.filter((ev) => {
    const q = searchQ.toLowerCase();
    return (
      ev.title?.toLowerCase().includes(q) ||
      ev.description?.toLowerCase().includes(q) ||
      ev.valid_till?.toLowerCase().includes(q)
    );
  });

  return (
    <div className={`min-h-screen p-6 transition-all duration-300 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50`}>
      <Toaster position="top-right" />

      {/* HEADER */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-700 shadow-lg">
              <CalendarDays size={24} className="text-slate-950" />
              <div className="absolute -inset-0.5 rounded-2xl bg-cyan-400/50 blur-lg opacity-60 pointer-events-none" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Events & Announcements</h1>
              <p className="text-sm text-slate-400">
                Manage and publish upcoming happenings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-cyan-300/20 text-slate-200 px-3 py-2 rounded-lg shadow">
              <input
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Search events..."
                className="bg-transparent outline-none text-sm w-44 md:w-64 placeholder:text-slate-400"
              />
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-white/10 border border-cyan-200/20 hover:bg-white/20 transition"
            >
              {darkMode ? <Sun size={18} className="text-yellow-300" /> : <Moon size={18} className="text-sky-300" />}
            </button>

            <button
              onClick={openAddModal}
              className="relative flex items-center gap-2 bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-700 text-slate-950 px-4 py-2 rounded-xl font-semibold shadow-xl active:scale-95 transition"
            >
              <Plus size={18} />
              Add Event
              <span className="absolute -inset-0.5 rounded-xl bg-cyan-400/40 blur opacity-70 pointer-events-none" />
            </button>
          </div>
        </div>

        {/* OVERVIEW + LIST */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Overview */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-cyan-300/10 p-6 shadow-xl">
            <h2 className="text-lg font-semibold">Overview</h2>
            <p className="text-sm text-slate-400 mt-1">Quick statistics</p>

            <div className="mt-6">
              <p className="text-xs text-slate-400">Total Events</p>
              <p className="text-4xl font-bold text-sky-300">{events.length}</p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button onClick={openAddModal} className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold shadow transition">
                Create Event
              </button>
              <button
                onClick={fetchEvents}
                className="px-4 py-2 rounded-lg border border-cyan-200/30 bg-white/5 text-slate-200 hover:bg-white/10 transition"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Event Cards */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-32 rounded-2xl bg-white/5 border border-cyan-300/10 backdrop-blur-xl animate-pulse" />
              ))
            ) : (
              filteredEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-cyan-300/10 shadow-[0_18px_45px_rgba(0,0,0,0.65)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.75)] transition"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-cyan-500/30 text-cyan-200 rounded-full font-semibold text-xs">
                      EVENT
                    </span>
                    <span className="text-xs text-slate-400">{ev.created_at?.slice(0, 10)}</span>
                  </div>

                  <h3 className="text-2xl font-semibold text-cyan-300">{ev.title}</h3>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">{ev.description}</p>

                  <p className="text-sm text-slate-400 mt-3">
                    <span className="font-medium text-slate-200">Valid Till:</span> {ev.valid_till}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      onClick={() => openEditModal(ev)}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 font-semibold text-white flex items-center gap-2 shadow active:scale-95 transition"
                    >
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(ev.id, ev.title)}
                      className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 font-semibold text-white flex items-center gap-2 shadow active:scale-95 transition"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xl z-50 flex items-center justify-center animate-fadeIn">
          <div className="w-[95%] max-w-2xl rounded-3xl bg-white/5 backdrop-blur-xl p-7 border border-cyan-400/10 shadow-[0_15px_45px_rgba(0,0,0,0.8)] animate-scaleIn relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 border border-slate-600 hover:bg-white/20 transition">
              <X size={20} />
            </button>

            <h2 className="text-2xl font-semibold text-sky-300 mb-6 text-center">
              {editingEvent ? "Edit Event" : "Add New Event"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm mb-1 block text-slate-200">Event Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full p-3 rounded-lg border bg-slate-950/40 text-sm text-slate-50 outline-none border-slate-700 focus:ring-2 focus:ring-cyan-400"
                />
                {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="text-sm mb-1 block text-slate-200">Valid Till *</label>
                <input
                  type="date"
                  value={form.valid_till}
                  onChange={(e) => setForm({ ...form, valid_till: e.target.value })}
                  className="w-full p-3 rounded-lg border bg-slate-950/40 text-sm text-slate-50 outline-none border-slate-700 focus:ring-2 focus:ring-cyan-400"
                />
                {errors.valid_till && <p className="text-red-400 text-xs mt-1">{errors.valid_till}</p>}
              </div>

              <div>
                <label className="text-sm mb-1 block text-slate-200">Description *</label>
                <textarea
                  rows="4"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-3 rounded-lg border bg-slate-950/40 text-sm text-slate-50 outline-none border-slate-700 focus:ring-2 focus:ring-cyan-400"
                />
                {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-950/40 border border-slate-700 text-slate-100 hover:bg-slate-900/80 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-700 text-slate-950 font-semibold shadow-md active:scale-95 transition"
                >
                  {editingEvent ? "Update Event" : "Add Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {deleteModal.open && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xl z-50 flex items-center justify-center animate-fadeIn">
          <div className="w-[92%] max-w-sm rounded-3xl bg-white/5 backdrop-blur-xl p-6 border border-cyan-400/10 shadow-[0_15px_45px_rgba(0,0,0,0.8)] animate-scaleIn">
            <h3 className="text-lg font-semibold text-sky-300">Delete Event?</h3>
            <p className="text-sm text-slate-300 mt-2">
              Remove <span className="font-semibold text-white">{deleteModal.title}</span>?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 rounded-lg bg-slate-950/40 border border-slate-700 text-slate-100 hover:bg-slate-900/80 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 font-semibold text-white shadow transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {loading  && (
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

      {error && <ErrorModal {...error} onClose={() => setError("")} />}
    </div>
  );
}
