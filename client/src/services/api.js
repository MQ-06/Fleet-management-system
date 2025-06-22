// api.js

import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000/api',
});

export const login = (credentials) => API.post('/auth/login', credentials);

export default API;
