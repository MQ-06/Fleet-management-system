import API from './api';

export const fetchPlans = () => API.get('/plans');
export const addPlan = (data) => API.post('/plans', data);
