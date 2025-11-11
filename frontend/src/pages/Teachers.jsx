import React, { useEffect, useState } from "react";
import ManagementPages from "../components/ManagementPages";
import { Users } from "lucide-react";
import { addTeacher, editTeachers, getTeachers, deleteTeacherData} from "../utils/ApiCall";

const Teachers = () => {
  const columns = ["Name", "Email", "Subject", "Phone", "Joining Date"];
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [data, setTeacersData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async ()=> {
      try{
        setLoading(true);
        setLoadingMessage("Loading Teachers Data...");
        const response = await getTeachers();
        setTeacersData(response.teachers);
      }
      catch(error){
        setError({
          type: "error",
          title: "Loading error",
          message: error.response.data.message || "Something went wrong while fetching data. Please try again.",
        });
      }
      finally{
        setLoading(false);
        setLoadingMessage("");
      }
    };

    fetchTeachers();
  }, [])

  const formFields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "Enter teacher's full name", required: true },
    { name: "email", label: "Email", type: "email", placeholder: "Enter teacher's email", required: true },
    { name: "subject", label: "Subject", type: "select",options:["Hindi","English","Science","Math","G.K","Social Science","Art"], placeholder: "Enter Subject", required: true },
    { name: "joining_date", label: "Joining Date", type: "date", required: true },
    { name:"phone_num",label:"Phone Number",type:"Phone",placeholder:"Enter Phone Number",required:true},
    { name:"address",label:"Address",type:"textarea",placeholder:"Enter teacher's address",required:true},
    { name:"dob",label:"Date of birth",type:"date",required:true},
    { name: "photo", label: "Profile Picture", type: "file", accept: "image/*" },
    { name:"resume", label:"Upload Resume", type:"file",accept:"document/*" , required:true},
  ];

  const handleSubmit = async (formData) => {
    const finalData = new FormData();
    Object.entries(formData).forEach(([Key, value])=>{
      finalData.append(Key, value);
    });

    if(formData.mode === "add"){
      try{
        setLoading(true);
        setLoadingMessage("Adding New Teacher Data...");
        const response = await addTeacher(finalData);
        setTeacersData((prev) => [...prev, response.teacher[0]]);
      }
      catch(error){
        setError({
          type: "error",
          title: "Upload Error",
          message: error.response.data.message || "Something went wrong while uploading. Please try again.",
        });
      }
      finally{
        setLoading(false);
        setLoadingMessage("");
      }
    }
    else{
      let id = formData.id;
      try{
        setLoading(true);
        setLoadingMessage("Editing teacher data in table...");
        const response = await editTeachers(finalData,id);
        await setTeacersData((prev) =>
          prev.map((t) => (t.id === formData.id ? { ...t, ...response.teacher[0] } : t)))
      }
      catch(error){
        setError({
          type: "error",
          title: "Editing Error",
          message: error.response.data.message || "Something went wrong while editing. Please try again.",
        });
      }
      finally{
        setLoading(false);
        setLoadingMessage("");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      setLoadingMessage("Deleting Data...")
      const response = await deleteTeacherData(id);

      if (response.message === "Teacher data deleted") {
        setTeacersData((prev) => prev.filter((t) => t.id !== id))
      }
    } 
    catch (error) {
      setError({
        type: "error",
        title: "Deltetion Error",
        message: error.response.data.message || "Something went wrong while deleting data. Please try again.",
      });
    }
    finally{
      setLoading(false);
      setLoadingMessage("");
    }
  }

  const handleError = () => {
    setError(null);
  }
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
      onHandleDelete={handleDelete}
      loading={loading}
      loadingMessage={loadingMessage}
      onSetError={handleError}
      error={error}
    />
  );
};

export default Teachers;
