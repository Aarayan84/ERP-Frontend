import { useEffect, useState } from "react";
import { getMyLeaves,getAllLeaves,updateLeaveStatus } from "../services/leaveService";
import LeaveModal from "../components/LeaveModal";
import ApprovalModal from "../components/ApprovalModal";
import MainLayout from "../layouts/MainLayout";
import EmptyState from "../components/EmptyState";
import toast from "react-hot-toast";

function Leaves() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showApprovalModal, setShowApprovalModal] =
  useState(false);

    const [selectedLeaveId, setSelectedLeaveId] =
    useState(null);

    const [selectedStatus, setSelectedStatus] =
    useState("");
  const fetchLeaves = async () => {
    try {
        setLoading(true);

        let response;

        if (user?.role === "admin") {
        response = await getAllLeaves();
        setLeaves(response.data.leaves);
        } else {
        response = await getMyLeaves();
        setLeaves(response.data);
        }
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
  };
  useEffect(() => {
    fetchLeaves();
  }, []);
    if (loading) {
    return (
        <MainLayout>
        <h1 className="text-2xl font-bold">
            Loading...
        </h1>
        </MainLayout>
    );
    }
    const handleStatus = async (id, status,remarks) => {
        try {

            await updateLeaveStatus(id, {
            status,
            remarks,
            });

            await fetchLeaves();
            setShowApprovalModal(false);
            setSelectedLeaveId(null);
            setSelectedStatus("");
            toast.success(`Leave ${status}`);

        } catch (error) {
            toast.error(
            error.response?.data?.message ||
            "Something went wrong"
            );

        }
        };
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Leave Management
        </h1>

        {user?.role === "employee" && (
            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-5 py-2 rounded"
            >
                + Apply Leave
            </button>
            )}
      </div>

      <div className="overflow-x-auto">
        {leaves.length === 0 ? (

        <EmptyState
            title="No Leave Requests"
            message={user?.role==="admin"?
                "No leave requests found."
                :"You haven't applied for any leave yet."}
            actionText={user?.role==="employee"?
                "Apply Leave":
                undefined
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
                <>
                    <th className="p-3">Employee</th>
                    <th className="p-3">Department</th>
                </>
                )}

                <th className="p-3">Type</th>
                <th className="p-3">From</th>
                <th className="p-3">To</th>
                <th className="p-3">Days</th>
                <th className="p-3">Status</th>
                <th className="p-3">Reason</th>
                <th className="p-3">Remarks</th>
                {user?.role === "admin" && (
                <th className="p-3">Approved By</th>
                )}

                {user?.role === "admin" && (
                <th className="p-3">Action</th>
                )}
            </tr>

            </thead>

            <tbody>

            {leaves.map((leave)=>(

            <tr
            key={leave._id}
            className="border-b"
            >

            {user?.role === "admin" && (
                <>
                    <td className="p-3 text-center">
                    {leave.employee?.name ||"-"}
                    </td>

                    <td className="p-3 text-center">
                    {leave.employee?.department || "-"}
                    </td>
                </>
                )}
            <td className="p-3 text-center">
            {leave.leaveType}
            </td>

            <td className="p-3 text-center">
            {new Date(leave.fromDate).toLocaleDateString()}
            </td>

            <td className="p-3 text-center">
            {new Date(leave.toDate).toLocaleDateString()}
            </td>

            <td className="p-3 text-center">
            {leave.totalDays}
            </td>

            <td className="p-3 text-center">

            <span
            className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-white text-sm

            ${
            leave.status === "Approved"
            ? "bg-green-700"

            : leave.status === "Rejected"

            ? "bg-red-700"

            : "bg-yellow-700"
            }`}

            >

            {leave.status}

            </span>

            </td>
            <td className="p-3 max-w-xs text-center">
                {leave.reason}
            </td>
            <td className="p-3 text-center">
                {leave.remarks || "-"}
            </td>
            {user?.role === "admin" && (
                <td className="p-3 text-center">
                {leave.approvedBy?.name || "-"}
                </td>
            )}
            {user?.role === "admin" && (
                
                <td className="p-3 text-center">

                {leave.status === "Pending" ? (

                <div className="flex justify-center gap-2">

                <button
                onClick={() => {
                    setSelectedLeaveId(leave._id);
                    setSelectedStatus("Approved");
                    setShowApprovalModal(true);
                }}
                className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                >

                Approve

                </button>

                <button
                onClick={() => {
                    setSelectedLeaveId(leave._id);
                    setSelectedStatus("Rejected");
                    setShowApprovalModal(true);
                }}
                className="bg-red-600 text-white px-3 py-1 rounded"
                >

                Reject

                </button>

                </div>

                ) : (

                <span>-</span>

                )}

                </td>

                )}

            </tr>

            ))}

            </tbody>

            </table>
        )}
        </div>
      <LeaveModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        fetchLeaves={fetchLeaves}
        />
        <ApprovalModal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        itemId={selectedLeaveId}
        status={selectedStatus}
        handleStatus={handleStatus}
        />
    </MainLayout>
  );
}

export default Leaves;