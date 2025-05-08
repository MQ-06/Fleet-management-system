import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import TranslationList from './features/translations/TranslationList';
import SettingsPage from './features/settings/SettingPage';
import TaxesPage from './features/taxes/TaxesPage';
import PlansPage from './features/subscriptions/Plans';
import CustomersPage from './features/customers/CustomerList';
import SubscribersPage from './features/Subscribers/SubscribersPage';
import UsersPage from './features/users/Users'
import SuppliersPage from './features/suppliers/SuppliersPage';
import FleetsPage from './features/fleets/FleetsPage';
import VehiclesPage from './features/vehicles/VehiclePage';
import RepairCategoriesPage from './features/repair_and_maintenance/RepairCategoriesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/translations" element={<TranslationList />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="/admin/taxes" element={<TaxesPage />} />
        <Route path="/admin/plans" element={<PlansPage />} />
        <Route path="/admin/customers" element={<CustomersPage />} />
        <Route path="/admin/subscribers" element={<SubscribersPage />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/suppliers" element={<SuppliersPage />} />
        <Route path="/admin/fleets" element={<FleetsPage />} />
        <Route path="/admin/vehicles" element={<VehiclesPage />} />
        <Route path="/admin/repair-categories" element={<RepairCategoriesPage />} />







      </Routes>
    </Router>
  );
}

export default App;
