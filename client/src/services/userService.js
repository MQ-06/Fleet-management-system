import api from './api';

export const fetchUsers = () => api.get('/users');
export const createUser = (data) => api.post('/users', data);
