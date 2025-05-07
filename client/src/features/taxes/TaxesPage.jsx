import { useEffect, useState } from 'react';
import { fetchTaxes, addTax } from '@/services/taxService';
import BackButton from '@/components/ui/BackButton';
import TaxForm from './components/TaxForm'; 

const TaxesPage = () => {
  const [taxes, setTaxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const loadTaxes = async () => {
    try {
      const res = await fetchTaxes();
      const taxArray = Array.isArray(res.data) ? res.data : [];
      setTaxes(taxArray);
    } catch (error) {
      console.error('Error fetching taxes:', error);
      setTaxes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTaxes();
  }, []);

  const handleAdd = async (formData) => {
    try {
      await addTax(formData);
      setShowModal(false);
      loadTaxes();
    } catch (error) {
      console.error('Error adding tax:', error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
        <BackButton className="mb-4" />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-800">Manage Taxes</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Tax
          </button>
        </div>

        <div className="overflow-x-auto rounded shadow-sm border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Country</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : taxes.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-400">No taxes found.</td>
                </tr>
              ) : (
                taxes.map((tax) => (
                  <tr key={tax._id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-3">{tax.name}</td>
                    <td className="p-3 capitalize">{tax.type}</td>
                    <td className="p-3">${tax.amount}</td>
                    <td className="p-3">{tax.country}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-4 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Add New Tax</h3>
            <TaxForm onSubmit={handleAdd} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxesPage;
