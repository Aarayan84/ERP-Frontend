import { NavLink, useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";

function Sidebar() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] =
  useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold p-6 border-b">
        ERP
      </h2>

      <nav className="flex flex-col flex-1">
        <NavLink
          to="/dashboard"
          className="px-6 py-4 hover:bg-slate-700"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/employees"
          className="px-6 py-4 hover:bg-slate-700"
        >
          Employees
        </NavLink>

        <NavLink
          to="/leaves"
          className="px-6 py-4 hover:bg-slate-700"
        >
          Leaves
        </NavLink>

        <NavLink
          to="/assets"
          className="px-6 py-4 hover:bg-slate-700"
        >
          Assets
        </NavLink>

        <NavLink
          to="/asset-requests"
          className="px-6 py-4 hover:bg-slate-700"
        >
          Asset Requests
        </NavLink>

        <NavLink
          to="/profile"
          className="px-6 py-4 hover:bg-slate-700"
        >
          Profile
        </NavLink>

        <div className="mt-auto p-4">
          <button
            onClick={()=>setShowLogoutModal(true)}
            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2"
          >
            Logout
          </button>
        </div>
      </nav>
      <ConfirmModal
          isOpen={showLogoutModal}
          title="Logout"
          message="Are you sure you want to logout?"
          confirmText="Logout"
          confirmColor="bg-red-600 hover:bg-red-700"
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
      />
    </div>
  );
}


export default Sidebar;