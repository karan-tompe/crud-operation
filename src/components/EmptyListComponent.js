import { Link } from "react-router-dom";

export const EmptyListMessage = ({
  message,
  description,
  buttonTitle,
  onAddUser,
}) => {
  return (
    <div className="flex my-12 justify-center items-center flex-col">
      <p className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        {message}
      </p>
      <p className="text-lg mb-4 text-gray-900 dark:text-white">
        {description}
      </p>
      <Link to="/add-user">
        <button
          type="button"
          className="flex flex-shrink-0 items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
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
          {buttonTitle}
        </button>
      </Link>
    </div>
  );
};
