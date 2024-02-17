import { Link, useLocation } from "react-router-dom";
import { FiHome, FiInfo } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../Redux/Hooks/reduxhooks";
import { RootState } from "../Redux/store";
import { IoLogOutOutline } from "react-icons/io5";
import {
  signOutFailed,
  signOutStart,
  signOutSuccess,
} from "../Redux/Features/authSlice";

const SideBar = () => {
  const location = useLocation();
  const { user } = useAppSelector((state: RootState) => state.user);
  const apiUrl = "api/users/signout";
  const dispatch = useAppDispatch();

  const handleUserSignOut = async () => {
    console.log("first user sign out");
    try {
      dispatch(signOutStart());
      const res = await fetch(apiUrl);
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailed(true));
      }
      dispatch(signOutSuccess());
    } catch (error) {
      dispatch(signOutFailed(true));
    }
  };

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

        {user ? (
          user.role === "hospital" ? (
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
          )
        ) : (
          ""
        )}
        <li
          className={`mb-3 hover:bg-gray-200 ${
            location.pathname === "/signup" ? "bg-gray-200" : ""
          }`}
        >
          {user ? (
            <button
              className="flex items-center space-x-2 p-2 rounded"
              onClick={handleUserSignOut}
            >
              <IoLogOutOutline />
              <span className="text-sm">Sign Out</span>
            </button>
          ) : (
            <Link
              to="/signup"
              className="flex items-center space-x-2 p-2 rounded"
            >
              <span className="text-sm">Join Us</span>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
