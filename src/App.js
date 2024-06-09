import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Table from "./components/Table";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Table />,
  },
  {
    path: "/add-user",
    element: <AddUser />,
  },
  {
    path: "/edit-user/:id",
    element: <EditUser />,
  },
]);

const App = () => {
  return (
    <UserProvider>
      <RouterProvider router={router}>
        <ToastContainer />
      </RouterProvider>
    </UserProvider>
  );
};

export default App;
