import React from "react";
import ManagementPages from "../components/ManagementPages";

const Teachers = () => {
  const columns = ["Name", "Email", "Department", "Subject", "Phone", "Joining Date"];
  const data = [
    {
      Name: "Dr. Sarah Johnson",
      Email: "sarah.johnson@college.edu",
      Department: "Computer Science",
      Subject: "Data Structures",
      Phone: "+1 234-567-8901",
      "Joining Date": "8/15/2020"
    },
    {
      Name: "Prof. Michael Chen",
      Email: "michael.chen@college.edu",
      Department: "Mathematics",
      Subject: "Calculus",
      Phone: "+1 234-567-8902",
      "Joining Date": "7/20/2018"
    }
  ];

  return (
    <ManagementPages
      title="Teachers Management"
      subtitle="Manage your college teaching staff"
      buttonText="Add Teacher"
      columns={columns}
      data={data}
    />
  );
};

export default Teachers;