import api from './api'; // adjust import based on your setup

export const fetchSubscribers = () => api.get('/subscribers');
export const createSubscriber = (data) => api.post('/subscribers', data); // test-only
