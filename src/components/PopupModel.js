import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters long")
    .max(70, "Name cannot exceed 70 characters")
    .required("Please enter your name"),
  number: Yup.string()
    .length(10, "Phone number must be exactly 10 digits")
    .required("Please enter your phone number"),
});

const PopupModel = ({ open, setOpen, user, notify }) => {
  const { addUser, updateUser } = useContext(UserContext);

  const initialValues = {
    name: user ? user.name : "",
    number: user ? user.number : "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (user) {
      await updateUser(user.id, values);
      notify("User updated successfully.");
    } else {
      await addUser(values);
      notify("User added successfully.");
    }
    setOpen(false);
    resetForm();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 m-8">
        <h2 className="text-xl font-bold mb-4 flex items-center space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="20"
            viewBox="0 0 10 20"
            fill="none"
          >
            <path
              d="M2.55247 10.0003L9.60364 3.10064C10.1074 2.60697 10.1349 1.77806 9.66364 1.24903C9.19365 0.720003 8.39991 0.692504 7.89741 1.18618L0.771241 8.16048C0.273746 8.64761 0 9.29973 0 10.0003C0 10.7009 0.273747 11.353 0.769992 11.8401L7.89616 18.8144C8.13741 19.0501 8.44366 19.1667 8.7499 19.1667C9.0849 19.1667 9.4174 19.0279 9.66239 18.7516C10.1336 18.2225 10.1061 17.3949 9.60239 16.9L2.55247 10.0003Z"
              fill="#6B778C"
            />
          </svg>
          <span>{user ? `Update ${user.name}` : "Add New User"}</span>
        </h2>
        <div className="flex justify-center flex-col">
          <Formik
            initialValues={initialValues}
            validationSchema={UserSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {() => (
              <Form className="max-w-full mx-32">
                <div className="relative z-0 w-full mb-6 group">
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    User Name
                  </label>
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-500 text-xs absolute bottom-[-16px]"
                  />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <Field
                    type="text"
                    name="number"
                    id="number"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="number"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Phone Number
                  </label>
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
                    onClick={() => setOpen(false)}
                  >
                    {user ? "Discard Changes" : "Cancel"}
                  </button>

                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    {user ? "Update" : "Submit"}
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

export default PopupModel;
