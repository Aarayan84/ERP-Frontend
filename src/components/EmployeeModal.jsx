import { createEmployee, updateEmployee } from "../services/employeeService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function EmployeeModal({ isOpen, onClose, fetchEmployees,employee}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (employee) {
      setFormData({
        employeeId: employee.employeeId || "",
        name: employee.name || "",
        email: employee.email || "",
        password: "",
        department: employee.department || "",
        designation: employee.designation || "",
        salary: employee.salary ?? "",
        role: employee.role || "employee",
      });
    } else {
      setFormData({
        employeeId: "",
        name: "",
        email: "",
        password: "",
        department: "",
        designation: "",
        salary: "",
        role: "employee",
      });
    }
  }, [employee]);
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",
    password: "",
    department: "",
    designation: "",
    salary: "",
    role: "employee",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      if (employee) {
        // Update Employee
        await updateEmployee(employee._id, formData);
      } else {
        // Create Employee
        await createEmployee(formData);
      }

      // Refresh Employee List
      await fetchEmployees();

      // Reset Form
      setFormData({
        employeeId: "",
        name: "",
        email: "",
        password: "",
        department: "",
        designation: "",
        salary: "",
        role: "employee",
      });

      // Close Modal
      onClose();

      toast.success(
          employee
            ? "Employee Updated Successfully!"
            : "Employee Added Successfully!"
      );

    } catch (error) {
      console.log(error.response?.data);

      toast.error(
          error.response?.data?.message || "Something went wrong"
      );
    }finally{
      setLoading(false);
    }
  };
  const closeHandler = () => {
    if (employee) {
      setFormData({
        employeeId: employee.employeeId || "",
        name: employee.name || "",
        email: employee.email || "",
        password: "",
        department: employee.department || "",
        designation: employee.designation || "",
        salary: employee.salary ?? "",
        role: employee.role || "employee",
      });
    } else {
      setFormData({
        employeeId: "",
        name: "",
        email: "",
        password: "",
        department: "",
        designation: "",
        salary: "",
        role: "employee",
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">
          {employee ? "Edit Employee" : "Add Employee"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="employeeId"
            disabled={loading || !!employee}
            placeholder="Employee ID"
            value={formData.employeeId}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
          />

          <input
            type="text"
            name="name"
            placeholder="Name"
            disabled={loading}
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            disabled={loading}
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
          />

          <input
            type="password"
            name="password"
            disabled={loading}
            placeholder={
              employee
                ? "Leave blank to keep current password"
                : "Password"
            }
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
          />

          <input
            type="text"
            name="department"
            disabled={loading}
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
          />

          <input
            type="text"
            name="designation"
            disabled={loading}
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
          />

          <input
            type="number"
            name="salary"
            disabled={loading}
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
          />

          <select
            name="role"
            value={formData.role}
            disabled={loading}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={closeHandler}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className={`px-5 py-2 rounded-lg text-white ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading
                ? employee
                  ? "Updating..."
                  : "Creating..."
                : employee
                ? "Update"
                : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeModal;