import generalAxiosInstance from "./generalAxiosInstance";

export async function fetchCategoryName(categoryId) {
  const response = await generalAxiosInstance.get(`/category/${categoryId}`)
  return response.data;
}