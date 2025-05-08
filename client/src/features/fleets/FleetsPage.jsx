import { useEffect, useState } from 'react';
import { fetchFleets, addFleet } from '@/services/fleetService';
import { fetchCustomers } from '@/services/customerService';
import FleetForm from './components/FleetForm';
import BackButton from '@/components/ui/BackButton';

const FleetsPage = () => {
  const [fleets, setFleets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadFleets = async () => {
    try {
      const res = await fetchFleets();
      setFleets(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFleets();
  }, []);

  const handleAdd = async (data) => {
    try {
      await addFleet(data);
      setShowModal(false);
      loadFleets();
    } catch (err) {
      console.error('Failed to add fleet:', err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
        <BackButton />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-800">Manage Fleets</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Fleet
          </button>
        </div>

        <table className="w-full border rounded">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-2 text-left">Fleet Name</th>
              <th className="p-2 text-left">Company</th>
              <th className="p-2 text-left">Supervisor</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="3" className="p-4 text-center">Loading...</td></tr>
            ) : fleets.length === 0 ? (
              <tr><td colSpan="3" className="p-4 text-center">No fleets found.</td></tr>
            ) : (
              fleets.map((fleet) => (
                <tr key={fleet._id} className="border-t">
                  <td className="p-2">{fleet.name}</td>
                  <td className="p-2">{fleet.customer?.companyName}</td>
                  <td className="p-2">{fleet.supervisor}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Add New Fleet</h3>
            <FleetForm onSubmit={handleAdd} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FleetsPage;
