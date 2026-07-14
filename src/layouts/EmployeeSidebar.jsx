import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";

function EmployeeSidebar() {
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setShowLogoutModal(false);

    navigate("/");
  };

  return (
    <>
      <aside className="h-full flex flex-col">
        <h2 className="text-2xl font-bold text-center py-6 border-b">
          ERP
        </h2>

        <nav className="flex flex-col flex-1">
          <NavLink
            to="/employee-dashboard"
            className="px-6 py-3 hover:bg-slate-700"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/leaves"
            className="px-6 py-3 hover:bg-slate-700"
          >
            My Leaves
          </NavLink>

          <NavLink
            to="/asset-requests"
            className="px-6 py-3 hover:bg-slate-700"
          >
            My Requests
          </NavLink>

          <NavLink
            to="/profile"
            className="px-6 py-3 hover:bg-slate-700"
          >
            Profile
          </NavLink>

          <div className="mt-auto p-4">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2"
            >
              Logout
            </button>
          </div>
        </nav>
      </aside>

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

export default EmployeeSidebar;