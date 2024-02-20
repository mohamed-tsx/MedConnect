import { RiMenu4Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { useAppSelector } from "../Redux/Hooks/reduxhooks";
import { RootState } from "../Redux/store";
import { IoLogOutOutline } from "react-icons/io5";
import {
  signOutFailed,
  signOutStart,
  signOutSuccess,
} from "../Redux/Features/authSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const apiUrl = "api/users/signout";

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
    <div className="flex justify-between items-center">
      <Link to="/">∆edConnect</Link>
      <ul className="hidden md:flex gap-4 ">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">About</Link>
        </li>
        {user ? (
          user.role === "hospital" ? (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          ) : (
            <li>
              <Link to="/">Hospitals List</Link>
            </li>
          )
        ) : (
          ""
        )}
      </ul>
      <div className="hidden md:block gap-3">
        {user ? (
          <div className="flex gap-2 items-center text-sm">
            <p>{user.username}</p>
            <img
              src={user.avatar}
              alt="profile photo"
              width={30}
              height={30}
              className="rounded-full"
            />
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
            className="p-2 flex bg-black text-white rounded-md"
          >
            <p>Join Us</p>
          </Link>
        )}
      </div>
      <button
        className="block md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <IoMdClose /> : <RiMenu4Line />}
      </button>
      {isMenuOpen && <SideBar />}
    </div>
  );
};

export default Header;
