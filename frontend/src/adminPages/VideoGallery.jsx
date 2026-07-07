import React, { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  X,
  Play,
  Upload,
  Video,
  RefreshCw,
} from "lucide-react";
import { apiRequest } from "../utils/ApiCall";
import toast, { Toaster } from "react-hot-toast";

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [confirmDelete, setConfirmDelete] =
    useState(null);

  const [uploadFile, setUploadFile] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [loadingMessage, setLoadingMessage] =
    useState("");

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setLoadingMessage(
        "Loading Videos..."
      );

      const data =
        await apiRequest(
          "GET",
          "/videos/getVideos"
        );

      setVideos(
        data.videos || []
      );
    } catch {
      toast.error(
        "Failed to load videos"
      );
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleFileSelect = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    if (
      !file.type.startsWith(
        "video/"
      )
    ) {
      toast.error(
        "Only video files allowed"
      );
      return;
    }

    setUploadFile(file);
  };

  const resetForm = () => {
    setUploadFile(null);

    setFormData({
      name: "",
    });

    setModalOpen(false);
  };

  const handleUpload = async () => {
    if (!uploadFile) {
      return toast.error(
        "Please select a video"
      );
    }

    if (!formData.name) {
      return toast.error(
        "Please enter a title"
      );
    }

    if (videos.length >= 5) {
      return toast.error(
        "Maximum 5 videos allowed"
      );
    }

    try {
      setLoading(true);
      setLoadingMessage(
        "Uploading Video..."
      );

      const form =
        new FormData();

      form.append(
        "video",
        uploadFile
      );

      form.append(
        "title",
        formData.name
      );

      const res =
        await apiRequest(
          "POST",
          "/videos/addVideo",
          form
        );

      setVideos((prev) => [
        ...prev,
        res.video,
      ]);

      toast.success(
        "Video uploaded successfully"
      );

      resetForm();
    } catch {
      toast.error(
        "Upload failed"
      );
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  const handleDelete =
    async () => {
      if (!confirmDelete)
        return;

      try {
        setLoading(true);

        setLoadingMessage(
          "Deleting Video..."
        );

        const res =
          await apiRequest(
            "DELETE",
            `/videos/deleteVideo/${confirmDelete.id}`
          );

        if (
          res.message ===
          "success"
        ) {
          setVideos((prev) =>
            prev.filter(
              (v) =>
                v.id !==
                confirmDelete.id
            )
          );

          toast.success(
            "Video deleted"
          );
        }
      } catch {
        toast.error(
          "Failed to delete"
        );
      } finally {
        setConfirmDelete(
          null
        );

        setLoading(false);

        setLoadingMessage("");
      }
    };  return (
    <div className="min-h-screen bg-slate-50 p-8">

      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-end mb-8">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">

              <Video
                size={28}
                className="text-white"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold text-slate-900">
                Video Gallery
              </h1>

              <p className="text-slate-500 mt-1">
                Manage and upload school event videos
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="hidden md:flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm">

              <div className="pr-4 border-r border-slate-200">

                <span className="block text-xs uppercase text-slate-500 font-semibold">
                  Total Videos
                </span>

                <span className="block text-xl font-bold text-blue-600">
                  {videos.length}
                </span>

              </div>

              <div className="pl-4">

                <span className="text-green-600 font-medium text-sm">
                  Active
                </span>

              </div>

            </div>

            <button
              onClick={fetchVideos}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg bg-white hover:bg-slate-100 transition"
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
              Upload Video
            </button>

          </div>

        </div>

        {videos.length >= 5 && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            Maximum 5 videos allowed.
          </div>
        )}

        {/* VIDEO GRID */}
        {videos.length === 0 && !loading ? (

          <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-16 text-center">

            <Play
              size={50}
              className="mx-auto text-slate-300 mb-4"
            />

            <h3 className="text-xl font-semibold text-slate-800">
              No Videos Found
            </h3>

            <p className="text-slate-500 mt-2">
              Upload videos to get started.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {videos.map((item) => (              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition"
              >

                {/* VIDEO */}
                <div className="relative">

                  <video
                    src={item.video_url}
                    controls
                    className="w-full h-56 object-cover bg-black"
                  />

                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm border border-slate-200">

                    <span className="text-xs font-medium text-slate-700">
                      Video
                    </span>

                  </div>

                </div>

                {/* CONTENT */}
                <div className="p-4">

                  <h3 className="font-semibold text-slate-900 truncate">
                    {item.title || "Untitled Video"}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    School Event Video
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">

                    <span className="text-xs text-slate-400">
                      Video Gallery
                    </span>

                    <button
                      onClick={() =>
                        setConfirmDelete(item)
                      }
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

        )}

      </div>      {/* UPLOAD MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Upload Video
                </h2>

                <p className="text-sm text-slate-500">
                  Add a new video to the gallery
                </p>
              </div>

              <button
                onClick={resetForm}
                className="p-2 rounded-md hover:bg-slate-100 transition"
              >
                <X size={18} />
              </button>

            </div>

            {/* BODY */}
            <div className="p-5">

              <div className="space-y-4">

                {/* VIDEO PICKER */}
                <label className="flex justify-center cursor-pointer">

                  <div className="w-32 h-32 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 overflow-hidden flex items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition">

                    {uploadFile ? (

                      <div className="text-center px-2">

                        <Video
                          size={32}
                          className="mx-auto text-blue-600 mb-2"
                        />

                        <p className="text-xs font-medium text-slate-700 break-words">
                          {uploadFile.name}
                        </p>

                      </div>

                    ) : (

                      <div className="text-center text-slate-400">

                        <Upload
                          size={26}
                          className="mx-auto mb-2"
                        />

                        <p className="text-xs font-medium">
                          Choose Video
                        </p>

                      </div>

                    )}

                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />

                  </div>

                </label>

                {/* VIDEO TITLE */}
                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Video Title
                  </label>

                  <input
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter video title"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />

                </div>

              </div>

            </div>

            {/* FOOTER */}
            <div className="px-5 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">

              <button
                onClick={resetForm}
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-white transition"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50"
              >
                {loading
                  ? "Uploading..."
                  : "Upload"}
              </button>

            </div>

          </div>

        </div>
      )}      {/* DELETE CONFIRMATION MODAL */}
      {confirmDelete && (
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
                Delete Video
              </h3>

              <p className="text-center text-slate-500 mt-2">
                Are you sure you want to delete this video?
              </p>

              <p className="text-center font-semibold text-slate-800 mt-2 break-words">
                {confirmDelete?.title || "Video"}
              </p>

            </div>

            <div className="border-t border-slate-200 p-4 bg-slate-50 flex justify-end gap-3">

              <button
                onClick={() =>
                  setConfirmDelete(null)
                }
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-white transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
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
}