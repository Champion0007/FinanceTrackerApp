import React from "react";
import { MdDarkMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = React.useState(false);

  const currentUser = JSON.parse(localStorage.getItem("FnCurrUser") || "null");

  const togleDropdown = () => {
    setIsOpen(!isOpen);
    // console.log(isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("FnCurrUser");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <h1 className="text-2xl font-bold text-purple-300 cursor-pointer">
        Finance Tracker
      </h1>

      <ul className="flex items-center gap-5">
        <Link
          to={"/dashboard"}
          className="cursor-pointer hover:text-purple-400"
        >
          dashboard
        </Link>{" "}
        <Link
          to={"/addtransaction"}
          className="cursor-pointer hover:text-purple-400"
        >
          Add
        </Link>
        <Link to={"/history"} className="cursor-pointer hover:text-purple-400">
          History
        </Link>
      </ul>

      <div className="flex items-center gap-4">
        <MdDarkMode
          size={24}
          className="cursor-pointer hover:text-purple-400"
        />

        <IoSettings
          size={24}
          className="cursor-pointer hover:text-purple-400"
        />

        <CgProfile
          onClick={togleDropdown}
          size={24}
          className="cursor-pointer hover:text-purple-400"
        />

        {isOpen && (
          <div className="absolute right-5 top-16 w-48 bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl p-4 shadow-lg">
            <p className="text-sm text-gray-300 mb-2">
              {currentUser?.fullName || "Guest"}
            </p>

            <button
              onClick={handleLogout}
              className="w-full text-left text-red-400 hover:text-red-500 text-sm"
            >
              Logout
            </button>
          </div>
        )}

        {/* <p className="text-sm">{currentUser?.fullName || "Guest"}</p> */}
      </div>
    </div>
  );
};

export default Navbar;
