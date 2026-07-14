import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Employees from "../pages/Employees";
import Leaves from "../pages/Leaves";
import Assets from "../pages/Assets";
import AssetRequests from "../pages/AssetRequests";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee-dashboard" 
          element={
            <ProtectedRoute role="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute role="admin">
                <Employees />
            </ProtectedRoute>
          }
        />
        <Route path="/leaves" element={
            <ProtectedRoute>
                <Leaves />
            </ProtectedRoute>
          } />
        <Route path="/assets" element={
            <ProtectedRoute>
                <Assets />
            </ProtectedRoute>
          } />
        <Route path="/asset-requests" element={
            <ProtectedRoute>
                <AssetRequests />
            </ProtectedRoute>
          } />
        <Route path="/profile" element={
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
          } />
        <Route path="*" element={
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;