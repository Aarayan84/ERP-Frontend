import { useState } from "react";
import { applyLeave } from "../services/leaveService";
import toast from "react-hot-toast";


function LeaveModal({ isOpen, onClose, fetchLeaves }) {
  const [formData, setFormData] = useState({
    leaveType: "Casual",
    fromDate: "",
    toDate: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);
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
      await applyLeave(formData);

      await fetchLeaves();

      setFormData({
        leaveType: "Casual",
        fromDate: "",
        toDate: "",
        reason: "",
      });

      onClose();

      toast.success("Leave Applied Successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }finally{
      setLoading(false);
    }
  };
  const closeHandler = () => {
    setFormData({
      leaveType: "Casual",
      fromDate: "",
      toDate: "",
      reason: "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-lg p-6 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-5">
          Apply Leave
        </h2>

        <form onSubmit={handleSubmit}>

          <select
            name="leaveType"
            disabled={loading}
            value={formData.leaveType}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
          >
            <option value="Casual">Casual</option>
            <option value="Sick">Sick</option>
            <option value="Annual">Annual</option>
            <option value="Emergency">Emergency</option>
          </select>

          <input
            type="date"
            name="fromDate"
            disabled={loading}
            value={formData.fromDate}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
          />

          <input
            type="date"
            name="toDate"
            disabled={loading}
            value={formData.toDate}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
          />

          <textarea
            name="reason"
            disabled={loading}
            placeholder="Reason (Minimum 20 characters)"
            value={formData.reason}
            onChange={handleChange}
            rows="4"
            className="w-full border p-3 rounded mb-4"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              disabled={loading}
              onClick={closeHandler}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
             {loading?"Applying...": "Apply Leave"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default LeaveModal;