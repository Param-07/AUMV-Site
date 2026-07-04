import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Building2,
  ClipboardList,
  Users,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Inquiry",
    description:
      "Submit your initial interest form online or visit our administrative office to receive the Heritage Admission Kit.",
  },
  {
    number: "02",
    icon: Building2,
    title: "Visit",
    description:
      "Schedule a campus tour to experience our facilities and meet with our academic counseling team.",
    featured: true,
  },
  {
    number: "03",
    icon: ClipboardList,
    title: "Application",
    description:
      "Submit the formal application along with academic transcripts and required documentation.",
  },
  {
    number: "04",
    icon: Users,
    title: "Interview",
    description:
      "A final interaction session with faculty to understand the student's aspirations and potential.",
    secondary: true,
  },
];

const AdmissionProcess = () => {
  return (
    <section className="bg-gray-50 py-28 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="inline-block relative text-4xl md:text-5xl font-bold text-[#15157d]">
            The Admission Process

            <span className="absolute left-1/2 -translate-x-1/2 bottom-[-15px] w-16 h-[2px] bg-[#cca730]" />
          </h2>

          <p className="max-w-2xl mx-auto mt-10 text-gray-600 text-lg">
            A structured four-step journey designed to ensure a mutual fit
            between the student's aspirations and our academic environment.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className={`relative border p-8 bg-white hover:shadow-lg transition-all overflow-hidden ${
                  step.featured
                    ? "border-t-4 border-t-[#15157d]"
                    : step.secondary
                    ? "border-t-4 border-t-red-700"
                    : "border-gray-200"
                }`}
              >
                {/* Large Background Number */}
                <div className="absolute -top-8 left-2 text-[90px] font-black text-[#cca730]/20 select-none">
                  {step.number}
                </div>

                <div className="relative z-10 mt-8">
                  <Icon
                    size={38}
                    className="text-[#15157d] mb-6"
                  />

                  <h3 className="text-2xl font-bold text-[#15157d] mb-4">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AdmissionProcess;