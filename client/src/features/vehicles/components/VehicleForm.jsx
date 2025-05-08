// src/features/vehicles/components/VehicleForm.jsx
import { useEffect, useState } from 'react';
import { fetchCustomers } from '@/services/customerService';
import { fetchFleets } from '@/services/fleetService';
import ErrorMessage from '@/components/ui/ErrorMessage';

const VehicleForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    customer: '', fleet: '', name: '', vin: '', licensePlate: '', brand: '', color: '', year: '', mileage: '', purchaseDate: '', cost: '', ownership: '', amountPaid: '', monthlyPayment: '', paymentDay: '', finalPaymentDate: '', notes: '', labels: []
  });
  const [customers, setCustomers] = useState([]);
  const [fleets, setFleets] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCustomers().then(res => setCustomers(res.data)).catch(() => setCustomers([]));
    fetchFleets().then(res => setFleets(res.data)).catch(() => setFleets([]));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.customer) newErrors.customer = 'Customer is required';
    if (!form.fleet) newErrors.fleet = 'Fleet is required';
    if (!form.name.trim()) newErrors.name = 'Vehicle name is required';
    if (!form.vin.trim()) newErrors.vin = 'VIN number is required';
    if (!form.licensePlate.trim()) newErrors.licensePlate = 'License Plate is required';
    if (!form.brand.trim()) newErrors.brand = 'Brand is required';
    if (!form.year) newErrors.year = 'Year is required';
    if (!form.ownership) newErrors.ownership = 'Ownership is required';
    return newErrors;
  };

  const inputClass = (field) =>
    `p-3 border rounded focus:ring-2 focus:ring-blue-400 outline-none ${errors[field] ? 'border-red-500' : 'border-gray-300'}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    photos.forEach(p => formData.append('photos', p));
    documents.forEach((doc, i) => {
      formData.append('documents', doc.file);
      formData.append('labels', doc.label);
    });
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className=" p-6">
      <h3 className="text-lg font-semibold mb-6 text-blue-600">Add New Vehicle</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium">Customer</label>
          <select name="customer" value={form.customer} onChange={handleChange} className={inputClass('customer')}>
            <option value="">Select Customer</option>
            {customers.map(c => <option key={c._id} value={c._id}>{c.companyName}</option>)}
          </select>
          <ErrorMessage message={errors.customer} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Fleet</label>
          <select name="fleet" value={form.fleet} onChange={handleChange} className={inputClass('fleet')}>
            <option value="">Select Fleet</option>
            {fleets.map(f => <option key={f._id} value={f._id}>{f.name}</option>)}
          </select>
          <ErrorMessage message={errors.fleet} />
        </div>

        {['name', 'vin', 'licensePlate', 'brand', 'color', 'year', 'mileage', 'purchaseDate', 'cost'].map(field => (
          <div key={field} className="flex flex-col">
            <label className="block mb-1 font-medium">{field.replace(/([A-Z])/g, ' $1')}</label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              className={inputClass(field)}
              type={field.includes("Date") ? "date" : ['year', 'mileage', 'cost'].includes(field) ? 'number' : 'text'}
            />
            <ErrorMessage message={errors[field]} />
          </div>
        ))}

        <div>
          <label className="block mb-1 font-medium">Ownership</label>
          <select name="ownership" value={form.ownership} onChange={handleChange} className={inputClass('ownership')}>
            <option value="">Select Ownership</option>
            <option value="fully_paid">Fully Paid</option>
            <option value="lease">Lease</option>
            <option value="financed">Financed</option>
          </select>
          <ErrorMessage message={errors.ownership} />
        </div>

        {(form.ownership === 'lease' || form.ownership === 'financed') && (
          ['amountPaid', 'monthlyPayment', 'paymentDay', 'finalPaymentDate'].map(field => (
            <div key={field} className="flex flex-col">
              <label className="block mb-1 font-medium">{field.replace(/([A-Z])/g, ' $1')}</label>
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                className={inputClass(field)}
                type={field.includes("Date") ? "date" : 'text'}
              />
            </div>
          ))
        )}

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Notes"
            className={inputClass('notes') + ' w-full'}
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Upload Photos (max 5)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="file:bg-blue-600 file:text-white file:rounded file:px-4 file:py-2 file:border-0 text-gray-600"
            onChange={(e) => setPhotos([...e.target.files].slice(0, 5))}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Upload Documents</label>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="file"
                className="file:bg-blue-600 file:text-white file:rounded file:px-4 file:py-2 file:border-0 text-gray-600"
                onChange={(e) => {
                  const newDocs = [...documents];
                  newDocs[i] = { ...newDocs[i], file: e.target.files[0] };
                  setDocuments(newDocs);
                }}
              />
              <input
                type="text"
                placeholder="Label"
                className="p-2 border border-gray-300 rounded"
                onChange={(e) => {
                  const newDocs = [...documents];
                  newDocs[i] = { ...newDocs[i], label: e.target.value };
                  setDocuments(newDocs);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-right mt-6">
        <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:brightness-105">
          Save Vehicle
        </button>
      </div>
    </form>
  );
};

export default VehicleForm;
