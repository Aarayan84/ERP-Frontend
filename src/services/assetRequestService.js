import api from "./api";

// Employee - Request Asset
export const requestAsset = async (data) => {
  const response = await api.post("/asset-requests", data);
  return response.data;
};

// Employee - My Requests
export const getMyRequests = async () => {
  const response = await api.get("/asset-requests/my-requests");
  return response.data;
};

// Admin - All Requests
export const getAllRequests = async () => {
  const response = await api.get("/asset-requests");
  return response.data;
};

// Admin - Update Request
export const updateRequestStatus = async (id, data) => {
  const response = await api.patch(`/asset-requests/${id}`, data);
  return response.data;
};