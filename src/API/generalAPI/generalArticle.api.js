import generalAxiosInstance from "./generalAxiosInstance";

export async function fetchBannerArticle() {
  const response = await generalAxiosInstance.get('/article/banner');
  return response.data;
}

export async function fetchTodayNewsArticle() {
  const response = await generalAxiosInstance.get('/article/todaynews');
  return response.data;
}

export async function fetchMotorSportsArticle() {
  const response = await generalAxiosInstance.get('/article/mortorsports');
  return response.data;
}

export async function fetchDriveArticles() {
  const response = await generalAxiosInstance.get('article/drive');
  return response.data;
}

export async function fetchNewCarArticles() {
  const response = await generalAxiosInstance.get('/article/newcar');
  return response.data;
}

export async function fetchMagazineArticle() {
  const response = await generalAxiosInstance.get('/article/magazine');
  return response.data;
}

export async function fetchTravelArticles() {
  const response = await generalAxiosInstance.get('/article/travel');
  return response.data;
}

export async function fetchServiceArticles() {
  const response = await generalAxiosInstance.get('/article/service');
  return response.data;
}

export async function fetchBrandITArticles() {
  const response = await generalAxiosInstance.get('/article/brand');
  return response.data;
}

export async function fetchCategoryByArticles(categoryId, page) {
  const response = await generalAxiosInstance.get(`/articles/category/${categoryId}?page=${page}&limit=15`);
  return response.data;
}

export async function fetchCategoryBannerArticle(categoryId) {
  const response = await generalAxiosInstance.get(`/article/category/${categoryId}`);
  return response.data;
}