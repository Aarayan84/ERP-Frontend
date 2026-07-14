import api from "./api";

// Employee - Apply Leave
export const applyLeave = async (leaveData) => {
  const response = await api.post("/leaves", leaveData);
  return response.data;
};

// Employee - My Leaves
export const getMyLeaves = async () => {
  const response = await api.get("/leaves/my-leaves");
  return response.data;
};

// Admin - All Leaves
export const getAllLeaves = async () => {
  const response = await api.get("/leaves");
  return response.data;
};

// Admin - Update Leave Status
export const updateLeaveStatus = async (id, data) => {
  const response = await api.patch(`/leaves/${id}`, data);
  return response.data;
};