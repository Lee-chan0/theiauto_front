import axiosInstance from "./axiosInstance";

export async function fetchArticle(articleId) {
  const response = await axiosInstance.get(`/article/${articleId}`);
  return response.data;
}

export async function fetchCategoryByArticle(categoryId, page) {
  const response = await axiosInstance.get(`/article/category/${categoryId}?page=${page}&limit=15`);
  return response.data;
}

export async function createArticle(formData) {
  const response = await axiosInstance.post(`/article`, formData);
  return response.data;
}

export async function createContentImage(formData) {
  const response = await axiosInstance.post('/article/content', formData);
  return response.data;
}

export async function updateArticle(formData, articleId) {
  const response = await axiosInstance.patch(`/article/${articleId}`, formData);
  return response.data;
}

export async function updateImportant(isImportant, articleId) {
  const response = await axiosInstance.patch(`/article/${articleId}/important`, { isImportant });
  return response.data;
}

export async function fetchImportantArticle(page) {
  const response = await axiosInstance.get(`/article/important?page=${page}&limit=15`);
  return response.data;
}

export async function fetchBannerArticles() {
  const response = await axiosInstance.get(`/article/banner`);
  return response.data;
}

export async function fetchSearchArticle(page, categoryId, searchQuery) {
  const response = await axiosInstance.get(`/search/article?page=${page}&limit=15`, {
    params: {
      categoryId: categoryId,
      searchQuery: searchQuery
    }
  });
  return response.data;
}

export async function deleteArticle(articleId, prevImageUrls) {
  const response = await axiosInstance.delete(`/article/delete/${articleId}`, {
    data: { prevImageUrls }
  });
  return response.data;
}