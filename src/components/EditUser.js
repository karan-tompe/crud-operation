import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TableHeader from "./TableHeader";
import { useNavigate, useParams } from "react-router-dom";
import { notify } from "./Constant";

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters long")
    .max(30, "Name cannot exceed 70 characters")
    .required("Please enter your name"),
  number: Yup.string()
    .length(10, "Phone number must be exactly 10 digits")
    .required("Please enter your phone number"),
});

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
        <div className="flex-col">
          <Formik
            initialValues={initialValues}
            validationSchema={UserSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {() => (
              <Form className="w-96">
                <div className="relative z-0 w-full mb-6 group">
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="User Name"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-500 text-xs absolute bottom-[-16px]"
                  />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="number"
                    name="number"
                    id="number"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="Phone Number"
                  />
                  <ErrorMessage
                    name="number"
                    component="p"
                    className="text-red-500 text-xs absolute bottom-[-16px]"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="hover:bg-gray-100 hover:text-gray-800 border-2 border-gray-500 text-gray-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
