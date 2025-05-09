// services/fleetService.js
import axios from 'axios';

export const fetchFleets = (customerId) =>
  axios.get(`/api/fleets${customerId ? `?customer=${customerId}` : ''}`);

export const addFleet = (data) =>
  axios.post('/api/fleets', data);

export const updateFleet = (id, data) =>
  axios.put(`/api/fleets/${id}`, data);
