import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import TableHeader from "./TableHeader";
import { useNavigate, useParams } from "react-router-dom";
import { notify } from "./Constant";
import FormComponent from "./FormComponent";

const EditUser = () => {
  const { getUserById, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    name: "",
    number: "",
  });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserById(id);
        setInitialValues({
          name: user.name,
          number: user.number,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [id, getUserById]);

  const handleSubmit = async (values) => {
    await updateUser(id, values);
    notify("User updated successfully.");
    navigate("/");
  };
  return (
    <div className="p-4 bg-gray-100 w-full h-screen">
      <TableHeader message={`Edit ${initialValues.name}`} />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full h-[85%] flex justify-center items-center ">
        <FormComponent
          handleSubmit={handleSubmit}
          initialValues={initialValues}
        />
      </div>
    </div>
  );
};

export default EditUser;
