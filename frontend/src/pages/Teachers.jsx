import React from "react";
import ManagementPages from "../components/ManagementPages";
import { Users } from "lucide-react";

const Teachers = () => {
  const columns = ["Name", "Email", "Subject", "Phone", "Joining Date"];
  const data = [
    {
      Name: "Dr. Sarah Johnson",
      Email: "sarah.johnson@college.edu",
      Subject: "Data Structures",
      Phone: "+1 234-567-8901",
      "Joining Date": "8/15/2020",
    },
    {
      Name: "Prof. Michael Chen",
      Email: "michael.chen@college.edu",
      Subject: "Calculus",
      Phone: "+1 234-567-8902",
      "Joining Date": "7/20/2018",
    },
  ];

  const formFields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "Enter teacher's full name", required: true },
    { name: "email", label: "Email", type: "email", placeholder: "Enter teacher's email", required: true },
    { name: "subject", label: "Subject", type: "select",options:["Hindi","English","Science","Math","G.K","Social Science","Art"], placeholder: "Enter Subject", required: true },
    { name: "joinDate", label: "Joining Date", type: "date", required: true },
    {name:"phone",label:"Phone Number",type:"Phone",placeholder:"Enter Phone Number",required:true},
    {name:"address",label:"Address",type:"textarea",placeholder:"Enter teacher's address",required:true},
    {name:"DOB",label:"Date of birth",type:"date",required:true},
    { name: "profilePic", label: "Profile Picture", type: "file", accept: "image/*" },
    {name:"resume", label:"Upload Resume", type:"file",accept:"document /*" , required:true},
  ];

  const handleSubmit = (formData) => {
    console.log("Teacher Submitted:", formData);
  };

  return (
    <ManagementPages
      icon={Users}
      color="bg-blue-100 text-blue-600"
      title="Teachers Management"
      subtitle="Manage your college teaching staff"
      buttonText="Add Teacher"
      columns={columns}
      data={data}
      formFields={formFields}
      heading="Add New Teachers"
      description="Fill in the details below to create a new record."
      onFormSubmit={handleSubmit}
    />
  );
};

export default Teachers;
