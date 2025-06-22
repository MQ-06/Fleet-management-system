import axios from 'axios';

export const fetchSuppliers = () =>
  axios.get('/api/suppliers');

export const addSupplier = (formData) =>
  axios.post('/api/suppliers', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateSupplier = (id, formData) =>
  axios.put(`/api/suppliers/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
