import { useEffect, useState } from "react";
import { getAssets } from "../services/assetService";
import { requestAsset } from "../services/assetRequestService";
import toast from "react-hot-toast";

function AssetRequestModal({
  isOpen,
  onClose,
  fetchRequests,
}) {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    asset: "",
    quantity: 1,
    purpose: "",
  });

  useEffect(() => {
    if (isOpen) {
      fetchAssets();
    }
  }, [isOpen]);

  const fetchAssets = async () => {
    try {
      const response = await getAssets();

      // Only show available assets
      const availableAssets = (response.data.assets?? []).filter(
        (asset) => asset.availableQuantity > 0
      );

      setAssets(availableAssets);

      if (availableAssets.length > 0) {
        setFormData((prev) => ({
          ...prev,
          asset: availableAssets[0]._id,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.asset) {
      toast.error("No asset available to request.");
      return;
    } 
    setLoading(true);
    try {
      await requestAsset(formData);

      await fetchRequests();

      setFormData({
        asset: "",
        quantity: 1,
        purpose: "",
      });

      onClose();

      toast.success("Asset Requested Successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }finally{
        setLoading(false);
    }
  };
  const closeHandler = () => {
    setFormData({
      asset: assets[0]?._id || "",
      quantity: 1,
      purpose: "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-lg p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6">
          Request Asset
        </h2>

        <form onSubmit={handleSubmit}>

          <select
            name="asset"
            value={formData.asset}
            onChange={handleChange}
            disabled={loading || assets.length === 0}
            className="w-full border rounded p-3 mb-3"
          >{assets.length === 0 ? (
              <option value="">No assets available</option>
            ) : (
            assets.map((asset) => (
              <option
                key={asset._id}
                value={asset._id}
              >
                {asset.assetName} | {asset.brand} | ({asset.availableQuantity} Available)
              </option>
            ))
          )}
          </select>

          <input
            type="number"
            name="quantity"
            disabled={loading}
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border rounded p-3 mb-3"
          />

          <textarea
            name="purpose"
            rows="4"
            disabled={loading}
            placeholder="Purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="w-full border rounded p-3 mb-5"
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
              {loading ? "Requesting..." : "Request Asset"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AssetRequestModal;