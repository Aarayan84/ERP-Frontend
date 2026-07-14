import api from "./api";

// Get All Employees
export const getEmployees = async () => {
  const response = await api.get("/users");
  return response.data;
};

// Create Employee
export const createEmployee = async (employeeData) => {
  const response = await api.post("/users", employeeData);
  return response.data;
};

// Delete Employee
export const deleteEmployee = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

// Update Employee
export const updateEmployee = async (id, employeeData) => {
  const response = await api.put(`/users/${id}`, employeeData);
  return response.data;
};