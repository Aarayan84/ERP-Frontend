import { useEffect, useState } from "react";
import AssetRequestModal from "../components/AssetRequestModal";
import ApprovalModal from "../components/ApprovalModal";
import toast from "react-hot-toast";
import EmptyState from "../components/EmptyState";
import {
  getMyRequests,
  getAllRequests,
  updateRequestStatus,
} from "../services/assetRequestService";
import MainLayout from "../layouts/MainLayout";

function AssetRequests() {
  const user = JSON.parse(localStorage.getItem("user")||"null");

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [showApprovalModal, setShowApprovalModal] =
    useState(false);

  const [selectedRequest, setSelectedRequest] =
    useState(null);

  const [selectedStatus, setSelectedStatus] =
    useState("");

  const fetchRequests = async () => {
    try {
      setLoading(true);

      let response;

      if (user?.role === "admin") {
        response = await getAllRequests();
        setRequests(response.data.requests);
      } else {
        response = await getMyRequests();
        setRequests(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatus = async (
    id,
    status,
    remarks
  ) => {
    try {
      await updateRequestStatus(id, {
        status,
        remarks,
      });

      await fetchRequests();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <h2 className="text-2xl font-bold">
          Loading...
        </h2>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Asset Requests
        </h1>

        {user?.role === "employee" && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            + Request Asset
          </button>
        )}

      </div>
      <div className="overflow-x-auto">
      {requests.length === 0 ? (
        <EmptyState
            title="No Asset Requests"
            message={
              user?.role === "admin"
                ? "No asset requests found."
                : "Request an asset to get started."
            }
            actionText={
              user?.role === "employee"
                ? "Request Asset"
                : undefined
            }
            onAction={
              user?.role === "employee"
                ? () => setShowModal(true)
                : undefined
            }
          />
        ) : (

      <table className="w-full border">

        <thead className="bg-blue-600 text-white">

          <tr>

            {user?.role === "admin" && (
              <th className="p-3">
                Employee
              </th>
            )}

            <th className="p-3">
              Asset
            </th>

            <th className="p-3">
              Quantity
            </th>

            <th className="p-3">
              Purpose
            </th>

            <th className="p-3">
              Status
            </th>

            <th className="p-3">
              Remarks
            </th>

            {user?.role === "admin" && (
              <th className="p-3">
                Action
              </th>
            )}

          </tr>

        </thead>

        <tbody>

          {requests.map((request) => (

            <tr
              key={request._id}
              className="border-b hover:bg-gray-100"
            >

              {user?.role === "admin" && (
                <td className="p-3 text-center">
                  {request.employee?.name || "Deleted Employee"}
                </td>
              )}

              <td className="p-3 text-center">
                {request.asset?.assetName || "-"}
              </td>

              <td className="p-3 text-center">
                {request.quantity || "-"}
              </td>

              <td className="p-3 text-center">
                {request.purpose || "-"}
              </td>

              <td className="p-3 text-center">

                <span
                  className={`px-3 py-1 rounded-full text-sm

                  ${
                    request.status === "Approved"
                      ? "bg-green-100 text-green-700"

                      : request.status === "Rejected"

                      ? "bg-red-100 text-red-700"

                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {request.status}
                </span>

              </td>

              <td className="p-3 text-center">
                {request.remarks || "-"}
              </td>

              {user?.role === "admin" && (

                <td className="p-3 text-center">

                  {request.status === "Pending" ? (

                    <>

                      <button
                        onClick={() => {
                          setSelectedRequest(
                            request._id
                          );

                          setSelectedStatus(
                            "Approved"
                          );

                          setShowApprovalModal(
                            true
                          );
                        }}
                        className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => {
                          setSelectedRequest(
                            request._id
                          );

                          setSelectedStatus(
                            "Rejected"
                          );

                          setShowApprovalModal(
                            true
                          );
                        }}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>

                    </>

                  ) : (

                    "-"

                  )}

                </td>

              )}

            </tr>

          ))}

        </tbody>

      </table>
    )}  
    </div>
      <AssetRequestModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        fetchRequests={fetchRequests}
      />

      <ApprovalModal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        itemId={selectedRequest}
        status={selectedStatus}
        handleStatus={handleStatus}
      />

    </MainLayout>
  );
}

export default AssetRequests;