import axios from 'axios';
import useAuthStore from '../store/authStore';

const API_BASE_URL = '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
};

export const projectsAPI = {
  getAll: () => apiClient.get('/projects'),
  create: (data) => apiClient.post('/projects', data),
  getById: (id) => apiClient.get(`/projects/${id}`),
  update: (id, data) => apiClient.put(`/projects/${id}`, data),
  delete: (id) => apiClient.delete(`/projects/${id}`),
};

export const tasksAPI = {
  getByProject: (projectId) => apiClient.get(`/tasks/project/${projectId}`),
  create: (projectId, data) => apiClient.post(`/tasks/project/${projectId}`, data),
  update: (taskId, data) => apiClient.put(`/tasks/${taskId}`, data),
  delete: (taskId) => apiClient.delete(`/tasks/${taskId}`),
};

export default apiClient;
