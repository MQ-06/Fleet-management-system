import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const fetchUsers = () => axios.get(`${BASE_URL}/users`);
export const createUser = (data) => axios.post(`${BASE_URL}/users`, data);
export const updateUser = (id, data) => axios.put(`${BASE_URL}/users/${id}`, data);
