import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  X,
  CalendarDays,
  RefreshCw,
  Search,
} from "lucide-react";
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

  const [searchQ, setSearchQ] = useState("");

  const [errors, setErrors] = useState({});

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    id: null,
    title: "",
  });

  const [form, setForm] = useState({
    title: "",
    valid_till: "",
    description: "",
  });

  /* ----------------------------- */
  /* FETCH EVENTS                  */
  /* ----------------------------- */

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setLoadingMessage("Loading events...");

      const data = await apiRequest(
        "GET",
        "/events/"
      );

      setEvents(data.events || []);
    } catch (err) {
      setError({
        type: "error",
        title: "Loading Error",
        message:
          err?.response?.data?.message ||
          "Unable to load events",
      });
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  /* ----------------------------- */
  /* VALIDATION                    */
  /* ----------------------------- */

  const validateForm = () => {
    let temp = {};

    if (!form.title?.trim()) {
      temp.title =
        "Event title is required";
    }

    if (!form.valid_till) {
      temp.valid_till =
        "Valid till date required";
    }

    if (!form.description?.trim()) {
      temp.description =
        "Description is required";
    }

    setErrors(temp);

    return (
      Object.keys(temp).length === 0
    );
  };

  /* ----------------------------- */
  /* ADD / EDIT EVENT              */
  /* ----------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error(
        "Please fill all required fields"
      );
      return;
    }

    const finalData =
      new FormData();

    Object.entries(form).forEach(
      ([key, value]) => {
        finalData.append(
          key,
          value
        );
      }
    );

    try {
      setLoading(true);

      if (editingEvent) {
        setLoadingMessage(
          "Updating event..."
        );

        const response =
          await apiRequest(
            "PUT",
            `/events/edit/${editingEvent.id}`,
            finalData
          );

        setEvents((prev) =>
          prev.map((event) =>
            event.id ===
            editingEvent.id
              ? {
                  ...event,
                  ...response.event,
                }
              : event
          )
        );

        toast.success(
          "Event updated"
        );
      } else {
        setLoadingMessage(
          "Adding event..."
        );

        const response =
          await apiRequest(
            "POST",
            "/events/addEvents",
            finalData
          );

        setEvents((prev) => [
          response.event,
          ...prev,
        ]);

        toast.success(
          "Event added"
        );
      }

      setModalOpen(false);
      setEditingEvent(null);

      setForm({
        title: "",
        valid_till: "",
        description: "",
      });

      setErrors({});
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  /* ----------------------------- */
  /* EDIT EVENT                    */
  /* ----------------------------- */

  const openEditModal = (
    event
  ) => {
    setEditingEvent(event);

    setForm({
      title: event.title || "",
      valid_till:
        event.valid_till || "",
      description:
        event.description || "",
    });

    setModalOpen(true);
  };

  const openAddModal = () => {
    setEditingEvent(null);

    setForm({
      title: "",
      valid_till: "",
      description: "",
    });

    setModalOpen(true);
  };

  /* ----------------------------- */
  /* DELETE EVENT                  */
  /* ----------------------------- */

  const openDeleteModal = (
    id,
    title
  ) => {
    setDeleteModal({
      open: true,
      id,
      title,
    });
  };

  const closeDeleteModal =
    () => {
      setDeleteModal({
        open: false,
        id: null,
        title: "",
      });
    };

  const confirmDelete =
    async () => {
      try {
        setLoading(true);
        setLoadingMessage(
          "Deleting event..."
        );

        const response =
          await apiRequest(
            "DELETE",
            `/events/delete/${deleteModal.id}`
          );

        if (
          response.message ===
          "deleted"
        ) {
          setEvents((prev) =>
            prev.filter(
              (event) =>
                event.id !==
                deleteModal.id
            )
          );

          toast.success(
            "Event deleted"
          );
        }
      } catch (err) {
        toast.error(
          err?.response?.data
            ?.message ||
            "Delete failed"
        );
      } finally {
        setLoading(false);
        closeDeleteModal();
      }
    };

  /* ----------------------------- */
  /* SEARCH FILTER                 */
  /* ----------------------------- */

  const filteredEvents =
    events.filter((event) => {
      const q =
        searchQ.toLowerCase();

      return (
        event.title
          ?.toLowerCase()
          .includes(q) ||
        event.description
          ?.toLowerCase()
          .includes(q) ||
        event.valid_till
          ?.toLowerCase()
          .includes(q)
      );
    }); 
    
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto">

          {/* PAGE HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">

            <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-md">
              <CalendarDays
                size={28}
                className="text-white"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Events & Announcements
              </h1>

              <p className="text-slate-500 mt-1">
                Manage and publish upcoming happenings
              </p>
            </div>

          </div>

            <div className="flex items-center gap-3">

              <input
                value={searchQ}
                onChange={(e) =>
                  setSearchQ(e.target.value)
                }
                placeholder="Search events..."
                className="w-72 px-4 py-2.5 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={openAddModal}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg flex items-center gap-2 font-medium"
              >
                <Plus size={18} />
                Add Event
              </button>

            </div>

          </div>

          {/* EVENTS LIST */}
          <div className="flex flex-col gap-5">{filteredEvents.length === 0 ? (

          <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-12 flex flex-col items-center text-center">

            <CalendarDays
              size={48}
              className="text-slate-300 mb-3"
            />

            <p className="text-lg text-slate-600">
              No more events to display
            </p>

            <p className="text-sm text-slate-400 mt-1">
              Click Add Event to create a new announcement.
            </p>

          </div>

        ) : (

          filteredEvents.map((event) => (

            <div
              key={event.id}
              className="relative bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden"
            >

              {/* LEFT ACCENT BAR */}
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-600 to-blue-400"></div>

              {/* TOP ROW */}
              <div className="flex items-center justify-between mb-4">

                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                  Event
                </span>

                <span className="text-sm text-slate-400">
                  {event.created_at?.slice(0, 10)}
                </span>

              </div>

              {/* CONTENT */}
              <div className="mb-6">

                <h3 className="text-2xl font-bold text-blue-700 mb-2">
                  {event.title}
                </h3>

                <p className="text-slate-600 mb-4">
                  {event.description}
                </p>

                <p className="text-sm text-slate-500">
                  <span className="font-semibold">
                    Valid Till:
                  </span>{" "}
                  {event.valid_till}
                </p>

              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">

                <button
                  onClick={() =>
                    openEditModal(event)
                  }
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                  <Edit size={15} />
                  Edit
                </button>

                <button
                  onClick={() =>
                    openDeleteModal(
                      event.id,
                      event.title
                    )
                  }
                  className="px-5 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2 hover:bg-red-700"
                >
                  <Trash2 size={15} />
                  Delete
                </button>

              </div>

            </div>

          ))
        )}{/* ADD / EDIT EVENT MODAL */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

            <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">

              {/* HEADER */}
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {editingEvent
                      ? "Edit Event"
                      : "Add New Event"}
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Manage event information
                  </p>
                </div>

                <button
                  onClick={() => {
                    setModalOpen(false);
                    setEditingEvent(null);
                    setErrors({});
                  }}
                  className="p-2 rounded-lg hover:bg-slate-100 transition"
                >
                  <X size={18} />
                </button>

              </div>

              {/* BODY */}
              <div className="p-6">

                <form
                  id="event-form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  {/* TITLE */}
                  <div>

                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Event Title
                    </label>

                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          title: e.target.value,
                        })
                      }
                      placeholder="Enter event title"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />

                    {errors.title && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.title}
                      </p>
                    )}

                  </div>

                  {/* VALID TILL */}
                  <div>

                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Valid Till
                    </label>

                    <input
                      type="date"
                      value={form.valid_till}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          valid_till: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />

                    {errors.valid_till && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.valid_till}
                      </p>
                    )}

                  </div>

                  {/* DESCRIPTION */}
                  <div>

                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Description
                    </label>

                    <textarea
                      rows={5}
                      value={form.description}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          description:
                            e.target.value,
                        })
                      }
                      placeholder="Enter event description"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />

                    {errors.description && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.description}
                      </p>
                    )}

                  </div>

                </form>

              </div>

              {/* FOOTER */}
              <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3 bg-slate-50">

                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setEditingEvent(null);
                    setErrors({});
                  }}
                  className="px-5 py-2.5 border border-slate-300 rounded-lg hover:bg-white transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  form="event-form"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                >
                  {editingEvent
                    ? "Update Event"
                    : "Add Event"}
                </button>

              </div>

            </div>

          </div>
        )}      {/* DELETE MODAL */}
              {deleteModal.open && (
                <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

                  <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">

                    <div className="p-6">

                      <div className="w-14 h-14 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">

                        <Trash2
                          size={24}
                          className="text-red-600"
                        />

                      </div>

                      <h3 className="text-xl font-bold text-center text-slate-900">
                        Delete Event
                      </h3>

                      <p className="text-center text-slate-500 mt-2">
                        Are you sure you want to delete
                      </p>

                      <p className="text-center font-semibold text-slate-900 mt-1 break-words">
                        {deleteModal.title}
                      </p>

                    </div>

                    <div className="border-t border-slate-200 p-4 flex justify-end gap-3 bg-slate-50">

                      <button
                        onClick={closeDeleteModal}
                        className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-white transition"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={confirmDelete}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>
              )}

              {/* LOADER */}
              {loading && (
                <div className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm flex items-center justify-center">

                  <div className="bg-white rounded-xl shadow-xl px-8 py-6 flex flex-col items-center">

                    <div className="relative">

                      <div className="w-14 h-14 border-4 border-slate-200 rounded-full"></div>

                      <div className="absolute inset-0 w-14 h-14 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>

                    </div>

                    <p className="mt-4 text-sm font-medium text-slate-700">
                      {loadingMessage || "Loading..."}
                    </p>

                  </div>

                </div>
              )}

              {/* ERROR MODAL */}
              {error && (
                <ErrorModal
                  {...error}
                  onClose={() =>
                    setError("")
                  }
                />
              )}

          </div>
      </div>
    </div>
  )};