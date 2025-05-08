import axios from 'axios';

export const fetchVehicles = () => axios.get('/api/vehicles');
export const addVehicle = (formData) =>
  axios.post('/api/vehicles', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });