import React, { useEffect, useState } from "react";
import { Images } from "lucide-react";
import ManagementPages from "../components/ManagementPages";
import { deleteImages, getImages, uploadImages } from "../utils/ApiCall";

const AdminGallery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setLoadingMessage("Fetching images from database...");
        let endp = "/fetch";
        const response = await getImages(endp);

        if (response.message === "success") {
          if (response.categories !== null) {
            const _categories = response.categories.split(",").map((item) => item.trim());
            setCategories(_categories);
          }
          setData(response.images);
        } else {
          setError({
            type: "error",
            title: "Data Fetch Failed",
            message: response.message || "Unable to load images. Please try again.",
          });
        }
      } catch (error) {
        setError({
          type: "error",
          title: "Network Error",
          message: "There was an issue connecting to the server. Please try again later.",
        });
      } finally {
        setLoading(false);
        setLoadingMessage("");
      }
    };

    fetchData();
  }, []);

  const columns = ["Title", "Date", "Category"];

  const formFields = [
    {
      name: "event_name",
      label: "Photo Title",
      type: "select",
      options: ["Videos", "Sports", "Cultural", "Class Gallery", "Achievers", "Annual Function"],
      placeholder: "Select photo section",
      required: true,
    },
    { name: "photo", label: "Upload Image", type: "file", accept: "image/*", required: true },
    { name: "description", label: "Image Description", type: "text", placeholder: "Enter suitable description", required: true },
  ];

  const handleSubmit = async (formData) => {
    const finalData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      finalData.append(key, value);
    });

    try {
      setLoading(true);
      setLoadingMessage("Uploading image...");
      const response = await uploadImages(finalData);

      if (response.message === "success") {
        setData((prev) => [...prev, response.images]);
        if (response.categories !== null) {
          const _categories = response.categories.split(",").map((item) => item.trim());
          setCategories(_categories);
        }
      } else {
        setError({
          type: "error",
          title: "Upload Failed",
          message: response.error || "Please check your file and try again.",
        });
      }
    } catch (error) {
      setError({
        type: "error",
        title: "Upload Error",
        message: error.response.data.message || "Something went wrong while uploading. Please try again.",
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
      const response = await deleteImages(id);

      if (response.message === "file deleted succesfully") {
        setData((prev) => prev.filter((t) => t.id !== id));
        if (response.categories !== null) {
          const _categories = response.categories.split(",").map((item) => item.trim());
          setCategories(_categories);
        }
      } else {
        setError({
          type: "warning",
          title: "Deletion Issue",
          message: "Could not delete the file. Please try again.",
        });
      }
    } catch (error) {
      setError({
        type: "error",
        title: "Delete Error",
        message: "Something went wrong while deleting the file.",
      });
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  const handleError = () =>{
    setError(null);
  }
  return (
    <>
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
        onHandleDelete={handleDelete}
        categories={categories}
        loading={loading}
        loadingMessage={loadingMessage}
        error={error}
        onSetError={handleError}
      />
    </>
  );
};

export default AdminGallery;
