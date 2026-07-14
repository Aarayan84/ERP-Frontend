import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getProfile } from "../services/profileService";
import EditProfileModal from "../components/EditProfileModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import toast from "react-hot-toast";

function Profile() {
  const [profile, setProfile] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getProfile();
      setProfile(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load profile"
      );
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
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
  if (!profile) {
    return (
      <MainLayout>
        <h1 className="text-2xl font-bold">Unable to load profile</h1>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <div className="flex flex-col items-center">

          <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
            {profile.name.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl font-bold mt-4">
            {profile.name}
          </h1>

          <p className="text-gray-500 capitalize">
            {profile.role}
          </p>

        </div>

        <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

          <div>
            <h3 className="font-semibold">Employee ID</h3>
            <p>{profile.employeeId}</p>
          </div>

          <div>
            <h3 className="font-semibold">Email</h3>
            <p>{profile.email}</p>
          </div>

          <div>
            <h3 className="font-semibold">Department</h3>
            <p>{profile.department}</p>
          </div>

          <div>
            <h3 className="font-semibold">Designation</h3>
            <p>{profile.designation}</p>
          </div>

          <div>
            <h3 className="font-semibold">Status</h3>
            <p>{profile.status}</p>
          </div>

          <div>
            <h3 className="font-semibold">Joining Date</h3>
            <p>
              {profile.joiningDate
                ? new Date(profile.joiningDate).toLocaleDateString()
                : "-"}
            </p>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">

          <button
            onClick={() => setShowEditModal(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
          >
            Edit Profile
          </button>

          <button
            onClick={() => setShowPasswordModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Change Password
          </button>

        </div>

      </div>

      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        profile={profile}
        fetchProfile={fetchProfile}
      />

      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </MainLayout>
  );
}

export default Profile;