import generalAxiosInstance from "./generalAxiosInstance";

export async function fetchHomeAd() {
  const response = await generalAxiosInstance.get('/advertisement/home');
  return response.data;
}

export async function fetchNavAd() {
  const response = await generalAxiosInstance.get('/advertisement/nav');
  return response.data;
}

export async function patchClickCount(adId) {
  const response = await generalAxiosInstance.patch(`/advertisement/${adId}/click`);
  return response.data;
}

export async function fetchMagazineAd() {
  const response = await generalAxiosInstance.get(`/advertisement/magazine`);
  return response.data;
}