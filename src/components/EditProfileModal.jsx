import { useEffect, useState } from "react";
import { updateProfile } from "../services/profileService";
import toast from "react-hot-toast";

function EditProfileModal({
  isOpen,
  onClose,
  profile,
  fetchProfile,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        department: profile.department || "",
        designation: profile.designation || "",
      });
    }
  }, [profile]);

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
      await updateProfile(formData);

      await fetchProfile();

      onClose();

      toast.success("Profile Updated Successfully");
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
      name:profile?.name || "" ,
      email:profile?.email || "",
      department:profile?.department || "",
      designation:profile?.designation || "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">

        <h2 className="text-2xl font-bold mb-6">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            disabled={loading}
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            type="email"
            name="email"
            disabled={loading}
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            type="text"
            disabled={loading}
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            type="text"
            disabled={loading}
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-6"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              disabled={loading}
              onClick={closeHandler}
              className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              {loading? "Saving..." :"Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditProfileModal;