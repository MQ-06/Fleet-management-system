import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const fetchTranslations = () => axios.get(`${BASE_URL}/translations`);

export const addTranslation = (data) => axios.post(`${BASE_URL}/translations`, data);
