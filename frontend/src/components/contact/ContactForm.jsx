import { motion } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";
import { useState } from "react";
import { apiRequest } from "../../utils/ApiCall";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    subject: "Admission Inquiry",
    message: "",
    isCompleted: false,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = new FormData();
    Object.entries(formData).forEach(
      ([key, value]) => {
        finalData.append(key, value)
      }
    );

    try
    {
      const response = await  apiRequest("POST", "/inquiryForm", finalData);

      if(response.message){
        alert("Inquiry Submitted - we will reach out to you on ou number");
        setFormData(
          {
            name: "",
            contact: "",
            subject: "Admission Inquiry",
            message: "",
            isCompleted: false,
          }
        )
      }
    }
    catch(error)
    {
      alert(error);
    }

  };

  return (
    <section id="inquiry-form" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">

        <div className="bg-white shadow-xl overflow-hidden">

          <div className="grid lg:grid-cols-2">

            {/* LEFT PANEL */}

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#15157d] text-white p-10 lg:p-16 flex flex-col justify-center"
            >
              <span className="uppercase tracking-[0.25em] text-[#cca730] text-sm font-semibold">
                Contact Us
              </span>

              <h2 className="text-4xl md:text-5xl font-black mt-5 leading-tight">
                Inquiry Form
              </h2>

              <p className="mt-8 text-gray-300 leading-relaxed text-lg">
                Have questions about admissions,
                academics, facilities, or student life?
                Fill out the form and our team will
                respond within 24–48 business hours.
              </p>

              <div className="space-y-5 mt-10">

                <div className="flex items-center gap-4">
                  <CheckCircle2
                    size={22}
                    className="text-[#cca730]"
                  />

                  <span>
                    U.P. Board Affiliated Institution
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <Star
                    size={22}
                    className="text-[#cca730]"
                  />

                  <span>
                    30+ Years of Educational Excellence
                  </span>
                </div>

              </div>

              <div className="mt-12 border-t border-white/10 pt-8">
                <div className="text-[#cca730] text-5xl font-black">
                  5000+
                </div>

                <p className="text-gray-300 mt-2">
                  Students Guided Towards Success
                </p>
              </div>
            </motion.div>

            {/* FORM PANEL */}

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 lg:p-16"
            >
              <form
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* NAME */}

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full border-b-2 border-slate-300 focus:border-[#15157d] focus:outline-none py-3 bg-transparent"
                    required
                  />
                </div>

                {/* EMAIL */}

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">
                    Contact Number
                  </label>

                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                    className="w-full border-b-2 border-slate-300 focus:border-[#15157d] focus:outline-none py-3 bg-transparent"
                    required
                  />
                </div>

                {/* SUBJECT */}

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">
                    Subject
                  </label>

                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border-b-2 border-slate-300 focus:border-[#15157d] focus:outline-none py-3 bg-transparent"
                  >
                    <option>
                      Admission Inquiry
                    </option>

                    <option>
                      Academic Information
                    </option>

                    <option>
                      Employment Opportunity
                    </option>

                    <option>
                      Campus Visit
                    </option>

                    <option>
                      General Support
                    </option>
                  </select>
                </div>

                {/* MESSAGE */}

                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">
                    Your Message
                  </label>

                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full border-b-2 border-slate-300 focus:border-[#15157d] focus:outline-none py-3 bg-transparent resize-none"
                    required
                  />
                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  className="w-full bg-[#15157d] text-white py-4 font-bold tracking-wider hover:bg-[#2e3192] transition-all duration-300"
                >
                  SUBMIT INQUIRY
                </button>
              </form>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactForm;