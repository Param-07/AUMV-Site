import React from "react";
import useScrollToTop from "../../hooks/useScrollToTop";
import AdmissionsHero from "./AdmissionHero";
import AdmissionProcess from "./AdmissionProcess";
import ScholarshipSection from "./ScholarshipSection";
import { Link } from "react-router-dom";

export default function Admission() {
  useScrollToTop();

  return (
    <div className="bg-[#fcf9f8]">
      <AdmissionsHero />

      <AdmissionProcess />

      <ScholarshipSection />

      {/* CTA */}
      <section className="py-24 bg-[#15157d] text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Begin Your Legacy Today
          </h2>

          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
            Take the first step towards a transformative academic
            journey. Our admissions office is ready to assist you.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/admission-form"
              className="bg-white text-[#15157d] px-10 py-5 font-semibold rounded-md hover:shadow-xl transition-all"
            >
              START ONLINE APPLICATION
            </Link>

            <Link
              to="/campus-visit"
              className="bg-yellow-500 text-[#15157d] px-10 py-5 font-semibold rounded-md hover:shadow-xl transition-all"
            >
              BOOK A CAMPUS VISIT
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}