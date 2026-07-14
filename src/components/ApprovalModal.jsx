import { useState } from "react";

function ApprovalModal({
  isOpen,
  onClose,
  status,
  itemId,
  handleStatus,
}) {
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const submitHandler = async (e) => {
    e.preventDefault();

   try{
    setLoading(true);
     await handleStatus(itemId, status, remarks);

    setRemarks("");

    onClose();
  }catch(err){
    console.error(err);
  }finally{
    setLoading(false);
  }
  };
  const closeHandler = () => {
    setRemarks("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-lg p-6 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-5">

          {status === "Approved"
            ? "Approve Leave"
            : "Reject Leave"}

        </h2>

        <form onSubmit={submitHandler}>

          <textarea
            rows="5"
            placeholder="Enter Remarks..."
            value={remarks}
            onChange={(e) =>
              setRemarks(e.target.value)
            }
            className="w-full border rounded p-3 mb-5"
            required
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={closeHandler}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`text-white px-4 py-2 rounded
              ${
                status === "Approved"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {loading?"Processing...":status}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ApprovalModal;