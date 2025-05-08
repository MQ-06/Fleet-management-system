import { useEffect, useState } from 'react';
import { fetchRepairCategories } from '@/services/repairCategoryService';
import BackButton from '@/components/ui/BackButton';
import RepairCategoryForm from './components/RepairCategoryForm';

const RepairCategoriesPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const loadCategories = async () => {
    try {
      const res = await fetchRepairCategories();
      setData(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSuccess = () => {
    setShowModal(false);
    loadCategories();
  };

  return (
    <div className="min-h-screen bg-white text-black p-4">
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start md:items-center pt-10 md:pt-0 z-50 overflow-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl relative p-6">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-blue-700 text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-blue-700 mb-4">Add New Category</h2>
            <RepairCategoryForm onSuccess={handleSuccess} />
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl border">
        <BackButton className="mb-4" />
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold text-blue-800">Repair & Maintenance Categories</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary text-white px-4 py-2 rounded shadow"
          >
            Add Category
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full table-auto border text-sm">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-3">Customer</th>
                <th className="p-3">Type</th>
                <th className="p-3">Category (EN)</th>
                <th className="p-3">Category (ES)</th>
                <th className="p-3">Suppliers</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item._id} className="border-t hover:bg-blue-50">
                    <td className="p-3">{item.customer?.companyName || 'N/A'}</td>
                    <td className="p-3">{item.type}</td>
                    <td className="p-3">{item.categoryEn}</td>
                    <td className="p-3">{item.categoryEs}</td>
                    <td className="p-3">
                      {item.supplierTypes?.map((s) => s.type).join(', ')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-400">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RepairCategoriesPage;
