import React from "react";
import Table from "./components/Table";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div>
      <UserProvider>
        <Table />
        <ToastContainer />
      </UserProvider>
    </div>
  );
};

export default App;
