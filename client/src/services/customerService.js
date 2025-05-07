import axios from 'axios';

export const createCustomer = (data) => axios.post('/api/customers', data);
export const fetchCustomers = () => axios.get('/api/customers');
