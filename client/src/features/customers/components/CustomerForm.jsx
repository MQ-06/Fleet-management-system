import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@/components/ui/Button';

const CustomerForm = ({ onClose }) => {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({
    companyName: '',
    logo: null,
    contactPerson: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    },
    currentPlan: '',
    nextRenewalDate: '',
    vehiclesRegistered: 0,
  });

  useEffect(() => {
    axios.get('/api/plans')
      .then(res => {
        if (Array.isArray(res.data)) setPlans(res.data);
        else if (Array.isArray(res.data.plans)) setPlans(res.data.plans);
        else setPlans([]);
      })
      .catch(() => setPlans([]));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'logo') {
      setForm(prev => ({ ...prev, logo: files[0] }));
    } else if (name.startsWith('address.')) {
      const key = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        address: { ...prev.address, [key]: value }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'address') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          formData.append(`address[${subKey}]`, subValue);
        });
      } else {
        formData.append(key, value);
      }
    });

    try {
      await axios.post('/api/customers', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Customer created successfully');
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to create customer');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Logo Upload Field */}
      <div className="col-span-2">
        <label className="block text-sm font-medium mb-1">Company Logo</label>
        <input
          name="logo"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0 file:text-sm file:font-semibold
            file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Company Name</label>
        <input name="companyName" onChange={handleChange} required className="input-style" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Contact Person</label>
        <input name="contactPerson" onChange={handleChange} required className="input-style" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input name="email" type="email" onChange={handleChange} required className="input-style" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input name="phone" onChange={handleChange} required className="input-style" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Street</label>
        <input name="address.street" onChange={handleChange} className="input-style" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">City</label>
        <input name="address.city" onChange={handleChange} className="input-style" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">State</label>
        <input name="address.state" onChange={handleChange} className="input-style" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Zip Code</label>
        <input name="address.zip" onChange={handleChange} className="input-style" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Country</label>
        <input name="address.country" onChange={handleChange} className="input-style" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Current Plan</label>
        <select name="currentPlan" onChange={handleChange} required className="input-style">
          <option value="">Select Plan</option>
          {plans.map(plan => (
            <option key={plan._id} value={plan._id}>
            {plan.name_en}
          </option>
          
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Next Renewal Date</label>
        <input name="nextRenewalDate" type="date" onChange={handleChange} className="input-style" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Vehicles Registered</label>
        <input name="vehiclesRegistered" type="number" min="0" onChange={handleChange} className="input-style" />
      </div>

      <div className="col-span-2 flex justify-end mt-4">
        <Button type="submit">Save Customer</Button>
      </div>
    </form>
  );
};

export default CustomerForm;
