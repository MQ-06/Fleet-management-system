import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const fetchSuppliers = () =>
  axios.get(`${BASE_URL}/suppliers`);

export const addSupplier = (formData) =>
  axios.post(`${BASE_URL}/suppliers`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateSupplier = (id, formData) =>
  axios.put(`${BASE_URL}/suppliers/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
