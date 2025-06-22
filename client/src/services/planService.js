import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const fetchPlans = () => axios.get(`${BASE_URL}/plans`);

export const addPlan = (data) => axios.post(`${BASE_URL}/plans`, data);

export const updatePlan = (id, data) => axios.put(`${BASE_URL}/plans/${id}`, data);

export const togglePlanStatus = (id, active) =>
  axios.patch(`${BASE_URL}/plans/${id}/active`, { active });
