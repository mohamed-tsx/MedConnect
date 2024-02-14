import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <Link to="/">∆edConnect</Link>
      <ul className="flex gap-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">About</Link>
        </li>
      </ul>
      <div className="">
        <Link to="/signup" className="p-2 flex bg-black text-white rounded-md">
          <p>Join Us</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
