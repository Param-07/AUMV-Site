import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Images,
  Plus,
  Trash2,
  Upload,
  X,
  Edit,
  RefreshCw,
} from "lucide-react";

import SmartImage from "../components/SmartImages";
import { apiRequest } from "../utils/ApiCall";
import toast, {
  Toaster,
} from "react-hot-toast";

const AdminGallery = () => {
  const [gallery, setGallery] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [activeCategory, setActiveCategory] =
    useState("All Photos");

  const [loading, setLoading] =
    useState(false);

  const [loadingMessage, setLoadingMessage] =
    useState("");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [deleteModal, setDeleteModal] =
    useState({
      open: false,
      image: null,
    });

  const [formData, setFormData] =
    useState({
      event_name: "",
      description: "",
      photo: null,
      position: ""
    });

  const [photoPreview, setPhotoPreview] =
    useState(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      setLoadingMessage(
        "Loading Gallery..."
      );

      const response =
        await apiRequest(
          "GET",
          "/gallery/"
        );

      if (
        response.message ===
        "success"
      ) {
        setGallery(
          response.admin_images || []
        );

        if (
          response.categories
        ) {
          const cats =
            response.categories
              .get_unique_event_names
              .split(",")

              .map((c) =>
                c.trim()
              );

          setCategories(cats);
        }
      }
    } catch {
      toast.error(
        "Failed to load gallery"
      );
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const filteredGallery =
    useMemo(() => {
      if (
        activeCategory ===
        "All Photos"
      ) {
        return gallery;
      }

      return gallery.filter(
        (item) =>
          item.category ===
          activeCategory
      );
    }, [
      gallery,
      activeCategory,
    ]);

  const handleChange = (e) => {
    const {
      name,
      value,
      files,
      type,
    } = e.target;

    if (type === "file") {
      const file = files[0];

      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));

      if (file) {
        setPhotoPreview(
          URL.createObjectURL(file)
        );
      }

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };  
  
  const resetForm = () => {
    setModalOpen(false);

    setFormData({
      event_name: "",
      description: "",
      photo: null,
      position: ""
    });

    setPhotoPreview(null);
  };

  const handleSubmit = async () => {
    if (
      !formData.event_name ||
      !formData.description ||
      !formData.photo
    ) {
      return toast.error(
        "Please fill all fields"
      );
    }

    try {
      setLoading(true);
      setLoadingMessage(
        "Uploading Photo..."
      );

      if (formData.event_name === "Student Life") formData.description = formData.description + "~~" + formData.position;
      const finalData =
        new FormData();

      Object.entries(
        formData
      ).forEach(([key, value]) => {
        finalData.append(
          key,
          value
        );
      });

      const response =
        await apiRequest(
          "POST",
          "/gallery/upload",
          finalData
        );

      if (
        response.message ===
        "success"
      ) {
        setCategories((prev) => {
          if (
            !prev.includes(response.data.category)
          ) {
            return [...prev, response.data.category];
          }
          return prev;
        });
        setGallery((prev) => [
          ...prev,
          response.data,
        ]);
        setActiveCategory(response.data.category);

        toast.success(
          "Photo uploaded successfully"
        );

        resetForm();

        // fetchGallery();
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Upload failed"
      );
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  const confirmDelete =
    async () => {
      try {
        setLoading(true);
        setLoadingMessage(
          "Deleting Image..."
        );

        const response =
          await apiRequest(
            "DELETE",
            `/gallery/delete/${deleteModal.image.id}`
          );

        if (
          response.message ===
          "deleted"
        ) {
          setGallery((prev) =>
            prev.filter(
              (item) =>
                item.id !==
                deleteModal.image.id
            )
          );

          toast.success(
            "Image deleted"
          );

          setDeleteModal({
            open: false,
            image: null,
          });

          fetchGallery();
        }
      } catch (error) {
        toast.error(
          "Delete failed"
        );
      } finally {
        setLoading(false);
        setLoadingMessage("");
      }
    };

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

              <Images
                size={28}
                className="text-blue-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold text-slate-900">
                Photo Gallery
              </h1>

              <p className="text-slate-500 mt-1">
                Upload and organize images across school events
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">

            {/* STATS */}
            <div className="hidden md:flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm">

              <div className="pr-4 border-r border-slate-200">

                <span className="block text-xs uppercase text-slate-500 font-semibold">
                  Total Records
                </span>

                <span className="block text-xl font-bold text-blue-600">
                  {gallery.length}
                </span>

              </div>

              <div className="pl-4">

                <span className="text-green-600 font-medium text-sm">
                  Synchronized
                </span>

              </div>

            </div>

            <button
              onClick={fetchGallery}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg bg-white hover:bg-slate-100"
            >
              <RefreshCw size={16} />
              Refresh
            </button>

            <button
              onClick={() =>
                setModalOpen(true)
              }
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg transition"
            >
              <Plus size={18} />
              Upload Photo
            </button>

          </div>

        </div>

        {/* CATEGORY FILTERS */}
        <div className="mb-8 overflow-x-auto">

          <div className="flex items-center gap-2 min-w-max">

            <button
              onClick={() =>
                setActiveCategory(
                  "All Photos"
                )
              }
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                activeCategory ===
                "All Photos"
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-100"
              }`}
            >
              All Photos
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
                  className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                    activeCategory ===
                    category
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {category}
                </button>
              )
            )}

          </div>

        </div>        {/* GALLERY GRID */}
        {loading ? (

          <div className="flex items-center justify-center py-20">

            <div className="text-slate-500">
              {loadingMessage}
            </div>

          </div>

        ) : filteredGallery.length === 0 ? (

          <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-16 text-center">

            <Images
              size={50}
              className="mx-auto text-slate-300 mb-4"
            />

            <h3 className="text-xl font-semibold text-slate-800">
              No Photos Found
            </h3>

            <p className="text-slate-500 mt-2">
              Upload photos or select a different category.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {filteredGallery.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group overflow-hidden flex flex-col"
              >

                {/* IMAGE */}
                <div className="h-56 w-full relative overflow-hidden bg-slate-100">

                  <SmartImage
                    src={
                      item.file_url
                    }
                    alt={item.description}
                    width={800}
                    wrapperClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* CATEGORY BADGE */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-2 shadow-sm">

                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>

                    <span className="text-xs font-medium text-slate-700">
                      {item.event_name}
                    </span>

                  </div>

                </div>

                {/* CARD CONTENT */}
                <div className="p-4 flex-1 flex flex-col justify-between border-t border-slate-100">

                  {item.description.split("~~").length > 1 ?
                  <>
                  <h3 className="font-semibold text-slate-900 mb-2 line-clamp-1 bg-orange-500">
                    {item.description.split("~~")[0]}
                  </h3>
                  <h2 className="font-semibold text-slate-900 mb-2 line-clamp-1 bg-red-500">
                    {item.description.split("~~")[1]}
                  </h2>
                  </> :
                  <>
                  <h2 className="font-semibold text-slate-900 mb-2 line-clamp-1 bg-red-500">
                    {item.description}
                  </h2>
                  </>}

                  <div className="flex items-center justify-between mt-auto">

                    <span className="text-sm text-slate-500">
                      Gallery Image
                    </span>

                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">

                      <button
                        onClick={() =>
                          setDeleteModal({
                            open: true,
                            image: item,
                          })
                        }
                        className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}
      </div>
            {/* UPLOAD MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-start justify-between">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Upload New Photo
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Add a new memory to the school gallery
                </p>
              </div>

              <button
                onClick={resetForm}
                className="p-2 rounded-lg hover:bg-slate-100 transition"
              >
                <X size={18} />
              </button>

            </div>

            {/* BODY */}
            <div className="p-6">

              {/* IMAGE PREVIEW */}
              <label className="flex justify-center mb-5 cursor-pointer">

                <div className="w-32 h-32 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 overflow-hidden flex items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition">

                  {photoPreview ? (

                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <div className="text-center text-slate-400">

                      <Upload
                        size={26}
                        className="mx-auto mb-2"
                      />

                      <p className="text-xs font-medium">
                        Choose Image
                      </p>

                    </div>

                  )}

                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />

                </div>

              </label>

              <div className="space-y-5">

                {/* CATEGORY */}
                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Photo Category
                  </label>

                  <select
                    name="event_name"
                    value={
                      formData.event_name
                    }
                    defaultValue={activeCategory}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >

                    <option value="">
                      Select Category
                    </option>

                    <option value="Sports">
                      Sports
                    </option>

                    <option value="Cultural">
                      Cultural
                    </option>

                    <option value="Class Gallery">
                      Class Gallery
                    </option>

                    <option value="Achievers">
                      Achievers
                    </option>

                    <option value="Annual Function">
                      Annual Function
                    </option>

                    <option value="Student Life">
                      Student Life
                    </option>

                    <option value="Student Life Gallery">
                      Student Life Gallery
                    </option>

                  </select>

                </div>

                {/* DESCRIPTION */}
                <div>

                  {formData.event_name === "Student Life" ? (
                    <>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Name 
                      </label>

                      <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter student's name"
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        required
                      />

                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Position  
                      </label>

                      <select
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        required
                      >

                      <option value="">
                      Select Position
                      </option>

                      <option value="Head Boy">
                        Head Boy
                      </option>

                      <option value="Head Girl">
                        Head Girl
                      </option>

                      <option value="Cultural Captain">
                        Cultural Captain
                      </option>
                      </select>
                    </>
                  ) : (
                    <>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Description
                      </label>

                      <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter name"
                        className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        required
                      />
                    </>
                  )}

                </div>

              </div>

            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">

              <button
                onClick={resetForm}
                className="px-5 py-2.5 border border-slate-300 rounded-lg hover:bg-white transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
              >
                Upload Photo
              </button>

            </div>

          </div>

        </div>
      )}      {/* DELETE CONFIRMATION MODAL */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">

            <div className="p-6">

              <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">

                <Trash2
                  size={28}
                  className="text-red-600"
                />

              </div>

              <h3 className="text-xl font-bold text-center text-slate-900">
                Delete Image
              </h3>

              <p className="text-center text-slate-500 mt-2">
                Are you sure you want to delete this gallery image?
              </p>

              <p className="text-center font-semibold text-slate-800 mt-2">
                {deleteModal.image?.event_name}
              </p>

            </div>

            <div className="border-t border-slate-200 p-4 bg-slate-50 flex justify-end gap-3">

              <button
                onClick={() =>
                  setDeleteModal({
                    open: false,
                    image: null,
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

    </div>
  );
};

export default AdminGallery;