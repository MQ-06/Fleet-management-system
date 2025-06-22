import axios from 'axios';

export const fetchUsers = () => axios.get('/api/users');
export const createUser = (data) => axios.post('/api/users', data);
export const updateUser = (id, data) => axios.put(`/api/users/${id}`, data);
