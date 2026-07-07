import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Upload,
  Trophy,
} from "lucide-react";
import SmartImage from "../components/SmartImages";
import { apiRequest } from "../utils/ApiCall";
import toast, { Toaster } from "react-hot-toast";

const badgeStyles = {
  "1st": "bg-yellow-400 text-black",
  "2nd": "bg-slate-300 text-black",
  "3rd": "bg-orange-400 text-black",
};

const CLASS_OPTIONS = [
  "10th",
  "12th",
];

const BRANCH_OPTIONS = [
  "Science",
  "Humanities",
];

const BOARD_OPTIONS = [
  "CBSE",
  "UP Board",
];

export default function Achievers() {
  const [achievers, setAchievers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  const [popup, setPopup] = useState(false);
  const [editing, setEditing] = useState(null);

  const [formData, setFormData] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    achiever: null,
  });

  const [loadingMessage, setLoadingMessage] = useState("");

  const [yearError, setYearError] = useState("");
  const [percentageError, setPercentageError] =
    useState("");

  const yearRegex = /^\d{4}-\d{2}$/;

  const validateYear = (year) => {
    if (!year) return false;

    if (!yearRegex.test(year)) {
      setYearError(
        "Format: YYYY-YY (e.g., 2025-26)"
      );
      return false;
    }

    setYearError("");
    return true;
  };

  const resetForm = () => {
    setPopup(false);
    setEditing(null);
    setFormData({});
    setPhotoPreview(null);
    setYearError("");
    setPercentageError("");
  };  /* -------------------------------- */
  /* LOAD ACHIEVERS                   */
  /* -------------------------------- */

  const loadAchievers = async () => {
    try {
      setLoading(true);
      setLoadingMessage("Loading achievers...");

      const res = await apiRequest(
        "GET",
        "/achievers/getAchievers"
      );

      if (res.message === "success") {
        setAchievers(res.achievers || []);
      }
    } catch {
      toast.error(
        "Failed to load achievers"
      );
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  useEffect(() => {
    loadAchievers();
  }, []);

  /* -------------------------------- */
  /* INPUT CHANGE                     */
  /* -------------------------------- */

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      files,
    } = e.target;

    if (type === "file") {
      const file = files[0];

      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      if (
        file &&
        file.type.startsWith("image/")
      ) {
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

    if (name === "year") {
      validateYear(value);
    }

    if (name === "percentage") {
      const num = Number(value);

      if (num < 0 || num > 100) {
        setPercentageError(
          "Percentage must be between 0 and 100"
        );
      } else {
        setPercentageError("");
      }
    }
  };

  /* -------------------------------- */
  /* SUBMIT                           */
  /* -------------------------------- */

  const submit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error(
        "Student name is required"
      );
      return;
    }

    if (!formData.class) {
      toast.error(
        "Please select class"
      );
      return;
    }

    if (!formData.year) {
      toast.error(
        "Academic session is required"
      );
      return;
    }

    if (
      !editing &&
      !formData.photo
    ) {
      toast.error(
        "Student photo is required"
      );
      return;
    }

    if (percentageError) {
      toast.error(
        "Please fix percentage field"
      );
      return;
    }

    try {
      setLocalLoading(true);

      setLoadingMessage(
        editing
          ? "Updating achiever..."
          : "Adding achiever..."
      );

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

      const endpoint = editing
        ? `/achievers/editAchiever/${editing.id}`
        : "/achievers/addAchiever";

      const method = editing
        ? "PUT"
        : "POST";

      const response =
        await apiRequest(
          method,
          endpoint,
          finalData
        );

      if(response.message !== "success") {
        throw new Error(
          response.error ||
            "Failed to save achiever"
        );
      }else{
        if (editing) {
        setAchievers((prev) =>
          prev.map((a) =>
            a.id === editing.id
              ? {
                  ...a,
                  ...response.achievers,
                }
              : a
          )
        );

        toast.success(
          "Achiever updated"
        );
      } else {
        setAchievers((prev) => [
          ...prev,
          response.achievers,
        ]);

        toast.success(
          "Achiever added"
        );
      }
      }

      resetForm();
    } catch {
      toast.error(
        "Something went wrong"
      );
    } finally {
      setLocalLoading(false);
      setLoadingMessage("");
    }
  };

  /* -------------------------------- */
  /* DELETE                           */
  /* -------------------------------- */

  const remove = async (id) => {
    try {
      setLocalLoading(true);

      setLoadingMessage(
        "Deleting achiever..."
      );

      await apiRequest(
        "DELETE",
        `/achievers/deleteAchiever/${id}`
      );

      setAchievers((prev) =>
        prev.filter(
          (a) => a.id !== id
        )
      );

      toast.success(
        "Deleted successfully"
      );
    } catch {
      toast.error(
        "Failed to delete achiever"
      );
    } finally {
      setLocalLoading(false);
      setLoadingMessage("");
    }
  };

  /* -------------------------------- */
  /* DELETE MODAL                     */
  /* -------------------------------- */

  const openDeleteModal = (
    achiever
  ) => {
    setDeleteModal({
      open: true,
      achiever,
    });
  };

  const closeDeleteModal =
    () => {
      setDeleteModal({
        open: false,
        achiever: null,
      });
    };

  const confirmDelete =
    () => {
      if (
        deleteModal.achiever
      ) {
        remove(
          deleteModal.achiever.id
        );
      }

      closeDeleteModal();
    };

  /* -------------------------------- */
  /* COMMON INPUT STYLE               */
  /* -------------------------------- */

  const inputCls =
    "w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <Toaster position="top-right" />      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Achievers
          </h1>

          <p className="text-slate-500 mt-1">
            Manage academic achievers
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setPopup(true);
          }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
        >
          <Plus size={18} />
          Add Achiever
        </button>

      </div>

      {/* ACHIEVERS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {achievers.map((a) => (

          <div
            key={a.id}
            className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col items-center relative transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
          >

            {/* ACTION BUTTONS */}
            <div className="absolute top-3 right-3 flex opacity-0 group-hover:opacity-100 transition-opacity">

              <button
                onClick={() => {
                  setEditing(a);
                  setFormData(a);

                  setPhotoPreview(
                    a.photo ||
                    a.photo_url ||
                    a.url
                  );

                  setPopup(true);
                }}
                className="p-2 text-slate-500 hover:text-blue-600"
              >
                <Edit size={16} />
              </button>

              <button
                onClick={() =>
                  openDeleteModal(a)
                }
                className="p-2 text-slate-500 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>

            </div>

            {/* PHOTO */}
            <div className="w-24 h-24 rounded-full p-1 border-2 border-blue-200 overflow-hidden mb-4">

              <SmartImage
                src={
                  a.photo ||
                  a.photo_url ||
                  a.url
                }
                alt={a.name}
                width={400}
                className="w-full h-full rounded-full object-cover"
              />

            </div>

            {/* NAME */}
            <h3 className="text-lg font-semibold text-slate-900 text-center">
              {a.name}
            </h3>

            {/* CLASS */}
            <p className="text-sm text-slate-500 text-center mb-4">

              Class {a.class}

              {a.branch
                ? ` • ${a.branch}`
                : ""}

            </p>

            {/* SCORE */}
            <div className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 flex flex-col items-center">

              <span className="text-xs text-slate-500">
                Academic Score
              </span>

              <span className="text-2xl font-bold text-blue-600">
                {a.percentage || 0}%
              </span>

            </div>

            {/* OPTIONAL BOARD */}
            {a.board && (
              <div className="mt-3 text-xs text-slate-500">
                {a.board}
              </div>
            )}

            {/* OPTIONAL YEAR */}
            {a.year && (
              <div className="mt-1 text-xs text-slate-400">
                Session {a.year}
              </div>
            )}

          </div>

        ))}

      </div>      {/* ADD / EDIT MODAL */}
      {popup && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editing
                    ? "Edit Academic Achiever"
                    : "Add Academic Achiever"}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Manage student achievement records
                </p>
              </div>

              <button
                onClick={resetForm}
                className="p-2 rounded-md hover:bg-slate-100"
              >
                <X size={18} />
              </button>

            </div>

            {/* BODY */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">

              <form
                id="achiever-form"
                onSubmit={submit}
                className="space-y-5"
              >

                {/* IMAGE PREVIEW */}
                <div className="flex justify-center">

                  <div className="w-36 h-36 rounded-md border-2 border-dashed border-slate-300 bg-slate-50 overflow-hidden flex items-center justify-center">

                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Preview"
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

                {/* IMAGE */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Upload Image
                  </label>

                  <label className="cursor-pointer block">

                    <div className="flex justify-center px-6 py-5 border-2 border-dashed border-slate-300 rounded-md hover:bg-slate-50 transition">

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
                      name="photo"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />

                  </label>
                </div>

                {/* NAME */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Student Name
                  </label>

                  <input
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    placeholder="Enter student name"
                    className={inputCls}
                  />
                </div>

                {/* CLASS + BRANCH */}
                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Class
                    </label>

                    <select
                      name="class"
                      value={formData.class || ""}
                      onChange={handleChange}
                      className={inputCls}
                    >
                      <option value="">
                        Select Class
                      </option>

                      {CLASS_OPTIONS.map(
                        (c) => (
                          <option
                            key={c}
                            value={c}
                          >
                            {c}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Branch
                    </label>

                    <select
                      name="branch"
                      value={formData.branch || ""}
                      onChange={handleChange}
                      className={inputCls}
                    >
                      <option value="">
                        Select Branch
                      </option>

                      {BRANCH_OPTIONS.map(
                        (b) => (
                          <option
                            key={b}
                            value={b}
                          >
                            {b}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                </div>

                {/* PERCENTAGE */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Percentage
                  </label>

                  <input
                    type="percentage"
                    name="percentage"
                    min="0"
                    max="100"
                    value={formData.percentage || ""}
                    onChange={handleChange}
                    placeholder="Enter percentage"
                    className={inputCls}
                  />

                  {percentageError && (
                    <p className="text-red-500 text-xs mt-1">
                      {percentageError}
                    </p>
                  )}
                </div>

                {/* BOARD + YEAR */}
                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Board
                    </label>

                    <select
                      name="board"
                      value={formData.board || ""}
                      onChange={handleChange}
                      className={inputCls}
                    >
                      <option value="">
                        Select Board
                      </option>

                      {BOARD_OPTIONS.map(
                        (b) => (
                          <option
                            key={b}
                            value={b}
                          >
                            {b}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Session
                    </label>

                    <input
                      name="year"
                      value={formData.year || ""}
                      onChange={handleChange}
                      placeholder="2025-26"
                      className={inputCls}
                    />

                    {yearError && (
                      <p className="text-red-500 text-xs mt-1">
                        {yearError}
                      </p>
                    )}
                  </div>

                </div>

                {/* RANK */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Rank
                  </label>

                  <select
                    name="rank"
                    value={formData.rank || ""}
                    onChange={handleChange}
                    className={inputCls}
                  >
                    <option value="">
                      Select Rank
                    </option>

                    <option value="1st">
                      1st
                    </option>

                    <option value="2nd">
                      2nd
                    </option>

                    <option value="3rd">
                      3rd
                    </option>
                  </select>
                </div>

              </form>

            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">

              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 border border-slate-300 rounded-md hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="achiever-form"
                className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editing
                  ? "Update Achiever"
                  : "Add Achiever"}
              </button>

            </div>

          </div>

        </div>
      )}      {/* DELETE MODAL */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm p-6">

            <div className="w-14 h-14 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
              <Trash2
                size={24}
                className="text-red-600"
              />
            </div>

            <h3 className="text-xl font-bold text-center text-slate-900">
              Delete Achiever
            </h3>

            <p className="text-center text-slate-500 mt-2">
              Are you sure you want to delete
            </p>

            <p className="text-center font-semibold text-slate-900 mt-1">
              {deleteModal.achiever?.name}
            </p>

            <div className="flex gap-3 mt-6">

              <button
                onClick={closeDeleteModal}
                className="flex-1 border border-slate-300 py-2.5 rounded-md hover:bg-slate-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-md transition"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

      {/* LOADER */}
      {(loading || localLoading) && (
        <div className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm flex items-center justify-center">

          <div className="bg-white rounded-lg shadow-xl px-8 py-6 flex flex-col items-center">

            <div className="relative">

              <div className="w-14 h-14 border-4 border-slate-200 rounded-full" />

              <div className="absolute inset-0 w-14 h-14 border-4 border-transparent border-t-blue-600 rounded-full animate-spin" />

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