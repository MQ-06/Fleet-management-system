import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const fetchSubscribers = () => axios.get(`${BASE_URL}/subscribers`);

export const createSubscriber = (data) => axios.post(`${BASE_URL}/subscribers`, data);

export const updateSubscriber = (id, data) => axios.put(`${BASE_URL}/subscribers/${id}`, data);
