import api from "./api";

// Get Profile
export const getProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

// Update Profile
export const updateProfile = async (data) => {
  const response = await api.put("/users/profile", data);
  return response.data;
};

// Change Password
export const changePassword = async (data) => {
  const response = await api.put("/users/change-password", data);
  return response.data;
};