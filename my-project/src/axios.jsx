import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_API;

const axiosInstance = axios.create({
  baseURL: backendUrl,  // Django backend API URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors and refresh the token
axiosInstance.interceptors.response.use(
  (response) => {
      // If the response is successful, return it as is
      return response;
  },
  async (error) => {
      const originalRequest = error.config;

      // Check if the error is a 401 and the request has not been retried yet
      if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
              // Attempt to refresh the token using the refresh token
              const refreshToken = localStorage.getItem('refresh_token');
              if (!refreshToken) {
                  throw new Error('No refresh token available');
              }

              // Send request to refresh the token
              const response = await axios.post(`${backendUrl}token/refresh/`, {
                  refresh: refreshToken,
              });

              const newAccessToken = response.data.access;
              localStorage.setItem('access_token', newAccessToken);

              // Update the original request with the new token and retry
              originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
              return axiosInstance(originalRequest);
          } catch (error) {
              console.error('Token refresh failed:', error);
              // Redirect to login page or handle logout if refresh token fails
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              window.location.href = '/';  // Redirect to login page
          }
      }

      return Promise.reject(error);
  }
);

export default axiosInstance;