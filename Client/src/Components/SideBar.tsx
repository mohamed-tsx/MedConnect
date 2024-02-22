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
            <>
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
              <li
                className={`mb-3 hover:bg-gray-200 ${
                  location.pathname === "/recentappointments"
                    ? "bg-gray-200"
                    : ""
                }`}
              >
                <Link
                  to="/recentappointments"
                  className="flex items-center space-x-2 p-2 rounded"
                >
                  Recent Appointments
                </Link>
              </li>
            </>
          ) : (
            <>
              <li
                className={`mb-3 hover:bg-gray-200 ${
                  location.pathname === "/hospitalsList" ? "bg-gray-200" : ""
                }`}
              >
                <Link
                  to="/hospitalsList"
                  className="flex items-center space-x-2 p-2 rounded"
                >
                  Hospitals List
                </Link>
              </li>
              <li
                className={`mb-3 hover:bg-gray-200 ${
                  location.pathname === "/appointments" ? "bg-gray-200" : ""
                }`}
              >
                <Link
                  to="/appointments"
                  className="flex items-center space-x-2 p-2 rounded"
                >
                  My Appointments
                </Link>
              </li>
            </>
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
            <div className="text-sm space-y-4">
              <div className="flex items-center gap-2">
                <img
                  src={user.avatar}
                  alt="profile photo"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <p>{user.username}</p>
              </div>
              <button
                className="p-2 flex bg-black text-white rounded-md gap-2 items-center"
                onClick={handleUserSignOut}
              >
                <IoLogOutOutline />
                Sign Out
              </button>
            </div>
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
