import axiosInstance from "./axiosInstance";

export async function login(values) {
  const response = await axiosInstance.post('/signin', values);
  return response.data;
}

export async function fetchAdminInfo() {
  const response = await axiosInstance.get('/adminInfo');
  return response.data;
}

export async function updateUserInfo(adminId, formData) {
  const response = await axiosInstance.patch(`/adminInfo/${adminId}`, formData);
  return response.data;
}