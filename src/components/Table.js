import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import PopupModel from "./PopupModel";
import TableHeader from "./TableHeader";
import { EmptyListMessage } from "./EmptyListComponent";
import { toast } from "react-toastify";

const Table = () => {
  const tableHeader = ["Sr. No.", "Name", "Number", "Actions"];
  const { users, deleteUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };
  const handleAddUser = () => {
    setSelectedUser(null);
    setOpen(true);
  };
  const handleDelete = (id) => {
    deleteUser(id);
    notify("User deleted successfully.");
  };
  const notify = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  return (
    <div className="p-4">
      <TableHeader onAddUser={handleAddUser} />
      <div class="w-full px-4 mt-6 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400 border-b dark:border-gray-700">
            <tr>
              {tableHeader.map((header) => {
                return (
                  <th scope="col" class="px-6 py-3">
                    {header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <>
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
                    <td className="px-6 py-4 space-x-4">
                      <button
                        onClick={() => handleEdit(user)}
                        className="ml-4 sm:ml-0 font-medium text-blue-700 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
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
                <tr className="text-center">
                  <td
                    className="p-2 text-center text-gray-500"
                    colSpan={tableHeader.length}
                  >
                    <div className="w-full h-full mx-auto flex items-center justify-center">
                      <EmptyListMessage
                        onAddUser={handleAddUser}
                        message="No Active Users Found"
                        description="Get started by adding new user."
                        buttonTitle="Add new user"
                      />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </>
        </table>
        <PopupModel
          open={open}
          setOpen={setOpen}
          user={selectedUser}
          notify={notify}
        />
      </div>
    </div>
  );
};

export default Table;
