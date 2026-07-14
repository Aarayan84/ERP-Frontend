import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboard";
import DashboardCard from "../components/DashboardCard";
import MainLayout from "../layouts/MainLayout";
import EmployeeModal from "../components/EmployeeModal";
import AssetModal from "../components/AssetModal";
import EmptyState from "../components/EmptyState";


function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);

  const fetchDashboard = async () => {
      try {
        setLoading(true);
        const response = await getDashboard();

        setDashboard(response.data);

      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchDashboard();
    }, []);
    if (loading) {
      return (
        <MainLayout>
          <h2 className="text-2xl font-bold">Loading...</h2>
        </MainLayout>
      );
    }
  return (
    <MainLayout>

      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl text-white p-8 mb-8 shadow">

        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="text-blue-100 mt-2 text-lg">
          Here's what's happening in your organization today.
        </p>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <DashboardCard
            title="Employees"
            value={dashboard?.employees?.total}
            color="border-blue-500">
              <p className="text-sm text-gray-500">
                  {dashboard?.employees?.active || "0"} Active • {dashboard?.employees?.inactive || "0"} Inactive
              </p>
        </DashboardCard>

        <DashboardCard
            title="Leaves"
            value={dashboard?.leaves?.total}
            color="border-green-500">
              <p className="text-sm text-gray-500">
                  {dashboard?.leaves?.pending || "0"} Pending • {dashboard?.leaves?.approved || "0"} Approved • {dashboard?.leaves?.rejected || "0"} Rejected
              </p>
        </DashboardCard>

        <DashboardCard
            title="Assets"
            value={dashboard?.assets?.total}
            color="border-yellow-500">
              <p className="text-sm text-gray-500">
                  {dashboard?.assets?.available || "0"} Available • {dashboard?.assets?.outOfStock || "0"} Out of Stock
              </p>
        </DashboardCard>

        <DashboardCard
            title="Requests"
            value={dashboard?.assetRequests?.total}
            color="border-red-500">
              <p className="text-sm text-gray-500">
                  {dashboard?.assetRequests?.pending || "0"} Pending • {dashboard?.assetRequests?.approved || "0"} Approved • {dashboard?.assetRequests?.rejected || "0"} Rejected
              </p>
        </DashboardCard>
        </div>
        <div className="bg-white rounded-xl shadow mt-10 p-6">

          <h2 className="text-2xl font-bold mb-5">
            Recent Leave Requests
          </h2>
          {dashboard?.recentLeaves?.length === 0 ? (
            <EmptyState
              title="No Leave Requests"
              message="There are no recent leave requests."
            />
          ) : (
            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="p-3 text-left">Employee</th>

                  <th className="p-3 text-left">Leave Type</th>

                  <th className="p-3 text-left">Status</th>

                </tr>

              </thead>

              <tbody>

                {dashboard?.recentLeaves?.map((leave) => (

                  <tr
                    key={leave._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3">
                      {leave.employee?.name || "Deleted Employee"}
                    </td>

                    <td className="p-3">
                      {leave.leaveType}
                    </td>

                    <td className="p-3">

                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm
                        ${
                          leave.status === "Approved"
                            ? "bg-green-500"
                            : leave.status === "Rejected"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {leave.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
          )}
        </div>
        <div className="bg-white rounded-xl shadow mt-10 p-6">

          <h2 className="text-2xl font-bold mb-5">
            Recent Asset Requests
          </h2>

           {dashboard?.recentAssetRequests?.length === 0 ? (
            <EmptyState
              title="No Asset Requests"
              message="There are no recent asset requests."
            />
          ) : (
    <div className="overflow-x-auto">
      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-3 text-left">Employee</th>
            <th className="p-3 text-left">Asset</th>
            <th className="p-3 text-left">Status</th>
          </tr>

        </thead>

        <tbody>

          {dashboard?.recentAssetRequests?.map((request) => (

            <tr
              key={request._id}
              className="border-b hover:bg-gray-50"
            >

              <td className="p-3">
                {request.employee?.name || "Deleted Employee"}
              </td>

              <td className="p-3">
                {request.asset?.assetName || "Deleted Asset"}
              </td>

              <td className="p-3">

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm
                  ${
                    request.status === "Approved"
                      ? "bg-green-500"
                      : request.status === "Rejected"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {request.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>
    </div>
  )}

</div>


        <div className="flex gap-4 mt-10">

          <button
            onClick={() => setShowEmployeeModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            + Add Employee
          </button>

          <button
            onClick={() => setShowAssetModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            + Add Asset
          </button>

        </div>

        <EmployeeModal
          isOpen={showEmployeeModal}
          onClose={() => setShowEmployeeModal(false)}
          fetchEmployees={fetchDashboard}
        />

        <AssetModal
          isOpen={showAssetModal}
          onClose={() => setShowAssetModal(false)}
          fetchAssets={fetchDashboard}
        />

    </MainLayout>
  );
}


export default Dashboard;