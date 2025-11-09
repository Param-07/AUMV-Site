import React from "react";
import { Images } from "lucide-react";
import ManagementPages from "../components/ManagementPages";

const AdminGallery = () => {
  const data = [
    {
      title: "Computer Science Faculty",
      date: "10/15/2024",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
      category: "Teachers",
      color: "cyan",
    },
    {
      title: "Campus Library",
      date: "10/14/2024",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
      category: "Infrastructure",
      color: "blue",
    },
    {
      title: "Annual Sports Day",
      date: "10/10/2024",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
      category: "Sports",
      color: "orange",
    },
    {
      title: "Cultural Festival Performance",
      date: "10/08/2024",
      image: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa",
      category: "Cultural Activities",
      color: "pink",
    },
    {
      title: "Student Council 2024",
      date: "10/05/2024",
      image: "",
      category: "Students",
      color: "purple",
    },
    {
      title: "Science Fair Exhibition",
      date: "10/11/2024",
      image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d",
      category: "Events",
      color: "green",
    },
  ];
  const columns = ["Title", "Date", "Category"];

  const formFields = [
    { name: "event_name", label: "Photo Title", type: "select", options: ["Sports", "Cultural", "Class Gallery", "Achievers", "Annual Function"], placeholder: "Select photo section", required: true },
    // { name: "date", label: "Date", type: "date", required: true },
    { name: "file", label: "Upload Image", type: "file", accept: "image/*, video/*", required: true },
    { name: "description", label: "Image Description", type: "text", placeholder: "Enter suitable description", required: true },
  ];

  const handleSubmit = (formData) => {
    console.log("New Item:", formData);
  };

  return (
    <ManagementPages
      icon={Images}
      color="bg-purple-100 text-purple-700"
      title="Photo Gallery"
      subtitle="Manage your college photo collection"
      buttonText="Upload Photos"
      columns={columns}
      data={data}
      formFields={formFields}
      heading="Upload New Photo"
      description="Add a new photo to the college gallery"
      onFormSubmit={handleSubmit}
    />
  );
};

export default AdminGallery;
