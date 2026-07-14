import { useEffect, useState } from "react";
import {
  getEmployees,
  deleteEmployee,
} from "../services/employeeService";
import EmployeeModal from "../components/EmployeeModal";
import toast from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";
import ConfirmModal from "../components/ConfirmModal";
import EmptyState from "../components/EmptyState";

function Employees() {
  const [showDeleteModal, setShowDeleteModal] =
  useState(false);
  const [employeeToDelete, setEmployeeToDelete] =
  useState(null);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await getEmployees();
      setEmployees(response.data.employees);
    } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    };
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchEmployees();
  }, []);
  const [showModal, setShowModal] = useState(false);
  const handleDelete = async () => {

    try {
      await deleteEmployee(employeeToDelete);

      await fetchEmployees();

      toast.success("Employee Deleted Successfully!");
       setShowDeleteModal(false);
       setEmployeeToDelete(null);
       setSelectedEmployee(null);
    } catch (error) {
      toast.error(
          error.response?.data?.message || "Something went wrong"
      );
    }
  };
  if (loading) {
      return (
          <MainLayout>
              <h1 className="text-3xl font-bold">
                  Loading...
              </h1>
          </MainLayout>
      );
  }
  const filteredEmployees = employees.filter(
    (employee) =>
      (employee.name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      (employee.email || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      (employee.employeeId || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );
  return (
    <MainLayout>

      <div>
        <div className="flex justify-between items-center mb-6">

            <h1 className="text-3xl font-bold">
                Employees
            </h1>

            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-5 py-2 rounded"
            >
                + Add Employee
            </button>

        </div>
        <input
            type="text"
            placeholder="Search Employee..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="border rounded px-4 py-2 mb-4 w-80"
        />
        <div className="overflow-x-auto">
        {filteredEmployees.length === 0 ? (
            <EmptyState
              title="No Employees Found"
              message={
                search
                  ? "No employees match your search."
                  : "Click below to add your first employee."
              }
              actionText={!search ? "Add Employee" : undefined}
              onAction={!search ? () => setShowModal(true) : undefined}
            />
        ) : (
        <table className=" w-full border border-gray-300">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="p-3">Employee ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Department</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredEmployees.map((employee) => (

              <tr
                key={employee._id}
                className="border-b hover:bg-gray-100"
              >

                <td className="p-3 text-center">
                  {employee.employeeId || "-"}
                </td>

                <td className="p-3 text-center">
                  {employee.name || "-"}
                </td>

                <td className="p-3 text-center">
                  {employee.email || "-"}
                </td>

                <td className="p-3 text-center">
                  {employee.department || "-"}
                </td>

                <td className="p-3 text-center">
                  {employee.role || "-"}
                </td>

                <td className="p-3 text-center">

                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedEmployee(employee);
                        setShowModal(true);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {setEmployeeToDelete(employee._id);
                        setShowDeleteModal(true);}
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
      )}
      </div>
      <EmployeeModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedEmployee(null);
          }
        }
          fetchEmployees={fetchEmployees}
          employee={selectedEmployee}
      />
      <ConfirmModal
          isOpen={showDeleteModal}
          title="Delete Employee"
          message="This action cannot be undone."
          confirmText="Delete"
          confirmColor="bg-red-600 hover:bg-red-700"
          onClose={() =>{ setShowDeleteModal(false);
            setEmployeeToDelete(null);
          }}
          onConfirm={handleDelete}
      />
    </div>

    </MainLayout>
  );
}

export default Employees;