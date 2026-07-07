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
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [activeCategory, setActiveCategory] =
    useState("All Facilities");

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
  ];

  const loadFacilities = async () => {
    try {
      setLoading(true);
      setLoadingMessage(
        "Loading Facilities..."
      );

      const data = await apiRequest(
        "GET",
        "/facilities/"
      );

      setGroups(
        data.facilities
          .get_facilities_grouped || []
      );
    } catch {
      toast.error(
        "Failed to load facilities"
      );
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  useEffect(() => {
    loadFacilities();
  }, []);

  const handleFile = (e) =>
    setFormData({
      ...formData,
      image: e.target.files[0],
    });

  const flatFacilities =
    groups.flatMap((group) =>
      group.facilities.map(
        (facility) => ({
          ...facility,
          category:
            group.category,
        })
      )
    );

  const filteredFacilities =
    activeCategory ===
    "All Facilities"
      ? flatFacilities
      : flatFacilities.filter(
          (facility) =>
            facility.category ===
            activeCategory
        );  const handleSubmit = async () => {
    if (
      !formData.category ||
      !formData.image
    ) {
      return toast.error(
        "All fields required"
      );
    }

    try {
      setLocalLoading(true);
      setLoadingMessage(
        "Uploading Facility..."
      );

      const form =
        new FormData();

      form.append(
        "category",
        formData.category
      );

      form.append(
        "image",
        formData.image
      );

      await apiRequest(
        "POST",
        "/facilities/addFacilities",
        form
      );

      toast.success(
        "Facility added"
      );

      setModalOpen(false);

      setFormData({
        category: "",
        image: null,
      });

      await loadFacilities();
    } catch {
      toast.error(
        "Upload failed"
      );
    } finally {
      setLocalLoading(false);
      setLoadingMessage("");
    }
  };

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    facilityId: null,
    category: "",
  });

  const confirmDelete = async () => {
  try {
    setLocalLoading(true);
    setLoadingMessage("Deleting Facility...");

    await apiRequest(
      "DELETE",
      `/facilities/delete/${deleteModal.facilityId}`
    );

    setGroups((prev) =>
      prev.map((group) => ({
        ...group,
        facilities: group.facilities.filter(
          (f) =>
            f.id !== deleteModal.facilityId
        ),
      }))
    );

    toast.success("Facility deleted");

    setDeleteModal({
      open: false,
      facilityId: null,
      category: "",
    });
  } catch {
    toast.error("Delete failed");
  } finally {
    setLocalLoading(false);
    setLoadingMessage("");
  }
  };

  const handleDelete = async (
    id
  ) => {
    try {
      setLocalLoading(true);

      setLoadingMessage(
        "Deleting Facility..."
      );

      await apiRequest(
        "DELETE",
        `/facilities/delete/${id}`
      );

      setGroups((prev) =>
        prev.map((group) => ({
          ...group,
          facilities:
            group.facilities.filter(
              (f) =>
                f.id !== id
            ),
        }))
      );

      toast.success(
        "Deleted"
      );
    } catch {
      toast.error(
        "Delete failed"
      );
    } finally {
      setLocalLoading(false);
      setLoadingMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto">

        {/* PAGE HEADER */}
        <div className="flex justify-between items-end mb-8">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">

              <ImageIcon
                size={28}
                className="text-white"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold text-slate-900">
                Facilities Management
              </h1>

              <p className="text-slate-500 mt-1">
                Manage facility images grouped by category
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={loadFacilities}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 transition"
            >
              <RotateCcw size={16} />
              Refresh
            </button>

            <button
              onClick={() =>
                setModalOpen(true)
              }
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg transition"
            >
              <Plus size={16} />
              Add Facility
            </button>

          </div>

        </div>

        {/* CATEGORY TABS */}
        <div className="flex items-center gap-2 mb-8 border-b border-slate-200 overflow-x-auto">

          <button
            onClick={() =>
              setActiveCategory(
                "All Facilities"
              )
            }
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${
              activeCategory ===
              "All Facilities"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            All Facilities
          </button>

          {categories.map(
            (category) => (
              <button
                key={category}
                onClick={() =>
                  setActiveCategory(
                    category
                  )
                }
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                  activeCategory ===
                  category
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                {category}
              </button>
            )
          )}

        </div>        {/* FACILITIES GRID */}
        {loading ? (

          <div className="flex items-center justify-center py-20">

            <div className="text-slate-500">
              Loading Facilities...
            </div>

          </div>

        ) : filteredFacilities.length === 0 ? (

          <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-16 text-center">

            <ImageIcon
              size={50}
              className="mx-auto text-slate-300 mb-4"
            />

            <h3 className="text-xl font-semibold text-slate-800">
              No Facilities Found
            </h3>

            <p className="text-slate-500 mt-2">
              Add a facility or choose another category.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredFacilities.map(
              (facility) => (

                <div
                  key={facility.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group flex flex-col"
                >

                  {/* IMAGE */}
                  <div className="relative h-56 overflow-hidden">

                    <SmartImage
                      src={facility.src}
                      alt={
                        facility.category
                      }
                      width={900}
                      wrapperClassName="w-full h-full"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* CATEGORY BADGE */}
                    <div className="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-md text-sm font-medium text-blue-600 shadow-sm border border-slate-200">

                      {facility.category}

                    </div>

                    {/* HOVER ACTIONS */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4 gap-2">

                      <button
                        onClick={() =>
                              setDeleteModal({
                                open: true,
                                facilityId: facility.id,
                                category: facility.category,
                              })
                        }
                        className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md hover:bg-red-700 transition"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                  </div>

                  {/* CARD CONTENT */}
                  <div className="p-4 flex flex-col flex-1">

                    <h3 className="font-semibold text-lg text-slate-900 mb-1">

                      {facility.category}

                    </h3>

                    <p className="text-sm text-slate-500">

                      School facility image

                    </p>

                    <div className="mt-auto pt-4 flex items-center gap-2 text-slate-400 text-sm">

                      <ImageIcon size={16} />

                      Facility Image

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}
      </div>      {/* ADD FACILITY MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-start justify-between">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Add New Facility
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Upload facility images by category
                </p>
              </div>

              <button
                onClick={() =>
                  setModalOpen(false)
                }
                className="p-2 rounded-lg hover:bg-slate-100 transition"
              >
                <X size={18} />
              </button>

            </div>

            {/* BODY */}
            <div className="p-6">

              {/* IMAGE PREVIEW */}
              <div className="flex justify-center mb-6">

                <div className="w-40 h-40 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 overflow-hidden flex items-center justify-center">

                  {formData.image ? (

                    <img
                      src={URL.createObjectURL(
                        formData.image
                      )}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <div className="text-center text-slate-400">

                      <Upload
                        size={28}
                        className="mx-auto mb-2"
                      />

                      <p className="text-sm">
                        No Image Selected
                      </p>

                    </div>

                  )}

                </div>

              </div>

              <div className="space-y-5">

                {/* IMAGE UPLOAD */}
                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Upload Image
                  </label>

                  <label className="cursor-pointer block">

                    <div className="flex justify-center px-6 py-5 border-2 border-dashed border-slate-300 rounded-lg hover:bg-slate-50 transition">

                      <div className="text-center">

                        <Upload
                          size={20}
                          className="mx-auto text-slate-400 mb-2"
                        />

                        <span className="text-sm font-medium text-blue-600">
                          Choose Image
                        </span>

                      </div>

                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFile}
                      className="hidden"
                    />

                  </label>

                </div>

                {/* CATEGORY */}
                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category
                  </label>

                  <select
                    value={
                      formData.category
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category:
                          e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >

                    <option value="">
                      Select Category
                    </option>

                    {categories.map(
                      (category) => (
                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>
                      )
                    )}

                  </select>

                </div>

              </div>

            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">

              <button
                onClick={() =>
                  setModalOpen(false)
                }
                className="px-5 py-2.5 border border-slate-300 rounded-lg hover:bg-white transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={localLoading}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition disabled:opacity-60"
              >
                Add Facility
              </button>

            </div>

          </div>

        </div>
      )}
      {deleteModal.open && (
      <div className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

        <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">

          <div className="p-6">

            <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">

              <Trash2
                size={28}
                className="text-red-600"
              />

            </div>

            <h3 className="text-xl font-bold text-center text-slate-900">
              Delete Facility
            </h3>

            <p className="text-center text-slate-500 mt-2">
              Are you sure you want to delete this facility image?
            </p>

            <p className="text-center font-semibold text-slate-800 mt-2">
              {deleteModal.category}
            </p>

          </div>

          <div className="border-t border-slate-200 p-4 bg-slate-50 flex justify-end gap-3">

            <button
              onClick={() =>
                setDeleteModal({
                  open: false,
                  facilityId: null,
                  category: "",
                })
              }
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
      {(loading || localLoading) && (
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

    </div>
  );
}