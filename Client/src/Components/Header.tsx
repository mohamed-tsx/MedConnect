import { RiMenu4Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { useAppSelector } from "../Redux/Hooks/reduxhooks";
import { RootState } from "../Redux/store";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.user);
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
        {user && user.role === "hospital" ? (
          <li>
            <Link to="/">Dashboard</Link>
          </li>
        ) : (
          <li>
            <Link to="/">Hostpitals List</Link>
          </li>
        )}
      </ul>
      <div className="hidden md:block">
        <Link to="/signup" className="p-2 flex bg-black text-white rounded-md">
          <p>Join Us</p>
        </Link>
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
