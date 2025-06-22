import axios from 'axios';

export const fetchSubscribers = () => axios.get('/api/subscribers');

export const createSubscriber = (data) => axios.post('/api/subscribers', data);

export const updateSubscriber = (id, data) => axios.put(`/api/subscribers/${id}`, data);
