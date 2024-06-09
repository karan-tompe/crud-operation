import React from "react";
import { Link } from "react-router-dom";

const TableHeader = ({ message, onAddUser, showButton }) => {
  return (
    <div className="w-full mx-auto mb-4 bg-white">
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
        <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
          <div className="flex space-x-4 items-center">
            {!showButton && (
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
            )}
            <h5 className="mr-3 font-semibold text-2xl dark:text-white">
              {message}
            </h5>
          </div>
          {showButton && (
            <Link to="/add-user">
              <button
                type="button"
                className="flex flex-shrink-0 items-center justify-center px-4 py-2 mt-2 sm:mt-0 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                onClick={onAddUser}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 mr-2 -ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
                Add New User
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
