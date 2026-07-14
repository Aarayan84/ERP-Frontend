import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getEmployeeDashboard } from "../services/dashboard";
import EmptyState from "../components/EmptyState";

function EmployeeDashboard() {
  const [dashboard, setDashboard] = useState(null);

  const fetchDashboard = async () => {
    try {
      const response = await getEmployeeDashboard();
      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!dashboard) {
    return (
      <MainLayout>
        <h2 className="text-2xl font-bold">Loading...</h2>
      </MainLayout>
    );
  }

  const { employee, leaves, assetRequests } = dashboard;

  return (
    <MainLayout>

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 mb-8">

        <h1 className="text-3xl font-bold">
          Welcome Back, {employee.name} 👋
        </h1>

        <p className="mt-2 text-blue-100">
          {employee.designation} | {employee.department}
        </p>

      </div>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white shadow rounded-xl p-6">

          <h3 className="text-gray-500">
            Pending Leaves
          </h3>

          <h2 className="text-4xl font-bold mt-2 text-yellow-500">
            {leaves.pending || "-"}
          </h2>

        </div>

        <div className="bg-white shadow rounded-xl p-6">

          <h3 className="text-gray-500">
            Approved Leaves
          </h3>

          <h2 className="text-4xl font-bold mt-2 text-green-600">
            {leaves.approved || "-"}
          </h2>

        </div>

        <div className="bg-white shadow rounded-xl p-6">

          <h3 className="text-gray-500">
            Pending Requests
          </h3>

          <h2 className="text-4xl font-bold mt-2 text-blue-600">
            {assetRequests.pending || "-"}
          </h2>

        </div>

        <div className="bg-white shadow rounded-xl p-6">

          <h3 className="text-gray-500">
            Approved Requests
          </h3>

          <h2 className="text-4xl font-bold mt-2 text-purple-600">
            {assetRequests.approved || "-"}
          </h2>

        </div>

      </div>

      {/* Recent Leave Requests */}

        <div className="bg-white shadow rounded-xl mt-8 p-6">
  <h2 className="text-2xl font-bold mb-4">
    Recent Leave Requests
  </h2>

  {dashboard.recentLeaves.length === 0 ? (
    <EmptyState
      title="No Leave Requests"
      message="You haven't applied for any leave yet."
    />
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Type</th>
            <th className="p-3">From</th>
            <th className="p-3">To</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {dashboard.recentLeaves.map((leave) => (
            <tr
              key={leave._id}
              className="border-b"
            >
              <td className="p-3 text-center">
                {leave.leaveType}
              </td>

              <td className="p-3 text-center">
                {new Date(
                  leave.fromDate
                ).toLocaleDateString()}
              </td>

              <td className="p-3 text-center">
                {new Date(
                  leave.toDate
                ).toLocaleDateString()}
              </td>

              <td className="p-3 text-center">
                {leave.status}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )}


      </div>

      {/* Recent Asset Requests */}

        <div className="bg-white shadow rounded-xl mt-8 p-6">
  <h2 className="text-2xl font-bold mb-4">
    Recent Asset Requests
  </h2>

  {dashboard.recentAssetRequests.length === 0 ? (
    <EmptyState
      title="No Asset Requests"
      message="You haven't requested any assets yet."
    />
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Asset</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {dashboard.recentAssetRequests.map((request) => (
            <tr
              key={request._id}
              className="border-b"
            >
              <td className="p-3 text-center">
                {request.asset?.assetName || "-"}
              </td>

              <td className="p-3 text-center">
                {request.quantity}
              </td>

              <td className="p-3 text-center">
                {request.status}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )}
</div>

    </MainLayout>
  );
}

export default EmployeeDashboard;