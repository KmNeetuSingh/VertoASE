import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const API_URL = '/api/employees';

const api = {
  getEmployees: async (search = '') => {
    const url = search ? `${API_URL}?q=${encodeURIComponent(search)}` : API_URL;
    const response = await apiClient.get(url);
    return response.data;
  },
  getEmployee: async (id) => {
    const response = await apiClient.get(`${API_URL}/${id}`);
    return response.data;
  },
  createEmployee: async (employeeData) => {
    const response = await apiClient.post(API_URL, employeeData);
    return response.data;
  },
  updateEmployee: async (id, employeeData) => {
    const response = await apiClient.put(`${API_URL}/${id}`, employeeData);
    return response.data;
  },
  deleteEmployee: async (id) => {
    const response = await apiClient.delete(`${API_URL}/${id}`);
    return response.data;
  }
};

export default api;