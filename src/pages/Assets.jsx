import { useEffect, useState } from "react";
import AssetModal from "../components/AssetModal";
import ConfirmModal from "../components/ConfirmModal";
import EmptyState from "../components/EmptyState";
import {
  getAssets,
  deleteAsset,
} from "../services/assetService";
import MainLayout from "../layouts/MainLayout";
import toast from "react-hot-toast";

function Assets() {

  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assetToDelete, setAssetToDelete] =
    useState(null);
  const [selectedAsset, setSelectedAsset] =
    useState(null);

  const fetchAssets = async () => {
    try {

      const response = await getAssets();

      setAssets(response.data.assets);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleDelete = async () => {
    try {

      await deleteAsset(assetToDelete);
      await fetchAssets();
      setShowDeleteModal(false);
      setAssetToDelete(null);
      setSelectedAsset(null);
      toast.success("Asset Deleted Successfully");

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
          Asset Management
        </h1>

        <button
          onClick={() => {
            setSelectedAsset(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          + Add Asset
        </button>

      </div>

      <input
        type="text"
        placeholder="Search Asset..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="border rounded px-4 py-2 mb-5 w-80"
      />
      <div className="overflow-x-auto">
      {assets.length === 0 ? (
        <EmptyState
          title="No Assets Found"
          message="Start by adding your first company asset."
          actionText="Add Asset"
          onAction={() => setShowModal(true)}
        />
      ) :
      (<table className="w-full border">

        <thead className="bg-blue-600 text-white">

          <tr>

            <th className="p-3">Code</th>

            <th className="p-3">Name</th>

            <th className="p-3">Category</th>

            <th className="p-3">Brand</th>

            <th className="p-3">Total</th>

            <th className="p-3">Available</th>

            <th className="p-3">Status</th>

            <th className="p-3">Action</th>

          </tr>

        </thead>

        <tbody>

          {assets
            .filter((asset) =>
              (asset.assetName || "")
                .toLowerCase()
                .includes(search.toLowerCase()) ||

              (asset.assetCode ||"")
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((asset) => (

              <tr
                key={asset._id}
                className="border-b hover:bg-gray-100"
              >

                <td className="p-3 text-center">
                  {asset.assetCode || "-"}
                </td>

                <td className="p-3 text-center">
                  {asset.assetName || "-"}
                </td>

                <td className="p-3 text-center">
                  {asset.category || "-"}
                </td>

                <td className="p-3 text-center">
                  {asset.brand || "-"}
                </td>

                <td className="p-3 text-center">
                  {asset.totalQuantity || "-"}
                </td>

                <td className="p-3 text-center">
                  {asset.availableQuantity || "-"}
                </td>

                <td className="p-3 text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-sm inline-flex justify-center items-center

                    ${
                      asset.status === "Available"

                        ? "bg-green-100 text-green-700"

                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {asset.status}

                  </span>

                </td>

                <td className="p-3 text-center">

                  <div className="flex justify-center items-center gap-2">
                    <button
                    onClick={() => {

                      setSelectedAsset(asset);

                      setShowModal(true);

                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>{
                      setAssetToDelete(asset._id);
                      setShowDeleteModal(true);
                    }
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
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
      <AssetModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        fetchAssets={fetchAssets}
        asset={selectedAsset}
      />
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Asset"
        message="Are you sure you want to delete this asset? This action cannot be undone."
        confirmText="Delete"
        confirmColor="bg-red-600 hover:bg-red-700"
        onClose={() => {
          setShowDeleteModal(false);
          setAssetToDelete(null);
        }}
        onConfirm={handleDelete}
      />

    </MainLayout>
  );
}

export default Assets;