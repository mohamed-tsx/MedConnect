import { Link, useLocation } from "react-router-dom";
import { FiHome, FiInfo } from "react-icons/fi";
import { useAppSelector } from "../Redux/Hooks/reduxhooks";
import { RootState } from "../Redux/store";

const SideBar = () => {
  const location = useLocation();
  const { user } = useAppSelector((state: RootState) => state.user);

  return (
    <div className="fixed inset-y-0 right-0 top-14 bg-white text-black z-50 overflow-y-auto w-48 shadow-md">
      <ul className="p-4">
        <li
          className={`mb-3 hover:bg-gray-200 ${
            location.pathname === "/" ? "bg-gray-200" : ""
          }`}
        >
          <Link to="/" className="flex items-center space-x-2 p-2 rounded">
            <span className="text-xl">
              <FiHome />
            </span>
            <span className="text-sm">Home</span>
          </Link>
        </li>
        <li
          className={`mb-3 hover:bg-gray-200 ${
            location.pathname === "/about" ? "bg-gray-200" : ""
          }`}
        >
          <Link to="/about" className="flex items-center space-x-2 p-2 rounded">
            <span className="text-xl">
              <FiInfo />
            </span>
            <span className="text-sm">About</span>
          </Link>
        </li>
        <li
          className={`mb-3 hover:bg-gray-200 ${
            location.pathname === "/signup" ? "bg-gray-200" : ""
          }`}
        >
          <Link
            to="/signup"
            className="flex items-center space-x-2 p-2 rounded"
          >
            <span className="text-sm">Join Us</span>
          </Link>
        </li>

        {user && user.role === "hospital" ? (
          <li
            className={`mb-3 hover:bg-gray-200 ${
              location.pathname === "/dashboard" ? "bg-gray-200" : ""
            }`}
          >
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 p-2 rounded"
            >
              Dashboard
            </Link>
          </li>
        ) : (
          <li
            className={`mb-3 hover:bg-gray-200 ${
              location.pathname === "/hospitals-list" ? "bg-gray-200" : ""
            }`}
          >
            <Link to="/" className="flex items-center space-x-2 p-2 rounded">
              Hospitals List
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SideBar;
