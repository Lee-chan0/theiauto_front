import axiosInstance from "./axiosInstance";

export async function createAdvertisement(formData) {
  const response = await axiosInstance.post(`/advertisement`, formData);
  return response.data;
}

export async function updateAdvertisement(formData, advertisement_id) {
  const response = await axiosInstance.patch(`/advertisement/${advertisement_id}`, formData)
  return response.data;
}

export async function fetchAdvertisement() {
  const response = await axiosInstance.get(`/advertisement`);
  return response.data;
}

export async function deleteAdvertisement(advertisement_id) {
  const response = await axiosInstance.delete(`/advertisement/${advertisement_id}`);
  return response.data;
};