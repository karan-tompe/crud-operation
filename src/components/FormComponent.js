import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
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
const FormComponent = ({ initialValues, handleSubmit }) => {
  const navigate = useNavigate();
  return (
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
  );
};

export default FormComponent;
