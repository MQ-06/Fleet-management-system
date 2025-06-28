import { useEffect, useState } from 'react';
import { fetchCostReports } from '@/services/costsReportService';
import { fetchSuppliers } from '@/services/supplierService';
import { fetchRepairCategories } from '@/services/repairCategoryService';
import { fetchCustomers } from '@/services/customerService';
import { fetchFleets } from '@/services/fleetService';
import { fetchVehicles } from '@/services/vehicleService';
import BackButton from '@/components/ui/BackButton';

const CostsReportPage = () => {
  const [filters, setFilters] = useState({
    customer: '',
    fleet: '',
    vehicle: '',
    type: '',
    supplier: '',
    category: '',
    dateFrom: '',
    dateTo: '',
  });

  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [fleets, setFleets] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState(['repair', 'maintenance']);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selected, setSelected] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));

    if (name === 'customer') {
      const customer = customers.find(c => c._id === value);
      setSelectedCustomer(customer);
      setFilters(prev => ({
        ...prev,
        fleet: '',
        vehicle: '',
        supplier: '',
        category: '',
        type: ''
      }));
    }

    if (name === 'fleet') {
      setFilters(prev => ({
        ...prev,
        vehicle: ''
      }));
    }

    if (name === 'vehicle') {
      const vehicle = vehicles.find(v => v._id === value);
      setSelectedVehicle(vehicle);
    }
  };

  const loadReport = async () => {
    setLoading(true);
    try {
      const res = await fetchCostReports(filters);
      const data = res?.data?.data || [];
      setReportData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching cost reports:', err);
      setReportData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const [
        customerRes,
        vehicleRes,
        fleetRes,
        supplierRes,
        categoryRes
      ] = await Promise.all([
        fetchCustomers(),
        fetchVehicles(),
        fetchFleets(),
        fetchSuppliers(),
        fetchRepairCategories()
      ]);
      setCustomers(customerRes.data.filter(c => c.active === true));
      setVehicles(vehicleRes.data.filter(v => v.active === true));
      setFleets(fleetRes.data.filter(f => f.active === true));
      setSuppliers(supplierRes.data.filter(s => s.active === true));
      setCategories(categoryRes.data.filter(c => c.active === true));
    } catch (error) {
      console.error('Error fetching dropdown data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    loadReport();
  }, []);

  const filteredFleets = fleets.filter(
    f => f.customer?._id === filters.customer
  );
  const filteredVehicles = vehicles.filter(
    v => v.customer?._id === filters.customer &&
         v.fleet?._id === filters.fleet
  );
  const filteredSuppliers = suppliers.filter(
    s => s.customer?._id === filters.customer
  );
  const filteredCategories = categories.filter(
    c => c.customer?._id === filters.customer
  );

  const totalCost = Array.isArray(reportData)
    ? reportData.reduce((sum, item) => sum + (item.totalCost || 0), 0)
    : 0;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow">
        <BackButton />
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Costs Reports</h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium">Customer</label>
            <select name="customer" value={filters.customer} onChange={handleChange} className="input-style w-full">
              <option value="">All Customers</option>
              {customers.map(c => (
                <option key={c._id} value={c._id}>{c.companyName}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Fleet</label>
            <select name="fleet" value={filters.fleet} onChange={handleChange} className="input-style w-full">
              <option value="">All Fleets</option>
              {filteredFleets.length === 0 && <option disabled>-- No Fleets --</option>}
              {filteredFleets.map(f => (
                <option key={f._id} value={f._id}>{f.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Vehicle</label>
            <select name="vehicle" value={filters.vehicle} onChange={handleChange} className="input-style w-full">
              <option value="">All Vehicles</option>
              {filteredVehicles.length === 0 && <option disabled>-- No Vehicles --</option>}
              {filteredVehicles.map(v => (
                <option key={v._id} value={v._id}>{v.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Type</label>
            <select name="type" value={filters.type} onChange={handleChange} className="input-style w-full">
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Supplier</label>
            <select name="supplier" value={filters.supplier} onChange={handleChange} className="input-style w-full">
              <option value="">All Suppliers</option>
              {filteredSuppliers.length === 0 && <option disabled>-- No Suppliers --</option>}
              {filteredSuppliers.map(s => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <select name="category" value={filters.category} onChange={handleChange} className="input-style w-full">
              <option value="">All Categories</option>
              {filteredCategories.length === 0 && <option disabled>-- No Categories --</option>}
              {filteredCategories.map(c => (
                <option key={c._id} value={c._id}>{c.categoryEn}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Date From</label>
            <input type="date" name="dateFrom" value={filters.dateFrom} onChange={handleChange} className="input-style w-full" />
          </div>

          <div>
            <label className="block text-sm font-medium">Date To</label>
            <input type="date" name="dateTo" value={filters.dateTo} onChange={handleChange} className="input-style w-full" />
          </div>
        </div>

        <button onClick={loadReport} className="bg-blue-600 text-white px-4 py-2 rounded mb-6">
          Apply Filters
        </button>

        <table className="w-full border rounded">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-2 text-left">Vehicle</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Supplier</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Total Cost</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="8" className="p-4 text-center">Loading...</td></tr>
            ) : reportData.length === 0 ? (
              <tr><td colSpan="8" className="p-4 text-center">No data found.</td></tr>
            ) : (
              reportData.map(entry => (
                <tr key={entry._id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{entry.vehicleName}</td>
                  <td className="p-2">{entry.description}</td>
                  <td className="p-2">{new Date(entry.date).toLocaleDateString()}</td>
                  <td className="p-2 capitalize">{entry.type}</td>
                  <td className="p-2">{entry.supplierName}</td>
                  <td className="p-2">{entry.category}</td>
                  <td className="p-2">${entry.totalCost?.toFixed(2)}</td>
                  <td className="p-2">
                    <button className="text-blue-600 hover:underline" onClick={() => setSelected(entry)}>View</button>
                  </td>
                </tr>
              ))
            )}
            {reportData.length > 0 && (
              <tr className="font-semibold border-t bg-gray-100">
                <td colSpan="6" className="p-2 text-right">Total</td>
                <td className="p-2">${totalCost.toFixed(2)}</td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl relative">
            <button className="absolute top-2 right-4" onClick={() => setSelected(null)}>&times;</button>
            <h3 className="text-lg font-bold text-blue-700 mb-2">Repair/Maintenance Detail</h3>
            <p><strong>Description:</strong> {selected.description}</p>
            <p><strong>Date:</strong> {new Date(selected.date).toLocaleDateString()}</p>
            <p><strong>Vehicle:</strong> {selected.vehicleName}</p>
            <p><strong>Supplier:</strong> {selected.supplierName}</p>
            <p><strong>Category:</strong> {selected.category}</p>
            <p><strong>Type:</strong> {selected.type}</p>
            <p><strong>Total Cost:</strong> ${selected.totalCost.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostsReportPage;
