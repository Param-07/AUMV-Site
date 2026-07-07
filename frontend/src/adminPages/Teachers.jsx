import React, { useEffect, useMemo, useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Edit,
  Trash2,
  X,
  Upload,
  Save,
} from "lucide-react";
import SmartImage from "../components/SmartImages";
import { apiRequest } from "../utils/ApiCall";
import toast, { Toaster } from "react-hot-toast";

const SUBJECT_OPTIONS = [
  "Hindi",
  "English",
  "Science",
  "Math",
  "G.K",
  "Social Science",
  "Art",
];

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const [search, setSearch] = useState("");

  const [popup, setPopup] = useState(false);
  const [editing, setEditing] = useState(null);

  const [photoPreview, setPhotoPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    joining_date: "",
    phone_num: "",
    address: "",
    dob: "",
    photo: null,
    resume: null,
  });

  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    teacher: null,
  });

  const [error, setError] = useState(null);

  /* -------------------------------- */
  /* FETCH TEACHERS                   */
  /* -------------------------------- */

  const loadTeachers = async () => {
    try {
      setLoading(true);
      setLoadingMessage("Loading teachers...");

      const response = await apiRequest(
        "GET",
        "/teachers/"
      );

      const teachersData = response.teachers || [];

      setTeachers(teachersData);
    } catch (error) {
      setError({
        type: "error",
        title: "Loading Error",
        message:
          error?.response?.data?.message ||
          "Failed to load teachers.",
      });
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  /* -------------------------------- */
  /* SEARCH                           */
  /* -------------------------------- */

  const filteredTeachers = useMemo(() => {
    if (!search.trim()) return teachers;

    const q = search.toLowerCase();

    return teachers.filter(
      (teacher) =>
        teacher.name?.toLowerCase().includes(q) ||
        teacher.subject?.toLowerCase().includes(q) ||
        teacher.email?.toLowerCase().includes(q)
    );
  }, [teachers, search]);

  /* -------------------------------- */
  /* FORM HELPERS                     */
  /* -------------------------------- */

  const resetForm = () => {
    setPopup(false);
    setEditing(null);

    setFormData({
      name: "",
      email: "",
      subject: "",
      joining_date: "",
      phone_num: "",
      address: "",
      dob: "",
      photo: null,
      resume: null,
    });

    setPhotoPreview(null);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];

      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      if (name === "photo" && file) {
        setPhotoPreview(
          URL.createObjectURL(file)
        );
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const openEditModal = (teacher) => {
    setEditing(teacher);

    setFormData({
      ...teacher,
    });

    setPhotoPreview(teacher.url);

    setPopup(true);
  };

  const openDeleteModal = (teacher) => {
    setDeleteModal({
      open: true,
      teacher,
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      open: false,
      teacher: null,
    });
  };  /* -------------------------------- */
  /* ADD / EDIT TEACHER               */
  /* -------------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (
        value !== null &&
        value !== undefined &&
        value !== ""
      ) {
        finalData.append(key, value);
      }
    });

    try {
      setLoading(true);

      if (editing) {
        setLoadingMessage("Updating teacher...");

        const response = await apiRequest(
          "PUT",
          `/teachers/edit/${editing.id}`,
          finalData
        );

        const updatedTeacher =
          response.teacher || {
            ...editing,
            ...formData,
          };

        setTeachers((prev) =>
          prev.map((teacher) =>
            teacher.id === editing.id
              ? updatedTeacher
              : teacher
          )
        );

        if (
          selectedTeacher?.id === editing.id
        ) {
          setSelectedTeacher(
            updatedTeacher
          );
        }

        toast.success(
          "Teacher updated successfully"
        );
      } else {
        setLoadingMessage(
          "Adding teacher..."
        );

        const response = await apiRequest(
          "POST",
          "/teachers/addTeacher",
          finalData
        );

        const newTeacher =
          response.teacher;

        setTeachers((prev) => [
          newTeacher,
          ...prev,
        ]);

        setSelectedTeacher(
          newTeacher
        );

        toast.success(
          "Teacher added successfully"
        );
      }

      resetForm();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Operation failed"
      );
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  /* -------------------------------- */
  /* DELETE TEACHER                   */
  /* -------------------------------- */

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      setLoadingMessage(
        "Deleting teacher..."
      );

      const response = await apiRequest(
        "DELETE",
        `/teachers/delete/${id}`
      );

      if (
        response.message === "deleted"
      ) {
        const remainingTeachers =
          teachers.filter(
            (teacher) =>
              teacher.id !== id
          );

        setTeachers(
          remainingTeachers
        );

        if (
          selectedTeacher?.id === id
        ) {
          setSelectedTeacher(
            remainingTeachers[0] ||
              null
          );
        }

        toast.success(
          "Teacher deleted"
        );
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Delete failed"
      );
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  const confirmDelete =
    async () => {
      if (
        !deleteModal.teacher
      )
        return;

      await handleDelete(
        deleteModal.teacher.id
      );

      closeDeleteModal();
    };

  /* -------------------------------- */
  /* SELECT TEACHER                   */
  /* -------------------------------- */

  const selectTeacher = (
    teacher
  ) => {
    setSelectedTeacher(teacher);
  };

  /* -------------------------------- */
  /* OPEN ADD MODAL                   */
  /* -------------------------------- */

  const openAddModal = () => {
    resetForm();
    setPopup(true);
  };

  /* -------------------------------- */
  /* STATS                            */
  /* -------------------------------- */

  const totalTeachers =
    teachers.length;

  const totalSubjects =
    new Set(
      teachers.map(
        (teacher) =>
          teacher.subject
      )
    ).size;

  const latestTeacher =
    teachers.length > 0
      ? teachers[0]
      : null;  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-right" />

      <div className="p-8">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm mb-8">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-md">
              <Users
                size={32}
                className="text-white"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Teachers Management
              </h1>

              <p className="text-slate-500 mt-1">
                Manage your college teaching staff
              </p>
            </div>

          </div>

          <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md transition"
          >
            <UserPlus size={18} />
            Add Teacher
          </button>

        </div>

        {/* SEARCH */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mb-8">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by teacher name, subject or email..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />

          </div>

        </div>

        {/* MAIN SECTION */}
        {!search.trim() && selectedTeacher && (<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* LEFT PANEL */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-xl font-bold text-slate-900">
                Teacher Details
              </h2>

              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">

                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>

                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  Live
                </span>

              </div>

            </div>

            {selectedTeacher ? (

              <div className="space-y-5">

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Full Name
                  </label>

                  <input
                    readOnly
                    value={selectedTeacher.name || ""}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Email
                  </label>

                  <input
                    readOnly
                    value={selectedTeacher.email || ""}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Subject
                  </label>

                  <input
                    readOnly
                    value={selectedTeacher.subject || ""}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                      Phone
                    </label>

                    <input
                      readOnly
                      value={selectedTeacher.phone_num || ""}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                      DOB
                    </label>

                    <input
                      readOnly
                      value={selectedTeacher.dob || ""}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50"
                    />
                  </div>

                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Joining Date
                  </label>

                  <input
                    readOnly
                    value={selectedTeacher.joining_date || ""}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Address
                  </label>

                  <textarea
                    readOnly
                    rows={3}
                    value={selectedTeacher.address || ""}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 resize-none"
                  />
                </div>

              </div>

            ) : (

              <div className="py-16 text-center text-slate-400">
                No teacher selected
              </div>

            )}

          </div>          {/* RIGHT PANEL */}
          <div className="xl:col-span-2 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">

            {selectedTeacher ? (
              <div className="relative h-full">

                {/* Top Background */}
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-700" />

                <div className="relative z-10 flex flex-col items-center text-center p-8 pt-16">

                  {/* PROFILE IMAGE */}
                  <div className="relative mb-6">

                    <div className="w-40 h-40 rounded-full overflow-hidden border-[6px] border-white shadow-xl bg-slate-100">

                      {selectedTeacher.photo ? (
                        <SmartImage
                          src={selectedTeacher.photo}
                          alt={selectedTeacher.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-200">
                          <Users
                            size={48}
                            className="text-slate-400"
                          />
                        </div>
                      )}

                    </div>

                    <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-green-500 border-4 border-white flex items-center justify-center shadow-lg">

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                    </div>

                  </div>

                  {/* NAME */}
                  <h2 className="text-4xl font-bold text-slate-900">
                    {selectedTeacher.name}
                  </h2>

                  {/* SUBJECT */}
                  <div className="flex items-center gap-3 mt-4">

                    <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                      {selectedTeacher.subject}
                    </span>

                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />

                    <span className="text-slate-500">
                      Faculty Member
                    </span>

                  </div>

                  {/* INFO GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl mt-10">

                    <div className="bg-slate-50 rounded-2xl p-5 text-left">
                      <p className="text-xs uppercase font-semibold text-slate-500 mb-2">
                        Email Address
                      </p>

                      <p className="font-medium text-slate-900 break-all">
                        {selectedTeacher.email}
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-5 text-left">
                      <p className="text-xs uppercase font-semibold text-slate-500 mb-2">
                        Phone Number
                      </p>

                      <p className="font-medium text-slate-900">
                        {selectedTeacher.phone_num}
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-5 text-left">
                      <p className="text-xs uppercase font-semibold text-slate-500 mb-2">
                        Date of Birth
                      </p>

                      <p className="font-medium text-slate-900">
                        {selectedTeacher.dob}
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-5 text-left">
                      <p className="text-xs uppercase font-semibold text-slate-500 mb-2">
                        Joining Date
                      </p>

                      <p className="font-medium text-slate-900">
                        {selectedTeacher.joining_date}
                      </p>
                    </div>

                  </div>

                  {/* ADDRESS */}
                  <div className="w-full max-w-4xl mt-5">

                    <div className="bg-slate-50 rounded-2xl p-5 text-left">

                      <p className="text-xs uppercase font-semibold text-slate-500 mb-2">
                        Address
                      </p>

                      <p className="text-slate-700 leading-relaxed">
                        {selectedTeacher.address}
                      </p>

                    </div>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-wrap items-center justify-center gap-4 mt-10">

                    <button
                      onClick={() =>
                        openEditModal(selectedTeacher)
                      }
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md flex items-center gap-2 transition"
                    >
                      <Edit size={18} />
                      Edit Teacher
                    </button>

                    <button
                      onClick={() =>
                        openDeleteModal(selectedTeacher)
                      }
                      className="px-8 py-3 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-xl font-semibold border border-red-200 transition flex items-center gap-2"
                    >
                      <Trash2 size={18} />
                      Delete Teacher
                    </button>

                  </div>

                </div>

              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 text-lg">
                Select a teacher to view profile
              </div>
            )}

          </div>

        </div>)}        {/* TEACHERS GRID */}
        <div className="mt-10">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Faculty Members
              </h2>

              <p className="text-slate-500 mt-1">
                {filteredTeachers.length} Teachers Found
              </p>
            </div>

            <div className="flex gap-3">

              <div className="bg-white border border-slate-200 rounded-xl px-4 py-2">
                <span className="text-sm text-slate-500">
                  Subjects:
                </span>

                <span className="font-semibold text-slate-900 ml-2">
                  {totalSubjects}
                </span>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl px-4 py-2">
                <span className="text-sm text-slate-500">
                  Teachers:
                </span>

                <span className="font-semibold text-slate-900 ml-2">
                  {totalTeachers}
                </span>
              </div>

            </div>

          </div>

          {filteredTeachers.length === 0 ? (

            <div className="bg-white border border-slate-200 rounded-3xl p-20 text-center shadow-sm">

              <Users
                size={50}
                className="mx-auto text-slate-300 mb-4"
              />

              <h3 className="text-2xl font-bold text-slate-900">
                No Teachers Found
              </h3>

              <p className="text-slate-500 mt-2">
                Try changing your search or add a new teacher.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

              {filteredTeachers.map((teacher) => (

                <div
                  key={teacher.id}
                  onClick={() => selectTeacher(teacher)}
                  className={`bg-white rounded-3xl border cursor-pointer overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                    selectedTeacher?.id === teacher.id
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-slate-200"
                  }`}
                >

                  {/* IMAGE */}
                  <div className="h-52 bg-slate-100 overflow-hidden">

                    {teacher.photo ? (
                      <SmartImage
                        src={teacher.photo}
                        alt={teacher.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users
                          size={40}
                          className="text-slate-400"
                        />
                      </div>
                    )}

                  </div>

                  {/* CONTENT */}
                  <div className="p-5">

                    <h3 className="font-bold text-lg text-slate-900 line-clamp-1">
                      {teacher.name}
                    </h3>

                    <p className="text-blue-600 font-medium mt-1">
                      {teacher.subject}
                    </p>

                    <p className="text-sm text-slate-500 mt-3 line-clamp-1">
                      {teacher.email}
                    </p>

                    <div className="flex gap-2 mt-5">

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(teacher);
                        }}
                        className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition flex items-center justify-center gap-2"
                      >
                        <Edit size={15} />
                        Edit
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(teacher);
                        }}
                        className="flex-1 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition flex items-center justify-center gap-2"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

              {/* ADD CARD */}

              <div
                onClick={openAddModal}
                className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-3xl min-h-[340px] flex flex-col items-center justify-center cursor-pointer hover:bg-slate-200 transition-all"
              >

                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-4">

                  <UserPlus
                    size={30}
                    className="text-blue-600"
                  />

                </div>

                <h3 className="font-bold text-xl text-slate-900">
                  Add Teacher
                </h3>

                <p className="text-slate-500 text-center mt-2 px-6">
                  Create a new faculty record
                </p>

              </div>

            </div>

          )}

        </div>

      </div>      {/* ADD / EDIT MODAL */}
      {popup && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

            {/* HEADER */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {editing
                    ? "Edit Teacher"
                    : "Add New Teacher"}
                </h2>

                <p className="text-slate-500 mt-1">
                  Fill in the details below
                </p>
              </div>

              <button
                onClick={resetForm}
                className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center"
              >
                <X size={20} />
              </button>

            </div>

            {/* BODY */}
            <div className="p-6 overflow-y-auto flex-1">

              <form
                id="teacher-form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* PHOTO */}
                <div className="flex justify-center">

                  <label className="cursor-pointer">

                    <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 overflow-hidden flex flex-col items-center justify-center hover:bg-blue-100 transition">

                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <>
                          <Upload
                            size={28}
                            className="text-blue-600 mb-2"
                          />

                          <span className="text-sm font-medium text-blue-600">
                            Upload Photo
                          </span>
                        </>
                      )}

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

                {/* FORM GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name || ""}
                      onChange={handleChange}
                      placeholder="Enter teacher name"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email *
                    </label>

                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email || ""}
                      onChange={handleChange}
                      placeholder="Enter email"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Subject *
                    </label>

                    <select
                      name="subject"
                      required
                      value={formData.subject || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="">
                        Select Subject
                      </option>

                      {SUBJECT_OPTIONS.map(
                        (subject) => (
                          <option
                            key={subject}
                            value={subject}
                          >
                            {subject}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Joining Date *
                    </label>

                    <input
                      type="date"
                      name="joining_date"
                      required
                      value={
                        formData.joining_date || ""
                      }
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number *
                    </label>

                    <input
                      type="text"
                      name="phone_num"
                      required
                      value={formData.phone_num || ""}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Date of Birth *
                    </label>

                    <input
                      type="date"
                      name="dob"
                      required
                      value={formData.dob || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                </div>

                {/* ADDRESS */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Address *
                  </label>

                  <textarea
                    name="address"
                    required
                    rows={3}
                    value={formData.address || ""}
                    onChange={handleChange}
                    placeholder="Enter teacher address"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* RESUME */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Upload Resume
                  </label>

                  <input
                    type="file"
                    name="resume"
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-xl p-3"
                  />
                </div>

              </form>

            </div>

            {/* FOOTER */}
            <div className="border-t border-slate-200 p-6 flex justify-end gap-3">

              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 border border-slate-300 rounded-xl font-medium hover:bg-slate-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="teacher-form"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md transition"
              >
                {editing
                  ? "Update Teacher"
                  : "Add Teacher"}
              </button>

            </div>

          </div>

        </div>
      )}      {/* DELETE MODAL */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">

            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-5">
              <Trash2
                size={28}
                className="text-red-600"
              />
            </div>

            <h3 className="text-2xl font-bold text-center text-slate-900">
              Delete Teacher
            </h3>

            <p className="text-center text-slate-500 mt-3">
              Are you sure you want to delete
            </p>

            <p className="text-center font-semibold text-slate-900 mt-1">
              {deleteModal.teacher?.name}
            </p>

            <div className="flex gap-3 mt-8">

              <button
                onClick={closeDeleteModal}
                className="flex-1 border border-slate-300 py-3 rounded-xl font-medium hover:bg-slate-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

      {/* LOADER */}
      {loading && (
        <div className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-center justify-center">

          <div className="bg-white rounded-3xl shadow-2xl px-10 py-8 flex flex-col items-center">

            <div className="relative">

              <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>

              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>

            </div>

            <p className="mt-5 font-semibold text-slate-700">
              {loadingMessage || "Please wait..."}
            </p>

          </div>

        </div>
      )}

    </div>
  );
}