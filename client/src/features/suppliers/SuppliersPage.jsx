import { useEffect, useState } from 'react';
import { fetchSuppliers, addSupplier } from '@/services/supplierService';
import { fetchCustomers } from '@/services/customerService';
import SupplierForm from './components/SupplierForm';
import BackButton from '@/components/ui/BackButton';

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadSuppliers = async () => {
    try {
      const res = await fetchSuppliers();
      setSuppliers(res.data);
    } catch (err) {
      console.error(err);
      setSuppliers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const handleAdd = async (data) => {
    try {
      await addSupplier(data);
      setShowModal(false);
      loadSuppliers();
    } catch (err) {
      console.error('Failed to add supplier:', err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
        <BackButton />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-800">Manage Suppliers</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Supplier
          </button>
        </div>

        <table className="w-full border rounded">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="text-center py-4">Loading...</td></tr>
            ) : suppliers.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-4">No suppliers found.</td></tr>
            ) : (
              suppliers.map((s) => (
                <tr key={s._id} className="border-t">
                  <td className="p-2">{s.name}</td>
                  <td className="p-2">{s.customer?.companyName}</td>
                  <td className="p-2 capitalize">{s.type}</td>
                  <td className="p-2">{s.phone}</td>
                  <td className="p-2">{s.email}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-3xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-4 text-xl">&times;</button>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Add New Supplier</h3>
            <SupplierForm onSubmit={handleAdd} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SuppliersPage;
