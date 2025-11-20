import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, X, Sun, Moon } from "lucide-react";
import { apiRequest } from "../utils/ApiCall";
import ErrorModal from "../components/ErrorModal";
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
  const [darkMode, setDarkMode] = useState(false);
  const [searchQ, setSearchQ] = useState("");

  const [form, setForm] = useState({
    title: "",
    valid_till: "",
    description: ""
  });

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setLoadingMessage("Loading events...");
      const data = await apiRequest("GET", "/getEvents");
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
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    const finalData = new FormData();
    Object.entries(form).forEach(([k, v]) => finalData.append(k, v));

    if (editingEvent) {
      try {
        setLoading(true);
        setLoadingMessage("Updating event...");
        const r = await apiRequest("PUT", `/edit/Events/${editingEvent.id}`, finalData);
        setEvents((p) => p.map((ev) => (ev.id === editingEvent.id ? { ...ev, ...r.event } : ev)));
        toast.success("Event updated");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        setLoadingMessage("Adding event...");
        const r = await apiRequest("POST", "/addEvents", finalData);
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
      description: ev.description
    });
    setErrors({});
    setModalOpen(true);
  };

  const openAddModal = () => {
    setEditingEvent(null);
    setForm({ title: "", valid_till: "", description: "" });
    setErrors({});
    setModalOpen(true);
  };

  const openDeleteModal = (id, title) => setDeleteModal({ open: true, id, title });
  const closeDeleteModal = () => setDeleteModal({ open: false, id: null, title: "" });

  const confirmDelete = async () => {
    try {
      setLoading(true);
      setLoadingMessage("Deleting...");
      const r = await apiRequest("DELETE", `/delete/Event/${deleteModal.id}`);
      if (r.message === "Deletion success") {
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

  const Animations = (
    <style>{`
      @keyframes fadeIn { from {opacity:0;} to {opacity:1;} }
      .animate-fadeIn { animation: fadeIn .3s ease-out; }
      @keyframes scaleIn { from { transform:scale(.96); opacity:0;} to {transform:scale(1); opacity:1;} }
      .animate-scaleIn { animation: scaleIn .25s ease-out; }
      @keyframes shimmer { 0% { background-position:-200px 0 } 100% {background-position:200px 0} }
      .skeleton { background:linear-gradient(90deg,#e2e2e2 25%,#f6f6f6 50%,#e2e2e2 75%); background-size:400px 100%; animation:shimmer 1.2s infinite; }
    `}</style>
  );

  return (
    <div className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"} min-h-screen p-6`}>
      {Animations}
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Events & Announcements</h1>
            <p className="text-sm opacity-70">Manage upcoming events</p>
          </div>

          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}>
              <input
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Search…"
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>

            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-white/20">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-xl text-white"
            >
              <Plus size={18} /> Add Event
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-2xl p-6 shadow`}>
            <h2 className="text-lg font-semibold">Overview</h2>
            <p className="text-sm opacity-80 mt-1">Quick stats</p>

            <div className="mt-6">
              <p className="text-xs opacity-70">Total Events</p>
              <p className="text-4xl font-bold">{events.length}</p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button className="px-4 py-2 rounded-lg bg-purple-700 text-white" onClick={openAddModal}>
                Create Event
              </button>
              <button
                onClick={fetchEvents}
                className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10"
              >
                Refresh
              </button>
            </div>
          </div>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex flex-col gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="skeleton h-32 rounded-xl"></div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {filteredEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition animate-scaleIn 
                      ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`${darkMode ? "bg-purple-700/40 text-purple-200" : "bg-purple-100 text-purple-700"} px-3 py-1 text-xs rounded-full font-semibold`}>
                          EVENT
                        </span>
                        <span className="text-xs opacity-70">ID: {ev.id}</span>
                      </div>
                      <span className="text-xs opacity-60">
                        {ev.created_at ? ev.created_at.slice(0, 10) : ""}
                      </span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-orange-500">{ev.title}</h3>

                        <p className="mt-2 text-sm opacity-80 leading-relaxed max-w-2xl">
                          {ev.description}
                        </p>

                        <div className="mt-3 text-sm opacity-70 flex items-center gap-2">
                          <span className="font-medium">Valid Till:</span>
                          <span>{ev.valid_till}</span>
                        </div>
                      </div>

                      <div className="flex gap-3 lg:flex-col lg:w-40 justify-end">
                        <button
                          onClick={() => openEditModal(ev)}
                          className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-1"
                        >
                          <Edit size={16} /> Edit
                        </button>

                        <button
                          onClick={() => openDeleteModal(ev.id, ev.title)}
                          className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-1"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-[95%] max-w-2xl rounded-2xl p-6 shadow-2xl animate-scaleIn relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full">
              <X size={20} />
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="w-24 h-24 rounded-xl bg-gradient-to-tr from-purple-600 to-orange-400 flex items-center justify-center text-white text-xl font-bold">
                  {editingEvent ? "ED" : "NEW"}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="md:w-2/3 space-y-4">
                <div>
                  <label className="text-sm mb-1 block">Event Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full p-3 rounded-lg border"
                  />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>

                <div>
                  <label className="text-sm mb-1 block">Valid Till *</label>
                  <input
                    type="date"
                    value={form.valid_till}
                    onChange={(e) => setForm({ ...form, valid_till: e.target.value })}
                    className="w-full p-3 rounded-lg border"
                  />
                  {errors.valid_till && <p className="text-red-500 text-sm">{errors.valid_till}</p>}
                </div>

                <div>
                  <label className="text-sm mb-1 block">Description *</label>
                  <textarea
                    rows="4"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full p-3 rounded-lg border"
                  />
                  {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>

                <div className="flex gap-3">
                  <button type="submit" className="px-4 py-2 rounded-lg bg-purple-700 text-white">
                    {editingEvent ? "Update Event" : "Add Event"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-lg border"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-xl p-6 shadow-2xl w-[90%] max-w-sm">
            <h3 className="text-lg font-semibold">Delete Event?</h3>
            <p className="text-sm opacity-80 mt-2">Delete <b>{deleteModal.title}</b>?</p>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={closeDeleteModal} className="px-4 py-2 border rounded-lg">
                Cancel
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50 animate-fadeIn">
          <div className="flex flex-col items-center gap-5">
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 animate-spin rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)]"></div>
            <p className="text-purple-200 text-lg">{loadingMessage}</p>
          </div>
        </div>
      )}

      {error && <ErrorModal {...error} onClose={() => setError("")} />}
    </div>
  );
}
