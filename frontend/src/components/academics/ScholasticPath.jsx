import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, BarChart3 } from "lucide-react";
import { useAppData } from "../../context/AppDataContext";
import SmartImage from "../SmartImages";

const ScholasticPath = () => {
  const { gallery = [] } = useAppData();

  // Filter gallery items for "class gallery" and extract structural image URLs
  const dynamicImages = useMemo(() => {
    return gallery
      .filter((item) => item.category?.toLowerCase() === "class gallery")[0].images
      .map((item) => item.src || item.image);
  }, [gallery]);

  // Map to explicit positions in the layout collage, maintaining static defaults as safety nets
  const imageLeft = dynamicImages[2] || "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200";
  const imageRight = dynamicImages[3] || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200";

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#15157d] mb-6">
              The Scholastic Path
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              At Alok Inter College, we believe in a structured
              progression. Our pedagogy moves beyond rote learning,
              emphasizing conceptual clarity and the application of
              knowledge in real-world scenarios. We integrate digital
              literacy with classical humanities to provide a holistic
              educational foundation.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <CheckCircle2
                  className="text-red-700 shrink-0 mt-1"
                  size={26}
                />
                <div>
                  <h4 className="font-bold text-[#15157d] text-lg mb-1">
                    Inquiry-Based Learning
                  </h4>
                  <p className="text-gray-600">
                    Encouraging students to ask "why" and "how"
                    through guided research and critical thinking.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <BarChart3
                  className="text-red-700 shrink-0 mt-1"
                  size={26}
                />
                <div>
                  <h4 className="font-bold text-[#15157d] text-lg mb-1">
                    Data-Driven Assessment
                  </h4>
                  <p className="text-gray-600">
                    Continuous evaluation cycles designed to
                    monitor and enhance student growth trajectories.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT IMAGE COLLAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid grid-cols-2 gap-4">

              {/* Offset left image column */}
              <div className="pt-12">
                <div className="aspect-[3/4] overflow-hidden border border-slate-200 shadow-lg rounded-sm">
                  <SmartImage
                    src={imageLeft}
                    alt="Laboratory Learning"
                    wrapperClassName="w-full h-full"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right image column */}
              <div>
                <div className="aspect-[3/4] overflow-hidden border border-slate-200 shadow-lg rounded-sm">
                  <SmartImage
                    src={imageRight}
                    alt="Collaborative Learning"
                    wrapperClassName="w-full h-full"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ScholasticPath;