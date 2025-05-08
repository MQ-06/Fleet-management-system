import axios from 'axios';

export const fetchRepairCategories = () => axios.get('/api/repair-categories');
export const addRepairCategory = (data) => axios.post('/api/repair-categories', data);
