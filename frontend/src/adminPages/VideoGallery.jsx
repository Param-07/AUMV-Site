import React, { useEffect, useState } from "react";
import { Plus, Trash2, X, Play, Upload, Video } from "lucide-react";
import { apiRequest } from "../utils/ApiCall";
import toast, { Toaster } from "react-hot-toast";

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setLoadingMessage("Loading Videos...");

      const data = await apiRequest("GET", "/videos/getVideos");
      setVideos(data.videos || []);
    } catch {
      toast.error("Failed to load videos");
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) return toast.error("Only video files allowed");
    setUploadFile(file);
  };

  const handleUpload = async () => {
    if (!uploadFile) return toast.error("Select a video first");
    if (videos.length >= 5) return toast.error("You can upload max 5 videos");

    try {
      setLoading(true);
      setLoadingMessage("Uploading Video...");

      const form = new FormData();
      form.append("video", uploadFile);

      const res = await apiRequest("POST", "/videos/addVideo", form);
      setVideos((prev) => [...prev, res.video]);

      toast.success("Video uploaded");
      setUploadFile(null);
      setModalOpen(false);
    } catch {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      setLoading(true);
      setLoadingMessage("Deleting Video...");

      const res = await apiRequest("DELETE", `/videos/deleteVideo/${confirmDelete.id}`);
      if (res.message === "success") {
        setVideos((prev) => prev.filter((v) => v.id !== confirmDelete.id));
        toast.success("Video deleted");
      }
    } catch {
      toast.error("Failed to delete");
    } finally {
      setConfirmDelete(null);
      setLoading(false);
      setLoadingMessage("");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto">
        {/* ---- HEADER ---- */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-700 shadow-lg">
              <Video size={24} className="text-slate-950" />
              <div className="absolute -inset-0.5 rounded-2xl bg-cyan-400/50 blur-lg opacity-60 pointer-events-none" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Video Gallery</h1>
              <p className="text-sm text-slate-400">
                Manage and upload school event videos
              </p>
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="relative flex items-center gap-2 bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-700 text-slate-950 px-5 py-2.5 rounded-full font-semibold shadow-[0_15px_40px_rgba(0,0,0,0.9)] hover:shadow-[0_20px_55px_rgba(0,0,0,1)] active:scale-95 transition"
          >
            <Plus size={18} />
            Upload Video
            <span className="absolute -inset-0.5 rounded-full bg-cyan-400/40 blur opacity-70 pointer-events-none" />
          </button>
        </div>

        {videos.length >= 5 && (
          <p className="text-red-400 font-medium mb-4">
            Limit reached — Maximum 5 videos allowed
          </p>
        )}

        {/* ---- GRID DISPLAY ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-white/5 backdrop-blur-xl border border-cyan-400/10 shadow-[0_18px_45px_rgba(0,0,0,0.65)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.75)] transition overflow-hidden"
            >
              <video
                src={item.video_url}
                controls
                className="w-full h-52 object-cover bg-black"
              />

              <div className="flex justify-between items-center p-4">
                <p className="text-sm text-slate-300 truncate">{item.title || "Video"}</p>

                <button
                  onClick={() => setConfirmDelete(item)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition shadow-md active:scale-95"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {!loading && videos.length === 0 && (
            <div className="col-span-full text-center py-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-cyan-400/20 text-slate-300 shadow-inner">
              <Play size={35} className="mx-auto opacity-50 mb-3" />
              No videos uploaded yet
            </div>
          )}
        </div>
      </div>

      {/* ---- UPLOAD MODAL ---- */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xl z-50 flex items-center justify-center animate-fadeIn">
          <div className="w-[92%] max-w-md rounded-3xl bg-white/5 backdrop-blur-xl p-7 border border-cyan-400/10 shadow-[0_15px_45px_rgba(0,0,0,0.8)] relative animate-scaleIn">
            <button
              onClick={() => {
                setModalOpen(false);
                setUploadFile(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 border border-slate-700 text-slate-100 hover:bg-white/20 transition"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-5 tracking-tight text-slate-50">
              Upload Video
            </h2>

            <label className="flex items-center gap-3 bg-slate-950/40 border border-slate-700/60 text-slate-300 px-4 py-3 rounded-2xl cursor-pointer hover:bg-slate-900/60 transition">
              <Upload size={20} />
              <span className="truncate">
                {uploadFile ? uploadFile.name : "Choose a video file"}
              </span>
              <input type="file" className="hidden" accept="video/*" onChange={handleFileSelect} />
            </label>

            <button
              disabled={loading}
              onClick={handleUpload}
              className="mt-6 w-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-700 text-slate-950 py-2.5 rounded-xl font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.9)] hover:shadow-[0_15px_45px_rgba(0,0,0,1)] disabled:bg-slate-600 active:scale-95 transition"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      )}

      {/* ---- DELETE CONFIRM MODAL ---- */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xl z-50 flex items-center justify-center animate-fadeIn">
          <div className="w-[92%] max-w-sm rounded-3xl bg-white/5 backdrop-blur-xl p-6 border border-cyan-400/10 shadow-[0_15px_45px_rgba(0,0,0,0.8)] animate-scaleIn">
            <h3 className="text-lg font-semibold tracking-tight text-slate-50">
              Remove Video
            </h3>
            <p className="text-sm text-slate-300 mt-2">
              Are you sure you want to delete this video?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 rounded-lg bg-slate-950/50 border border-slate-700 text-slate-100 hover:bg-slate-900/80 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
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
