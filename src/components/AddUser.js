import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import TableHeader from "./TableHeader";
import { useNavigate } from "react-router-dom";
import FormComponent from "./FormComponent";

const AddUser = () => {
  const { addUser } = useContext(UserContext);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    number: "",
  };

  const handleSubmit = async (values) => {
    await addUser(values);
    navigate("/");
  };

  return (
    <div className="p-4 bg-gray-100 w-full h-screen">
      <TableHeader message="Add New User" />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full h-[85%] flex justify-center items-center ">
        <FormComponent
          handleSubmit={handleSubmit}
          initialValues={initialValues}
        />
      </div>
    </div>
  );
};

export default AddUser;
