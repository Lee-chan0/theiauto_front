import axiosInstance from "./axiosInstance";

export async function login(values) {
  const response = await axiosInstance.post('/signin', values);
  return response.data;
}

export async function fetchAdminInfo() {
  const response = await axiosInstance.get('/adminInfo');
  return response.data;
}

export async function updateUserInfo(formData) {
  const response = await axiosInstance.patch(`/adminInfo`, formData);
  return response.data;
}