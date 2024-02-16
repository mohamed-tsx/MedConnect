import { Link, useLocation } from "react-router-dom";
import { FiHome, FiInfo } from "react-icons/fi";

const links = [
  { to: "/", label: "Home", icon: <FiHome /> },
  { to: "/about", label: "About", icon: <FiInfo /> },
  { to: "/signup", label: "Join Us" },
];

const SideBar = () => {
  const location = useLocation();

  return (
    <div className="fixed inset-y-0 right-0 top-14 bg-white text-black z-50 overflow-y-auto w-48 shadow-md">
      <ul className="p-4">
        {links.map((link) => (
          <li
            key={link.to}
            className={`mb-3 hover:bg-gray-200 ${
              location.pathname === link.to ? "bg-gray-200" : ""
            }`}
          >
            <Link
              to={link.to}
              className="flex items-center space-x-2 p-2 rounded"
            >
              {link.icon && <span className="text-xl">{link.icon}</span>}
              <span className="text-sm">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
