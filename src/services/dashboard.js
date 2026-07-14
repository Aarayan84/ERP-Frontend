import api from "./api";

// Admin Dashboard
export const getDashboard = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};

// Employee Dashboard
export const getEmployeeDashboard = async () => {
  const response = await api.get("/dashboard/employee");
  return response.data;
};