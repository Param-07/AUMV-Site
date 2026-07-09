import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  RefreshCcw,
  Users,
  GraduationCap,
  CalendarDays,
  Eye,
  CheckCircle2,
  Trash2,
  Phone,
  User,
  Bell,
} from "lucide-react";
import { apiRequest } from "../utils/ApiCall";
import toast from "react-hot-toast";

const Dashboard = () => {
  const username = localStorage.getItem("username") || "Admin";

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [activeTab, setActiveTab] = useState("visits");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [admissions, setAdmissions] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [visits, setVisits] = useState([]);

  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [selectedVisit, setSelectedVisit] = useState(null);

  const [showAdmissionModal, setShowAdmissionModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showVisitModal, setShowVisitModal] = useState(false);

  const InfoRow = ({ label, value }) => (
  <div>
    <p className="text-sm text-slate-500">{label}</p>
    <p className="font-semibold text-slate-800 mt-1">
      {value || "-"}
    </p>
  </div>
);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [
        admissionRes,
        inquiryRes,
        visitRes,
      ] = await Promise.all([
        apiRequest("GET", "/formData/applications"),
        apiRequest("GET", "/formData/inquiryData"),
        apiRequest("GET", "/formData/campusVisit"),
      ]);

      setAdmissions(admissionRes?.data || []);
      setInquiries(inquiryRes?.data || []);
      setVisits(visitRes?.data || []);
      console.log(visitRes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const refreshDashboard = () => {
    setRefreshing(true);
    loadDashboard();
  };

  const dashboardStats = useMemo(() => {
    const completedAdmissions = admissions.filter(
      (x) => x.isCompleted
    ).length;

    const completedVisits = visits.filter(
      (x) => x.isCompleted
    ).length;

    const completedInquiries = inquiries.filter(
      (x) => x.isCompleted
    ).length;

    return [
      {
        title: "Total Admissions",
        value: admissions.length,
        completed: completedAdmissions,
        pending: admissions.length - completedAdmissions,
        icon: GraduationCap,
        color: "from-blue-600 to-indigo-600",
      },
      {
        title: "Campus Visits",
        value: visits.length,
        completed: completedVisits,
        pending: visits.length - completedVisits,
        icon: CalendarDays,
        color: "from-emerald-600 to-green-600",
      },
      {
        title: "Admission Inquiries",
        value: inquiries.length,
        completed: completedInquiries,
        pending: inquiries.length - completedInquiries,
        icon: Bell,
        color: "from-violet-600 to-fuchsia-600",
      },
    ];
  }, [admissions, inquiries, visits]);

  const filterData = (list) => {
    return list.filter((item) => {
      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "completed"
          ? item.isCompleted
          : !item.isCompleted;

      const q = search.toLowerCase();

      const matchesSearch = Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(q);

      return matchesStatus && matchesSearch;
    });
  };

  const filteredAdmissions = filterData(admissions);
  const filteredVisits = filterData(visits);
  const filteredInquiries = filterData(inquiries);  
  

  const handleDelete = async (id, formName) =>{

    try{
      const response = await apiRequest("DELETE", `/delete/${id}/${formName}`)

      if(response.message)
      {
        if(formName === "applications")
        {
          setAdmissions((prev) =>
          prev.filter(
            (x) => x.id !== id
          ));
        }
        else if (formName === "inquiryData")
        {
          setInquiries((prev) =>
          prev.filter(
            (x) => x.id !== id
          ));
        }
        else{
          setVisits((prev) =>
          prev.filter(
            (x) => x.id !== id
          ));
        }
        toast.success("Deleted");
      }
    }
    catch(error)
    {
      toast.error(error);
    }
  };

  const markCompleted = async(id, formName) => {

    try {
  const response = await apiRequest("PUT", `/edit/${id}/${formName}`);

  if (response.message) {
    if (formName === "applications") {
      setAdmissions((prev) =>
        prev.map((x) =>
          x.id === id ? { ...x, isCompleted: true } : x
        )
      );
        } else if (formName === "inquiryData") {
          setInquiries((prev) =>
            prev.map((x) =>
              x.id === id ? { ...x, isCompleted: true } : x
            )
          );
        } else {
          setVisits((prev) =>
            prev.map((x) =>
              x.id === id ? { ...x, isCompleted: true } : x
            )
          );
        }
      }
    }
    catch(error)
    {
      toast.error(error);
    }
  }

  return (
    <div className="flex-1 min-h-screen bg-slate-50 p-6">

      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Admissions Dashboard
          </h1>

          <p className="text-slate-500 mt-1">
            Manage Admissions, Campus Visits & Admission Inquiries
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">

          {/* Search */}

          <div className="relative w-full md:w-96">

            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search admissions, visitors or inquiries..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          {/* Refresh */}

          <button
            onClick={refreshDashboard}
            className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 border border-slate-200 shadow-sm hover:bg-slate-100 transition"
          >
            <RefreshCcw
              size={18}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* Welcome Banner */}

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-8 mb-8"
      >
        <div className="flex flex-col lg:flex-row justify-between gap-8">

          <div>

            <h2 className="text-3xl font-bold">
              Welcome back, {username}
            </h2>

            <p className="mt-2 text-blue-100 max-w-xl">
              Manage admission applications, campus visit bookings and
              admission inquiries from one place.
            </p>

          </div>

          <div className="flex items-center">

            <div className="bg-white/15 rounded-2xl px-6 py-5 backdrop-blur">

              <div className="text-sm text-blue-100">
                Total Records
              </div>

              <div className="text-5xl font-bold mt-2">
                {admissions.length +
                  visits.length +
                  inquiries.length}
              </div>

            </div>

          </div>

        </div>
      </motion.div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">

        {dashboardStats.map((card) => {

          const Icon = card.icon;

          return (

            <motion.div
              key={card.title}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-7 shadow-sm"
            >

              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.color}`}
              />

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-slate-500 text-sm">
                    {card.title}
                  </p>

                  <h2 className="text-4xl font-bold mt-2 text-slate-800">
                    {card.value}
                  </h2>

                </div>

                <div
                  className={`p-4 rounded-2xl bg-gradient-to-r ${card.color} text-white shadow-lg`}
                >
                  <Icon size={24} />
                </div>

              </div>

              <div className="mt-6 flex justify-between text-sm">

                <span className="text-emerald-600 font-semibold">
                  Completed : {card.completed}
                </span>

                <span className="text-amber-600 font-semibold">
                  Pending : {card.pending}
                </span>

              </div>

            </motion.div>

          );
        })}

      </div>

      {/* Tabs */}

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

        <div className="flex border-b">

          {[
            {
              id: "visits",
              label: "Campus Visits",
            },
            {
              id: "admissions",
              label: "Admissions",
            },
            {
              id: "inquiries",
              label: "Inquiries",
            },
          ].map((tab) => (

            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-5 font-semibold transition-all ${
                activeTab === tab.id
                  ? "border-b-4 border-blue-600 text-blue-600 bg-blue-50"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>

          ))}

        </div>

        <div className="p-6">
          {/* ===========================
      CAMPUS VISITS
=========================== */}

{activeTab === "visits" && (
  <div className="overflow-x-auto rounded-2xl border border-slate-200">

    <table className="min-w-full">

      <thead className="bg-slate-100">

        <tr className="text-left text-slate-600 text-sm">

          <th className="px-6 py-4">Visitor</th>
          <th className="px-6 py-4">Contact</th>
          <th className="px-6 py-4">Guests</th>
          <th className="px-6 py-4">Visit Date</th>
          <th className="px-6 py-4">Time Slot</th>
          <th className="px-6 py-4">Status</th>
          <th className="px-6 py-4 text-center">Actions</th>

        </tr>

      </thead>

      <tbody>

        {loading ? (

          <tr>
            <td
              colSpan={7}
              className="py-16 text-center text-slate-500"
            >
              Loading Campus Visits...
            </td>
          </tr>

        ) : filteredVisits.length === 0 ? (

          <tr>
            <td
              colSpan={7}
              className="py-16 text-center text-slate-500"
            >
              No Campus Visits Found
            </td>
          </tr>

        ) : (

          filteredVisits.map((visit) => (

            <motion.tr
              key={visit.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t hover:bg-slate-50 transition"
            >

              <td className="px-6 py-5">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">

                    <User
                      size={18}
                      className="text-blue-700"
                    />

                  </div>

                  <div>

                    <h3 className="font-semibold">
                      {visit.visitorName}
                    </h3>

                    <p className="text-sm text-slate-500">
                      Campus Visitor
                    </p>

                  </div>

                </div>

              </td>

              <td className="px-6 py-5">

                <div className="flex items-center gap-2">

                  <Phone
                    size={15}
                    className="text-slate-400"
                  />

                  {visit.contactNumber}

                </div>

              </td>

              <td className="px-6 py-5">

                {visit.guests}

              </td>

              <td className="px-6 py-5">

                {visit.visitDate}

              </td>

              <td className="px-6 py-5">

                {visit.visitSlot}

              </td>

              <td className="px-6 py-5">

                {visit.isCompleted ? (

                  <span className="px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700 font-semibold">

                    Completed

                  </span>

                ) : (

                  <span className="px-3 py-1 rounded-full text-xs bg-amber-100 text-amber-700 font-semibold">

                    Pending

                  </span>

                )}

              </td>

              <td className="px-6 py-5">

                <div className="flex justify-center gap-2">

                  <button
                    onClick={() => {
                      setSelectedVisit(visit);
                      setShowVisitModal(true);
                    }}
                    className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                  >

                    <Eye size={18} />

                  </button>

                  <button
                    onClick={() => markCompleted(visit.id, "campusVisit")}
                    className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100"
                  >

                    <CheckCircle2 size={18} />

                  </button>

                  <button
                    onClick={() => handleDelete(visit.id, "campusVisit")}
                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                  >

                    <Trash2 size={18} />

                  </button>

                </div>

              </td>

            </motion.tr>

          ))

        )}

      </tbody>

    </table>

  </div>
)}{/* ===========================
      ADMISSIONS
=========================== */}

{activeTab === "admissions" && (
  <div className="overflow-x-auto rounded-2xl border border-slate-200">

    <table className="min-w-full">

      <thead className="bg-slate-100">

        <tr className="text-left text-slate-600 text-sm">

          <th className="px-6 py-4">Student</th>
          <th className="px-6 py-4">Father</th>
          <th className="px-6 py-4">Phone</th>
          <th className="px-6 py-4">Class</th>
          <th className="px-6 py-4">Previous School</th>
          <th className="px-6 py-4">Percentage</th>
          <th className="px-6 py-4">Status</th>
          <th className="px-6 py-4 text-center">Actions</th>

        </tr>

      </thead>

      <tbody>

        {loading ? (

          <tr>

            <td
              colSpan={8}
              className="py-16 text-center text-slate-500"
            >
              Loading Admissions...
            </td>

          </tr>

        ) : filteredAdmissions.length === 0 ? (

          <tr>

            <td
              colSpan={8}
              className="py-16 text-center text-slate-500"
            >
              No Admission Applications Found
            </td>

          </tr>

        ) : (

          filteredAdmissions.map((student) => (

            <motion.tr
              key={student.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-t hover:bg-slate-50 transition"
            >

              <td className="px-6 py-5">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-full bg-indigo-100 flex items-center justify-center">

                    <GraduationCap
                      size={18}
                      className="text-indigo-700"
                    />

                  </div>

                  <div>

                    <h3 className="font-semibold">
                      {student.studentName}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {student.gender}
                    </p>

                  </div>

                </div>

              </td>

              <td className="px-6 py-5">
                {student.fatherName}
              </td>

              <td className="px-6 py-5">
                {student.fatherPhone}
              </td>

              <td className="px-6 py-5 font-semibold">
                {student.admissionClass}
              </td>

              <td className="px-6 py-5">
                {student.previousSchool}
              </td>

              <td className="px-6 py-5">
                {student.percentage || "-"}%
              </td>

              <td className="px-6 py-5">

                {student.isCompleted ? (

                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                    Completed
                  </span>

                ) : (

                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                    Pending
                  </span>

                )}

              </td>

              <td className="px-6 py-5">

                <div className="flex justify-center gap-2">

                  <button
                    onClick={() => {
                      setSelectedAdmission(student);
                      setShowAdmissionModal(true);
                    }}
                    className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => markCompleted(student.id, "applications")}
                    className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100"
                  >
                    <CheckCircle2 size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(student.id, "applications")}
                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </td>

            </motion.tr>

          ))

        )}

      </tbody>

    </table>

  </div>
)}{/* ===========================
        INQUIRIES
=========================== */}

{activeTab === "inquiries" && (
  <>
    {loading ? (
      <div className="py-20 text-center text-slate-500">
        Loading Admission Inquiries...
      </div>
    ) : filteredInquiries.length === 0 ? (
      <div className="py-20 text-center text-slate-500">
        No Admission Inquiries Found
      </div>
    ) : (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {filteredInquiries.map((item) => (

          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >

            {/* Header */}

            <div className="flex justify-between items-start">

              <div className="flex gap-4">

                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">

                  <User
                    size={20}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <h3 className="font-semibold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {item.contact}
                  </p>

                </div>

              </div>

              {item.isCompleted ? (

                <span className="rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold">
                  Completed
                </span>

              ) : (

                <span className="rounded-full bg-amber-100 text-amber-700 px-3 py-1 text-xs font-semibold">
                  Pending
                </span>

              )}

            </div>

            {/* Subject */}

            <div className="mt-5">

              <h4 className="font-semibold text-slate-700">
                {item.subject}
              </h4>

            </div>

            {/* Message */}

            <div className="mt-3 rounded-xl bg-slate-50 p-4">

              <p className="text-slate-600 leading-7 line-clamp-4">
                {item.message}
              </p>

            </div>

            {/* Footer */}

            <div className="mt-6 flex justify-between items-center">

              <span className="text-sm text-slate-400">
                Admission Inquiry
              </span>

              <div className="flex gap-2">

                <button
                  onClick={() => {
                    setSelectedInquiry(item);
                    setShowInquiryModal(true);
                  }}
                  className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100 transition"
                >
                  <Eye size={18} />
                </button>

                <button
                  onClick={() => markCompleted(item.id, "inquiryData")}
                  className="rounded-lg bg-green-50 p-2 text-green-600 hover:bg-green-100 transition"
                >
                  <CheckCircle2 size={18} />
                </button>

                <button
                onClick={() => handleDelete(item.id, "inquiryData")}
                  className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100 transition"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>

          </motion.div>

        ))}

      </div>
    )}
  </>
)}

      </div>
    </div>{/* ===========================
      ADMISSION DETAILS MODAL
=========================== */}

<AnimatePresence>
  {showAdmissionModal && selectedAdmission && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-5"
      onClick={() => setShowAdmissionModal(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-6 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              Admission Application
            </h2>

            <p className="text-blue-100 mt-1">
              Complete student information
            </p>
          </div>

          <button
            onClick={() => setShowAdmissionModal(false)}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}

        <div className="overflow-y-auto max-h-[70vh] p-8">

          <div className="grid md:grid-cols-2 gap-8">

            {/* Student */}

            <div className="space-y-4">

              <h3 className="text-lg font-bold border-b pb-2">
                Student Details
              </h3>

              <InfoRow
                label="Student Name"
                value={selectedAdmission.studentName}
              />

              <InfoRow
                label="Date of Birth"
                value={selectedAdmission.dob}
              />

              <InfoRow
                label="Gender"
                value={selectedAdmission.gender}
              />

              <InfoRow
                label="Admission Class"
                value={selectedAdmission.admissionClass}
              />

              <InfoRow
                label="Address"
                value={selectedAdmission.address}
              />

            </div>

            {/* Parents */}

            <div className="space-y-4">

              <h3 className="text-lg font-bold border-b pb-2">
                Parent Details
              </h3>

              <InfoRow
                label="Father Name"
                value={selectedAdmission.fatherName}
              />

              <InfoRow
                label="Father Occupation"
                value={selectedAdmission.fatherOccupation}
              />

              <InfoRow
                label="Father Phone"
                value={selectedAdmission.fatherPhone}
              />

              <InfoRow
                label="Mother Name"
                value={selectedAdmission.motherName}
              />

              <InfoRow
                label="Mother Occupation"
                value={selectedAdmission.motherOccupation}
              />

              <InfoRow
                label="Mother Phone"
                value={selectedAdmission.motherPhone}
              />

            </div>

          </div>

          {/* Previous School */}

          <div className="mt-10">

            <h3 className="text-lg font-bold border-b pb-2 mb-5">
              Previous Academic Details
            </h3>

            <div className="grid md:grid-cols-3 gap-6">

              <InfoRow
                label="Previous School"
                value={selectedAdmission.previousSchool}
              />

              <InfoRow
                label="Board"
                value={selectedAdmission.board}
              />

              <InfoRow
                label="Percentage"
                value={
                  selectedAdmission.percentage
                    ? `${selectedAdmission.percentage}%`
                    : "-"
                }
              />

            </div>

          </div>

          {/* Status */}

          <div className="mt-10 flex justify-between items-center">

            <div>

              <span className="font-semibold mr-3">
                Status :
              </span>

              {selectedAdmission.isCompleted ? (
                <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
                  Completed
                </span>
              ) : (
                <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                  Pending
                </span>
              )}

            </div>

            <button
              onClick={() => setShowAdmissionModal(false)}
              className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Close
            </button>

          </div>

        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

{/* ===========================
      CAMPUS VISIT DETAILS MODAL
=========================== */}

<AnimatePresence>
  {showVisitModal && selectedVisit && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowVisitModal(false)}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-5"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl overflow-hidden"
      >
        {/* Header */}

        <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-6 flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-bold">
              Campus Visit Details
            </h2>

            <p className="text-emerald-100 mt-1">
              Visitor Information
            </p>
          </div>

          <button
            onClick={() => setShowVisitModal(false)}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            ✕
          </button>

        </div>

        {/* Body */}

        <div className="p-8">

          <div className="grid md:grid-cols-2 gap-8">

            <InfoRow
              label="Visitor Name"
              value={selectedVisit.visitorName}
            />

            <InfoRow
              label="Contact Number"
              value={selectedVisit.contactNumber}
            />

            <InfoRow
              label="Number of Guests"
              value={selectedVisit.guests}
            />

            <InfoRow
              label="Visit Date"
              value={selectedVisit.visitDate}
            />

            <InfoRow
              label="Visit Time Slot"
              value={selectedVisit.visitSlot}
            />

            <div>

              <p className="text-sm text-slate-500">
                Status
              </p>

              <div className="mt-2">

                {selectedVisit.isCompleted ? (

                  <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
                    Completed
                  </span>

                ) : (

                  <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                    Pending
                  </span>

                )}

              </div>

            </div>

          </div>

          <div className="mt-10 flex justify-end">

            <button
              onClick={() => setShowVisitModal(false)}
              className="px-6 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition"
            >
              Close
            </button>

          </div>

        </div>

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
{/* ===========================
      INQUIRY DETAILS MODAL
=========================== */}

<AnimatePresence>
  {showInquiryModal && selectedInquiry && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowInquiryModal(false)}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-5"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl rounded-3xl bg-white shadow-2xl overflow-hidden"
      >
        {/* Header */}

        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-8 py-6 flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-bold">
              Admission Inquiry
            </h2>

            <p className="text-violet-100 mt-1">
              Inquiry Details
            </p>

          </div>

          <button
            onClick={() => setShowInquiryModal(false)}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30"
          >
            ✕
          </button>

        </div>

        {/* Body */}

        <div className="p-8 space-y-6">

          <div className="grid md:grid-cols-2 gap-6">

            <InfoRow
              label="Name"
              value={selectedInquiry.name}
            />

            <InfoRow
              label="Contact"
              value={selectedInquiry.contact}
            />

            <InfoRow
              label="Subject"
              value={selectedInquiry.subject}
            />

            <div>

              <p className="text-sm text-slate-500">
                Status
              </p>

              <div className="mt-2">

                {selectedInquiry.isCompleted ? (

                  <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
                    Completed
                  </span>

                ) : (

                  <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                    Pending
                  </span>

                )}

              </div>

            </div>

          </div>

          <div>

            <h3 className="font-semibold text-lg mb-3">
              Message
            </h3>

            <div className="rounded-2xl bg-slate-50 p-6 leading-8 text-slate-700 whitespace-pre-wrap">
              {selectedInquiry.message}
            </div>

          </div>

          <div className="flex justify-end">

            <button
              onClick={() => setShowInquiryModal(false)}
              className="px-6 py-3 rounded-xl bg-violet-600 text-white hover:bg-violet-700"
            >
              Close
            </button>

          </div>

        </div>

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
};

export default Dashboard;