import { useEffect, useState } from "react";
import {
  createAsset,
  updateAsset,
} from "../services/assetService";
import toast from "react-hot-toast";

function AssetModal({
  isOpen,
  onClose,
  fetchAssets,
  asset,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    assetCode: "",
    assetName: "",
    category: "Laptop",
    brand: "",
    totalQuantity: "",
    availableQuantity: "",
    description: "",
  });

  useEffect(() => {
    if (asset) {
      setFormData({
        assetCode: asset.assetCode || "",
        assetName: asset.assetName || "",
        category: asset.category || "Laptop",
        brand: asset.brand || "",
        totalQuantity: asset.totalQuantity ?? "",
        availableQuantity: asset.availableQuantity ?? "",
        description: asset.description || "",
      });
    } else {
      setFormData({
        assetCode: "",
        assetName: "",
        category: "Laptop",
        brand: "",
        totalQuantity: "",
        availableQuantity: "",
        description: "",
      });
    }
  }, [asset]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      // Auto-fill available quantity when adding a new asset
      if (
        name === "totalQuantity" &&
        !asset &&
        prev.availableQuantity === ""
      ) {
        updated.availableQuantity = value;
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required fields validation
    if (
      !formData.assetCode.trim() ||
      !formData.assetName.trim() ||
      !formData.brand.trim() ||
      formData.totalQuantity === ""
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    // Quantity validations
    if (Number(formData.totalQuantity) < 0) {
      toast.error("Total Quantity cannot be negative.");
      return;
    }

    if (Number(formData.availableQuantity) < 0) {
      toast.error("Available Quantity cannot be negative.");
      return;
    }

    if (
      Number(formData.availableQuantity) >
      Number(formData.totalQuantity)
    ) {
      toast.error(
        "Available Quantity cannot be greater than Total Quantity."
      );
      return;
    }
    setLoading(true);
    try {
      if (asset) {
        await updateAsset(asset._id, formData);
      } else {
        await createAsset(formData);
      }

      await fetchAssets();

      onClose();

      toast.success(
        asset
          ? "Asset Updated Successfully!"
          : "Asset Added Successfully!"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 w-max max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
        <h2 className="text-2xl font-bold mb-6">
          {asset ? "Edit Asset" : "Add Asset"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="assetCode"
            placeholder="Asset Code"
            value={formData.assetCode}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
            disabled={loading || !!asset}
          />

          <input
            type="text"
            disabled={loading}
            name="assetName"
            placeholder="Asset Name"
            value={formData.assetName}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
          />

          <select
            name="category"
            disabled={loading}
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
          >
            <option value="Laptop">Laptop</option>
            <option value="Desktop">Desktop</option>
            <option value="Monitor">Monitor</option>
            <option value="Keyboard">Keyboard</option>
            <option value="Mouse">Mouse</option>
            <option value="Printer">Printer</option>
            <option value="Mobile">Mobile</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            disabled={loading}
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
          />

          <input
            type="number"
            disabled={loading}
            name="totalQuantity"
            placeholder="Total Quantity"
            value={formData.totalQuantity}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
            min="0"
          />

          <input
            type="number"
            disabled={loading}
            name="availableQuantity"
            placeholder="Available Quantity"
            value={formData.availableQuantity}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-3"
            min="0"
          />

          <textarea
            disabled={loading}
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border p-3 rounded mb-3"
          />

          {/* Status Display */}
          <div className="mb-5">
            <label className="block font-medium mb-2">
              Status
            </label>

            <input
              type="text"
              disabled={loading}
              readOnly
              value={
                Number(formData.availableQuantity) > 0
                  ? "Available"
                  : "Out of Stock"
              }
              className="w-full border p-3 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>

            <button    
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600"
            >
              {loading ?asset?"Updating...": "Saving..." :asset? "Update Asset": "Save Asset"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssetModal;