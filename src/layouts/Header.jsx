import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import ConfirmModal from "../components/ConfirmModal";

function Header() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setShowLogoutModal(false);

    navigate("/");
    };
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
        ) {
        setShowDropdown(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
        document.removeEventListener(
        "mousedown",
        handleClickOutside
        );
    }, []);
 return (
    <>
        <header className="bg-white shadow h-16 flex justify-between items-center px-8">
        
<h1 className="text-2xl font-bold text-blue-600">
        ERP Management System
      </h1>

      <div
        className="relative flex items-center gap-4"
        ref={dropdownRef}
        >

        <div className="text-right">

            <p className="font-semibold">
            {user?.name || "User"}
            </p>

            <p className="text-sm text-gray-500 capitalize">
            {user?.role || ""}
            </p>

        </div>

        <button
            onClick={() =>
            setShowDropdown(!showDropdown)
            }
            className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold"
        >
            {user?.name?.charAt(0).toUpperCase() ||"U"}
        </button>

        {showDropdown && (

            <div className="absolute right-0 top-14 w-52 bg-white rounded-lg shadow-lg border z-50">

            <Link
                to="/profile"
                onClick={() =>
                setShowDropdown(false)
                }
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
            >
                <FaUserCircle />

                Profile
            </Link>

            <button
                onClick={()=>{
                    setShowDropdown(false);
                    setShowLogoutModal(true);
                }}
                className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-red-100 text-red-600"
            >
                <FaSignOutAlt />

                Logout
            </button>

            </div>

        )}

        </div>
        </header>

        <ConfirmModal
        isOpen={showLogoutModal}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        confirmColor="bg-red-600 hover:bg-red-700"
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        />
  </>
);
}

export default Header;




