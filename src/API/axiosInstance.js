import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const isExpired = error.response?.status === 403 &&
      error.response?.data?.status === 'jwt expired';

    if (isExpired) {
      try {
        // 1. refresh-token 요청해서 새 accessToken 받기
        const { data } = await axios.post(`${BASE_URL}/refresh-token`, {}, {
          withCredentials: true
        });
        // 2. 새 토큰 저장
        sessionStorage.setItem('accessToken', data.accessToken);

        // 3. 원래 요청에 새 토큰 붙여서 다시 요청
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (e) {
        // 재발급 실패 → 로그아웃 처리
        sessionStorage.removeItem('accessToken');
        window.location.href = '/theiautoCMS';
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;