import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Phone,
  Mail,
  User,
  Users,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { apiRequest } from "../../utils/ApiCall";

const AdmissionForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const formRef = useRef(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    studentName: "",
    dob: "",
    gender: "",
    admissionClass: "",
    address: "",

    fatherName: "",
    fatherOccupation: "",
    fatherPhone: "",

    motherName: "",
    motherOccupation: "",
    motherPhone: "",

    previousSchool: "",
    board: "",
    percentage: "",
    agreeTerms: false,
    isCompleted: false,
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    const finalData = new FormData();
    Object.entries(
        formData
      ).forEach(([key, value]) => {
          finalData.append(
            key,
            value
          );
        });
    const response = await apiRequest("POST", "/admissionForm", finalData)

    if(response.message){
      alert("Thank you!");
      setFormData({
        studentName: "",
        dob: "",
        gender: "",
        admissionClass: "",
        address: "",

        fatherName: "",
        fatherOccupation: "",
        fatherPhone: "",

        motherName: "",
        motherOccupation: "",
        motherPhone: "",

        previousSchool: "",
        board: "",
        percentage: "",
        agreeTerms: false,
        isCompleted: false,
      })
      setCurrentStep(1);
    }
  };

  return (
    <>
      {/* HERO SECTION */}

      <section
        className="relative h-[350px] md:h-[450px] overflow-hidden"
        style={{ marginTop: "95px" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1800')",
          }}
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="border-l-4 border-[#cca730] pl-6"
          >
            <h1 className="text-white text-5xl md:text-7xl font-black mb-4">
              Apply For Admission
            </h1>

            <p className="text-gray-200 max-w-3xl text-lg md:text-xl leading-relaxed">
              Shape your future at Alok Inter College. Join a legacy
              of excellence, discipline, leadership, and academic
              achievement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}

      <section className="py-20 bg-[#fcf9f8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-10">

            {/* LEFT SIDEBAR */}

            <div className="lg:col-span-4 space-y-8">

              {/* REQUIREMENTS */}

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border-l-4 border-[#15157d] p-8 shadow-sm"
              >
                <h3 className="text-2xl font-bold text-[#15157d] mb-6">
                  Application Requirements
                </h3>

                <div className="space-y-5">

                  {[
                    {
                      title: "Birth Certificate",
                      desc: "Original and photocopy",
                    },
                    {
                      title: "Previous Report Card",
                      desc: "Last academic session",
                    },
                    {
                      title: "Passport Size Photos",
                      desc: "4 recent photographs",
                    },
                    {
                      title: "Address Proof",
                      desc: "Aadhar / Utility Bill",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex gap-3"
                    >
                      <CheckCircle
                        size={20}
                        className="text-[#cca730] mt-1"
                      />

                      <div>
                        <p className="font-semibold">
                          {item.title}
                        </p>

                        <p className="text-sm text-gray-500">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* HELP CARD */}

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#15157d] text-white p-8"
              >
                <h3 className="text-2xl font-bold mb-4">
                  Need Help?
                </h3>

                <p className="text-white/80 mb-6 leading-relaxed">
                  Our admissions office is available Monday to
                  Saturday to assist you with the application
                  process.
                </p>

                <div className="space-y-4">

                  <div className="flex items-center gap-3">
                    <Phone size={18} />
                    <span>+91 7398332780</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail size={18} />
                    <span>
                      alokic003@gmail.com
                    </span>
                  </div>

                </div>
              </motion.div>

              {/* IMAGE CARD */}

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="overflow-hidden h-[300px] shadow-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200"
                  alt="School"
                  className="w-full h-full object-cover"
                />
              </motion.div>

            </div>

            {/* RIGHT FORM PANEL */}

            <div ref={formRef} className="lg:col-span-8 bg-white border border-gray-200 shadow-sm p-6 md:p-10">

              {/* STEP NAVIGATION */}

              <div className="flex justify-between border-b pb-5 overflow-x-auto">

                <button
                  className={`pb-3 font-semibold whitespace-nowrap ${
                    currentStep === 1
                      ? "text-[#15157d] border-b-4 border-[#cca730]"
                      : "text-gray-400"
                  }`}
                >
                  Student Information
                </button>

                <button
                  className={`pb-3 font-semibold whitespace-nowrap ${
                    currentStep === 2
                      ? "text-[#15157d] border-b-4 border-[#cca730]"
                      : "text-gray-400"
                  }`}
                >
                  Parent Details
                </button>

                <button
                  className={`pb-3 font-semibold whitespace-nowrap ${
                    currentStep === 3
                      ? "text-[#15157d] border-b-4 border-[#cca730]"
                      : "text-gray-400"
                  }`}
                >
                  Academic History
                </button>

              </div>

              {/* FORM CONTENT COMES IN CHUNK 2 */}
              <AnimatePresence mode="wait">

  {currentStep === 1 && (
    <motion.form
      key="step1"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      onSubmit={(e) => {
        e.preventDefault();
        nextStep();
      }}
      className="pt-10"
    >
      <div className="flex items-center gap-3 mb-8">
        <User className="text-[#15157d]" size={28} />

        <h2 className="text-3xl font-bold text-[#15157d]">
          Student Information
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Student Name */}

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Full Name
          </label>

          <input
            type="text"
            value={formData.studentName}
            onChange={(e) =>
              updateField("studentName", e.target.value)
            }
            placeholder="As per official records"
            required
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15157d] outline-none"
          />
        </div>

        {/* DOB */}

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Date of Birth
          </label>

          <input
            type="date"
            value={formData.dob}
            onChange={(e) =>
              updateField("dob", e.target.value)
            }
            required
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15157d] outline-none"
          />
        </div>

        {/* Gender */}

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Gender
          </label>

          <select
            value={formData.gender}
            onChange={(e) =>
              updateField("gender", e.target.value)
            }
            required
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15157d] outline-none"
          >
            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>
          </select>
        </div>

        {/* Admission Class */}

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Class Seeking Admission
          </label>

          <select
            value={formData.admissionClass}
            onChange={(e) =>
              updateField(
                "admissionClass",
                e.target.value
              )
            }
            required
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15157d] outline-none"
          >
            <option value="">
              Select Class
            </option>

            <option value="6">
              Class VI
            </option>

            <option value="7">
              Class VII
            </option>

            <option value="8">
              Class VIII
            </option>

            <option value="9">
              Class IX
            </option>

            <option value="10">
              Class X
            </option>

            <option value="11 Science">
              Class XI Science
            </option>

            <option value="11 Commerce">
              Class XI Commerce
            </option>

            <option value="12 Science">
              Class XII Science
            </option>

            <option value="12 Commerce">
              Class XII Commerce
            </option>
          </select>
        </div>

      </div>

      {/* Address */}

      <div className="mt-6">
        <label className="block mb-2 font-medium text-gray-700">
          Residential Address
        </label>

        <textarea
          rows={4}
          value={formData.address}
          onChange={(e) =>
            updateField("address", e.target.value)
          }
          placeholder="Street, Area, City, State, PIN Code"
          required
          className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15157d] outline-none resize-none"
        />
      </div>

      {/* Action Buttons */}

      <div className="flex justify-end mt-10">
        <button
          type="submit"
          className="bg-[#15157d] hover:bg-[#2525c4] text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition-all"
        >
          Continue

          <ChevronRight size={18} />
        </button>
      </div>
    </motion.form>
  )}
    {currentStep === 2 && (
    <motion.form
      key="step2"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      onSubmit={(e) => {
        e.preventDefault();
        nextStep();
      }}
      className="pt-10"
    >
      <div className="flex items-center gap-3 mb-8">
        <Users className="text-[#15157d]" size={28} />

        <h2 className="text-3xl font-bold text-[#15157d]">
          Parent / Guardian Details
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* FATHER DETAILS */}

        <div>
          <h3 className="text-lg font-bold text-red-700 mb-6 uppercase tracking-wider">
            Father's Information
          </h3>

          <div className="space-y-5">

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                value={formData.fatherName}
                onChange={(e) =>
                  updateField("fatherName", e.target.value)
                }
                required
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15157d] outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Occupation
              </label>

              <input
                type="text"
                value={formData.fatherOccupation}
                onChange={(e) =>
                  updateField(
                    "fatherOccupation",
                    e.target.value
                  )
                }
                required
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15157d] outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Contact Number
              </label>

              <input
                type="tel"
                value={formData.fatherPhone}
                onChange={(e) =>
                  updateField(
                    "fatherPhone",
                    e.target.value
                  )
                }
                required
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15157d] outline-none"
              />
            </div>

          </div>
        </div>

        {/* MOTHER DETAILS */}

        <div>
          <h3 className="text-lg font-bold text-red-700 mb-6 uppercase tracking-wider">
            Mother's Information
          </h3>

          <div className="space-y-5">

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                value={formData.motherName}
                onChange={(e) =>
                  updateField("motherName", e.target.value)
                }
                required
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15157d] outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Occupation
              </label>

              <input
                type="text"
                value={formData.motherOccupation}
                onChange={(e) =>
                  updateField(
                    "motherOccupation",
                    e.target.value
                  )
                }
                required
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15157d] outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Contact Number
              </label>

              <input
                type="tel"
                value={formData.motherPhone}
                onChange={(e) =>
                  updateField(
                    "motherPhone",
                    e.target.value
                  )
                }
                required
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15157d] outline-none"
              />
            </div>

          </div>
        </div>

      </div>

      {/* BUTTONS */}

      <div className="flex justify-between mt-10">

        <button
          type="button"
          onClick={prevStep}
          className="border border-gray-300 px-8 py-4 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2"
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        <button
          type="submit"
          className="bg-[#15157d] hover:bg-[#2525c4] text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition-all"
        >
          Continue
          <ChevronRight size={18} />
        </button>

      </div>
    </motion.form>
  )}
    {currentStep === 3 && (
    <motion.form
      key="step3"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="pt-10"
    >
      <div className="flex items-center gap-3 mb-8">
        <GraduationCap
          className="text-[#15157d]"
          size={28}
        />

        <h2 className="text-3xl font-bold text-[#15157d]">
          Academic History
        </h2>
      </div>

      <div className="space-y-6">

        {/* Previous School */}

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Previous School Attended
          </label>

          <input
            type="text"
            value={formData.previousSchool}
            onChange={(e) =>
              updateField(
                "previousSchool",
                e.target.value
              )
            }
            required
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15157d] outline-none"
          />
        </div>

        {/* Board + Percentage */}

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Board
            </label>

            <select
              value={formData.board}
              onChange={(e) =>
                updateField("board", e.target.value)
              }
              required
              className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15157d] outline-none"
            >
              <option value="">
                Select Board
              </option>

              <option value="CBSE">
                CBSE
              </option>

              <option value="ICSE">
                ICSE
              </option>

              <option value="UP Board">
                UP Board
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Percentage / GPA
            </label>

            <input
              type="text"
              value={formData.percentage}
              onChange={(e) =>
                updateField(
                  "percentage",
                  e.target.value
                )
              }
              placeholder="Example: 92%"
              required
              className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#15157d] outline-none"
            />
          </div>

        </div>

        {/* Declaration */}

        <div className="bg-gray-50 border-l-4 border-[#cca730] p-6 rounded-r-lg">
          <p className="text-gray-600 leading-relaxed mb-4">
            I hereby declare that the information
            provided above is true to the best of my
            knowledge and belief. I understand that
            any false information may result in the
            cancellation of this application.
          </p>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={(e) =>
                updateField(
                  "agreeTerms",
                  e.target.checked
                )
              }
              required
              className="mt-1 h-5 w-5 accent-[#15157d]"
            />

            <span className="font-medium text-gray-700">
              I agree to the Terms & Conditions
            </span>
          </label>
        </div>

      </div>

      {/* ACTION BUTTONS */}

      <div className="flex justify-between mt-10">

        <button
          type="button"
          onClick={prevStep}
          className="border border-gray-300 px-8 py-4 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2"
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        <button
          type="submit"
          className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-lg font-semibold transition-all"
        >
          Submit Application
        </button>

      </div>
    </motion.form>
  )}

</AnimatePresence>

</div>
</div>
        </div>
        </section>
    </>
  );
}

export default AdmissionForm;