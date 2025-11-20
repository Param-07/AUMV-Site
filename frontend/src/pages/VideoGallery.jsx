import React, { useEffect, useState } from "react";
import { Plus, Trash2, X, Video, Upload } from "lucide-react";
import { apiRequest } from "../utils/ApiCall";
import toast, { Toaster } from "react-hot-toast";

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async () => {
    try {
      const data = await apiRequest("GET", "/getVideos");
      setVideos(data.videos || []);
    } catch (err) {
      toast.error("Failed to load videos");
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Only video files are allowed");
      return;
    }

    setUploadFile(file);
  };

  const handleUpload = async () => {
    if (!uploadFile) {
      toast.error("Please select a video");
      return;
    }

    if (videos.length >= 5) {
      toast.error("You can only upload 5 videos");
      return;
    }

    try {
      setLoading(true);

      const form = new FormData();
      form.append("video", uploadFile);

      const res = await apiRequest("POST", "/addVideo", form);
      setVideos((prev) => [...prev, res.video]);

      toast.success("Video uploaded");

      setUploadFile(null);
      setModalOpen(false);
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await apiRequest("DELETE", `/deleteVideo/${id}`);
      if (res.message === "Deleted") {
        setVideos((prev) => prev.filter((v) => v.id !== id));
        toast.success("Deleted");
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster position="top-right" />

      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Video Gallery</h1>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-xl"
          >
            <Plus size={18} /> Upload Video
          </button>
        </div>

        {videos.length >= 5 && (
          <p className="text-red-600 font-medium mb-3">
            Limit reached: Maximum 5 videos allowed
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-3"
            >
              <video
                src={item.video_url}
                controls
                className="w-full h-48 rounded-lg object-cover"
              />

              <div className="flex justify-between mt-3">
                <p className="text-sm text-gray-600 truncate">{item.title || "Video"}</p>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md p-6 rounded-xl relative animate-scaleIn shadow-xl">
            <button
              onClick={() => {
                setModalOpen(false);
                setUploadFile(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Upload Video</h2>

            <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200">
              <Upload size={20} />
              <span>{uploadFile ? uploadFile.name : "Choose a video file"}</span>
              <input
                type="file"
                className="hidden"
                accept="video/*"
                onChange={handleFileSelect}
              />
            </label>

            <button
              disabled={loading}
              onClick={handleUpload}
              className="mt-5 w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 disabled:bg-gray-400"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
