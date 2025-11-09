import React, { useEffect, useState } from "react";
import ManagementPages from "../components/ManagementPages";
import { Users } from "lucide-react";
import { addTeacher, editTeachers, getTeachers} from "../utils/ApiCall";

const Teachers = () => {
  const columns = ["Name", "Email", "Subject", "Phone", "Joining Date"];
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [data, setTeacersData] = useState([]);

  useEffect(() => {
    const fetchTeachers = async ()=> {
      try{
        setLoading(true);
        setLoadingMessage("Loading Teachers Data...");
        const response = await getTeachers();
        setTeacersData(response.teachers);
      }
      catch(error){
        console.log(error);
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
        console.log(response);
        await setTeacersData((prev) => [...prev, response.teacher[0]]);
      }
      catch(error){
        console.log("error while adding teacher :", error);
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
        console.log("error while editing teacher :", error);
      }
      finally{
        setLoading(false);
        setLoadingMessage("");
      }
    }
  };

  const handleDelete = async (id) => {
    try{
      setLoading(true);
      setLoadingMessage("Deleting Data...")
      await setTeacersData((prev) => prev.filter((t) => t.id !== id))
    }
    finally{
      setLoading(false);
      setLoadingMessage("");
    }
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
    />
  );
};

export default Teachers;
