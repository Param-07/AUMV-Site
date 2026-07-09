import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  FlaskConical,
  Users,
  ShieldCheck,
  MapPinned,
  GraduationCap,
} from "lucide-react";
import { apiRequest } from "../../utils/ApiCall";

const CampusVisitForm = () => {
  const dates = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);

    return {
      fullDate: date,
      day: date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
      date: date.getDate(),
    };
  });

  const [selectedDate, setSelectedDate] = useState(dates[0].fullDate);
  const [selectedTime, setSelectedTime] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    visitorName: "",
    contactNumber: "",
    guests: "2 Guests",
    visitDate: dates[0].fullDate.toISOString().slice(0, 10),
    visitSlot: "",
    isCompleted: false,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      visitDate: selectedDate.toISOString().slice(0, 10),
      visitSlot: selectedTime,
    }));
  }, [selectedDate, selectedTime]);

  const allSlots = ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"];

  const times = (() => {
    const today = new Date();
    const isToday =
      selectedDate?.toDateString() === today.toDateString();

    if (!isToday) return allSlots;

    return allSlots.filter((slot) => {
      const [time, meridian] = slot.split(" ");
      let [hour] = time.split(":").map(Number);

      if (meridian === "PM" && hour !== 12) hour += 12;
      if (meridian === "AM" && hour === 12) hour = 0;

      return hour > today.getHours();
    });
  })();

  useEffect(() => {
    if (times.length > 0) setSelectedTime(times[0]);
  }, [selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const finalData = new FormData();
    Object.entries(formData).forEach(
      ([key, value]) => {
        finalData.append(key, value);
      }
    );

    try
    {
      const response = await apiRequest("POST", "/campusVisitForm", finalData);

      if(response.message)
      {
        setSubmitting(false);
        alert("Thank you! Your campus visit request has been received.");

        setFormData({
          visitorName: "",
          contactNumber: "",
          guests: "2 Guests",
          visitDate: dates[0].fullDate.toISOString().slice(0, 10),
          visitSlot: "",
          isCompleted: false,
        })
      }
    }
    catch(error)
    {
      alert(error);
    }
  };

  return (
    <>
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
              Book Your Campus Tour
            </h1>

            <p className="text-gray-200 max-w-2xl text-lg md:text-xl leading-relaxed">
              Step into our legacy. Experience the perfect blend of heritage
              architecture and state-of-the-art facilities firsthand.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 md:py-24" style={{ paddingBottom: "0px" }}>
        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-5 h-full">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h2 className="text-4xl font-bold text-[#15157d] mb-2">
                  Experience Excellence
                </h2>

                <div className="w-16 h-1 bg-[#cca730] mb-6" />

                <p className="text-gray-600 leading-relaxed">
                  A guided tour of Alok Inter College is the best way to
                  understand our commitment to academic brilliance and holistic
                  student development.
                </p>
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-sm font-semibold tracking-[0.25em] uppercase text-[#15157d]">
                  What To Expect
                </h3>

                {[
                  [Building2, "Heritage Architecture", "Witness the grand design of our historic buildings that have nurtured generations of scholars."],
                  [FlaskConical, "Modern Laboratories", "Explore our cutting-edge STEM labs and digital learning centers equipped for the future."],
                  [Users, "Faculty Interaction", "Meet our distinguished faculty members and discuss academic pathways and campus life."],
                ].map(([Icon, title, text]) => (
                  <div key={title} className="flex gap-4 p-5 bg-gray-50 border border-gray-200 hover:border-[#15157d] transition-all">
                    <Icon size={24} className="text-[#15157d] mt-1" />
                    <div>
                      <h4 className="font-bold text-lg mb-1">{title}</h4>
                      <p className="text-gray-600">{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-gray-200 italic text-gray-600 mt-8">
                "Alok Inter College is not just a school; it's a foundation for
                lifelong leadership and character."
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 h-full">
            <div className="bg-white border-t-4 border-[#15157d] shadow-lg p-8 md:p-12 h-full">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    required
                    value={formData.visitorName}
                    onChange={(e) => setFormData({ ...formData, visitorName: e.target.value })}
                    className="w-full border-0 border-b-2 border-gray-300 py-3"
                  />
                  <input
                    type="tel"
                    placeholder="+91 00000 00000"
                    required
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    className="w-full border-0 border-b-2 border-gray-300 py-3"
                  />
                </div>

                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full border-0 border-b-2 border-gray-300 py-3"
                >
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4+ Guests</option>
                </select>

                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {dates.map((item) => (
                    <button
                      key={item.fullDate.toISOString()}
                      type="button"
                      onClick={() => setSelectedDate(item.fullDate)}
                      className={`flex flex-col items-center py-3 border ${
                        selectedDate?.toDateString() === item.fullDate.toDateString()
                          ? "bg-[#15157d] text-white border-[#15157d]"
                          : "border-gray-300"
                      }`}
                    >
                      <span>{item.day}</span>
                      <span>{item.date}</span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {times.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 border ${
                        selectedTime === time
                          ? "bg-[#15157d] text-white border-[#15157d]"
                          : "border-gray-300"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#15157d] text-white py-5 uppercase tracking-[0.2em]"
                >
                  {submitting ? "Processing..." : "Confirm Visit"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gray-50 border border-gray-200">
          <div className="grid md:grid-cols-3 gap-8 p-8">
            {[
              [ShieldCheck, "Easy Registration", "Hassle-free online booking for all family members."],
              [MapPinned, "Campus Guidance", "Interactive maps and student guides provided on arrival."],
              [GraduationCap, "Legacy of Success", "Part of Chandauli's premier educational landscape since decades."],
            ].map(([Icon, title, text]) => (
              <div key={title} className="text-center">
                <Icon size={42} className="mx-auto text-[#cca730] mb-4" />
                <h5 className="font-bold text-xl text-[#15157d] mb-2">{title}</h5>
                <p className="text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CampusVisitForm;
