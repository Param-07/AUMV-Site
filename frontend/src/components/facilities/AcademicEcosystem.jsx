import React from "react";
import FacilitiesGrid from "./FacilitiesGrid";

const AcademicEcosystem = () => {
  return (
    /* FIX: Added id tracking anchor and top margin scrolling gap offset */
    <section id="academic-ecosystem-section" className="py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#15157d] mb-4">
            Academic Ecosystem
          </h2>

          <div className="w-24 h-1 bg-[#cca730] mx-auto mb-6" />

          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
            Our facilities are curated to exceed international
            standards, providing students with the tools required
            for a competitive global landscape.
          </p>
        </div>

        <FacilitiesGrid />
      </div>
    </section>
  );
};

export default AcademicEcosystem;