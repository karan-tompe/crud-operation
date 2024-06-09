import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import TableHeader from "./TableHeader";
import { EmptyListMessage } from "./EmptyListComponent";
import { Link } from "react-router-dom";
import { notify } from "./Constant";

const Table = () => {
  const tableHeader = ["Sr. No.", "Name", "Number", "Actions"];
  const { users, deleteUser } = useContext(UserContext);

  const handleDelete = (id) => {
    deleteUser(id);
    notify("User deleted successfully.");
  };

  return (
    <div className="p-4 bg-gray-100 h-screen">
      <div className="fixed top-0 left-0 right-0 bg-gray-100 p-4">
        <TableHeader message="Active Users" showButton={true} />
      </div>
      <div className="mt-32 sm:mt-20 z-10">
        <div className="overflow-auto max-h-[80vh]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="sticky top-0 bg-white dark:bg-gray-700 dark:text-gray-400 border-b dark:border-gray-700">
              <tr>
                {tableHeader.map((header) => {
                  return (
                    <th key={header} scope="col" className="px-6 py-3">
                      {header}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {users && users.length ? (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="bg-white dark:bg-gray-900 border-b dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{user.id}</td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.number}</td>
                    <td className="px-6 py-4 space-x-6">
                      <Link to={`/edit-user/${user.id}`}>
                        <button className="ml-6 sm:ml-0 font-medium text-blue-700 dark:text-blue-500 hover:underline">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center bg-white">
                  <td
                    className="p-2 text-center text-gray-500"
                    colSpan={tableHeader.length}
                  >
                    <div className="w-full h-full mx-auto flex items-center justify-center">
                      <EmptyListMessage
                        message="No Active Users Found"
                        description="Get started by adding new user."
                        buttonTitle="Add New User"
                      />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
