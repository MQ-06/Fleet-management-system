import axios from 'axios';
const API_BASE = 'http://localhost:5000'; 

export const fetchTaxes = () => axios.get(`${API_BASE}/api/taxes`);
export const addTax = (data) => axios.post(`${API_BASE}/api/taxes`, data);
