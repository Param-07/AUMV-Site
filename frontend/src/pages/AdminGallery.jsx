import React, { useEffect, useState } from "react";
import { Images } from "lucide-react";
import ManagementPages from "../components/ManagementPages";
import { deleteImages, getImages, uploadImages } from "../utils/ApiCall";

const AdminGallery = () => {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchData = async () =>{
      try{
        setLoading(true);
        setLoadingMessage("Fetching the images from database...")
        const response = await getImages();
        console.log(response);
        if(response.message === "success"){
          if(response.categories !== null) {
            const _categories = response.categories.split(",").map((item) => item.trim());
            setCategories(_categories);
          }
          setData(response.images);
        }
      }
      catch(error){
        console.log("error while fetching imgs:", error);
      }
      finally{
        setLoading(false);
        setLoadingMessage("");
      }
    };

    fetchData();
  }, []);
  const columns = ["Title", "Date", "Category"];

  const formFields = [
    { name: "event_name", label: "Photo Title", type: "select", options: ["Sports", "Cultural", "Class Gallery", "Achievers", "Annual Function"], placeholder: "Select photo section", required: true },
    { name: "photo", label: "Upload Image", type: "file", accept: "image/*", required: true },
    { name: "description", label: "Image Description", type: "text", placeholder: "Enter suitable description", required: true },
  ];

  const handleSubmit = async (formData) => {
    console.log("New Item:", formData);
    const finalData = new FormData();

    Object.entries(formData).forEach(([Key, value]) => {
      finalData.append(Key, value);
    });

    try{
      setLoading(true);
      setLoadingMessage("Uploading image...")
      const response = await uploadImages(finalData);

      if(response.message === 'success'){
        await setData((prev) => [...prev, response.images[0]]);
      }
    }
    catch(error){
      console.log("Error uploading image :", error);
    }
    finally{
      setLoading(false);
      setLoadingMessage("");
    }
  };

  const handleDelete = async (id) => {
    try{
      setLoading(true);
      setLoadingMessage("Deleting image file");
      const response = await deleteImages(id);

      if(response.message === "file deleted succesfully"){
        setData((prev)=> prev.filter(t=> t.id != id));
      }
    }
    catch (error){
      console.log("error deleting image:", error);
    }
    finally{
      setLoading(false);
      setLoadingMessage("");
    }
  }
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
      onHandleDelete={handleDelete}
      categories={categories}
      loading={loading}
      loadingMessage={loadingMessage}
    />
  );
};

export default AdminGallery;
