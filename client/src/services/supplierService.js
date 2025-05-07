import axios from 'axios';

export const fetchSuppliers = () =>
  axios.get('http://localhost:5000/api/suppliers');

export const addSupplier = (formData) =>
  axios.post('http://localhost:5000/api/suppliers', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });


  
