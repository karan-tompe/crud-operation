import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const encodeData = (data) => {
    const jsonString = JSON.stringify(data);
    const utf8Array = new TextEncoder().encode(jsonString);
    const base64String = btoa(String.fromCharCode(...utf8Array));
    return base64String;
  };

  const decodeData = (base64String) => {
    const binaryString = atob(base64String);
    const utf8Array = new Uint8Array(
      [...binaryString].map((char) => char.charCodeAt(0))
    );
    const jsonString = new TextDecoder().decode(utf8Array);
    return JSON.parse(jsonString);
  };

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? decodeData(savedUsers) : [];
  });

  useEffect(() => {
    localStorage.setItem("users", encodeData(users));
  }, [users]);

  const addUser = (user) => {
    setUsers([...users, { ...user, id: users.length + 1 }]);
  };

  const updateUser = (id, updatedUser) => {
    setUsers(
      users.map((user) =>
        Number(user.id) === Number(id) ? { ...user, ...updatedUser } : user
      )
    );
  };

  const deleteUser = (id) => {
    const updatedUsers = users
      .filter((user) => user.id !== id)
      .map((user, index) => ({
        ...user,
        id: index + 1,
      }));
    setUsers(updatedUsers);
  };

  const getUserById = async (id) => {
    const user = users.find((user) => Number(user.id) === Number(id));
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  };

  return (
    <UserContext.Provider
      value={{ users, addUser, updateUser, deleteUser, getUserById }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
