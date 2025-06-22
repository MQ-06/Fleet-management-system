import axios from 'axios';

export const fetchPlans = () => axios.get('/api/plans');

export const addPlan = (data) => axios.post('/api/plans', data);

export const updatePlan = (id, data) => axios.put(`/api/plans/${id}`, data);

export const togglePlanStatus = (id, active) =>
  axios.patch(`/api/plans/${id}/active`, { active });
