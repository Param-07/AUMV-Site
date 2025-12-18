import React, { useEffect, useState } from "react";
import ManagementPages from "../components/ManagementPages";
import { apiRequest } from "../utils/ApiCall";

export default function Achievers() {
  const [achievers, setAchievers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAchievers = async () => {
    setLoading(true);
    try {
      const res = await apiRequest("GET", "/getAchievers");
      if (res.message === "success") {
        setAchievers(res.data || []);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAchievers();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      let endpoint = formData.mode === "edit" ? "/editAchiever" : "/addAchiever";
      await apiRequest("POST", endpoint, formData, true);
      loadAchievers();
    } catch (err) {
      setError({
        type: "error",
        title: "Upload Error",
        message: "Something went wrong while uploading achiever.",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiRequest("POST", "/deleteAchiever", { id });
      loadAchievers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ManagementPages
      icon={null}
      color="bg-blue-200"
      title="Achievers"
      subtitle="Manage top performers"
      buttonText="Add Achiever"
      data={achievers}
      loading={loading}
      loadingMessage="Loading achievers..."
      formFields={[
        { name: "name", label: "Student Name", type: "text", required: true },
        { name: "class", label: "Class", type: "text", required: true },
        { name: "achievement", label: "Achievement Title", type: "text", required: true },
        { name: "percentage", label: "Percentage (if academic)", type: "number", required: false },
        { name: "year", label: "Year", type: "number", required: true },
        { name: "description", label: "Description", type: "textarea", required: false },
        { name: "photo", label: "Photo", type: "file", required: true },
      ]}
      heading="Add Achiever"
      description="Upload details about outstanding academic or extracurricular achievers."
      error={error}
      onSetError={setError}
      onFormSubmit={handleSubmit}
      onHandleDelete={handleDelete}
    />
  );
}
