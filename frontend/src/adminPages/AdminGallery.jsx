import React, { useEffect, useState } from "react";
import { Images } from "lucide-react";
import ManagementPages from "../components/ManagementPages";
import { apiRequest } from "../utils/ApiCall";
import toast from "react-hot-toast";

const AdminGallery = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setLoadingMessage("Fetching gallery items...");
      const response = await apiRequest("GET", "/gallery/");

      if (response.message === "success") {
        if (response.categories !== null) {
          const _categories = response.categories.split(",").map((item) => item.trim());
          setCategories(_categories);
        }
        setData(response.admin_images);
      } else {
        setError({
          type: "error",
          title: "Loading Failed",
          message: response.message || "Could not load gallery items.",
        });
      }
    } catch {
      setError({
        type: "error",
        title: "Network Error",
        message: "Unable to connect to server. Please try again later.",
      });
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formFields = [
    {
      name: "event_name",
      label: "Photo Category",
      type: "select",
      options: [
        "Videos",
        "Sports",
        "Cultural",
        "Class Gallery",
        "Achievers",
        "Annual Function",
      ],
      placeholder: "Select category",
      required: true,
    },
    {
      name: "photo",
      label: "Upload Image",
      type: "file",
      accept: "image/*",
      required: true,
    },
    {
      name: "description",
      label: "Image Description",
      type: "text",
      placeholder: "Enter image caption or detail",
      required: true,
    },
  ];

  const handleSubmit = async (formData) => {
    const finalData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      finalData.append(key, value);
    });

    try {
      setLoading(true);
      setLoadingMessage("Uploading image...");
      const response = await apiRequest("POST", "/gallery/upload", finalData);

      if (response.message === "success") {
        setData((prev) => [...prev, response.data]);

        // if (response.categories !== null) {
        //   const _categories = response.categories.split(",").map((item) => item.trim());
        //   setCategories(_categories);
        // }

        toast.success("Image uploaded successfully!");
      } else {
        setError({
          type: "error",
          title: "Upload Failed",
          message: response.error || "Please verify the uploaded file and try again.",
        });
      }
    } catch (err) {
      setError({
        type: "error",
        title: "Upload Error",
        message: err?.response?.data?.message || "Unexpected upload issue occurred.",
      });
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      setLoadingMessage("Deleting image...");
      const response = await apiRequest("DELETE", `/gallery/delete/${id}`);

      if (response.message === "deleted") {
        setData((prev) => prev.filter((img) => img.id !== id));

        if (response.categories !== null) {
          const _categories = response.categories.split(",").map((item) => item.trim());
          setCategories(_categories);
        }

        toast.success("Image deleted");
      } else {
        setError({
          type: "warning",
          title: "Deletion Issue",
          message: "File deletion failed. Try again.",
        });
      }
    } catch {
      setError({
        type: "error",
        title: "Delete Error",
        message: "Unexpected error occurred while deleting.",
      });
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  return (
    <ManagementPages
      icon={Images}
      title="Photo Gallery"
      subtitle="Upload and organize images across school events"
      buttonText="Upload Photo"
      data={data}
      formFields={formFields}
      heading="Upload New Photo"
      description="Add a new memory to the school gallery"
      onFormSubmit={handleSubmit}
      onHandleDelete={handleDelete}
      categories={categories}
      loading={loading}
      loadingMessage={loadingMessage}
      error={error}
      onSetError={() => setError(null)}
    />
  );
};

export default AdminGallery;
