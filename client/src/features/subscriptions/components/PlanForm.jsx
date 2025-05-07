import { useEffect, useState } from 'react';
import Select from 'react-select';
import { fetchTaxes } from '@/services/taxService';

const PlanForm = ({ onSubmit }) => {
  const initialForm = {
    name_en: '',
    name_es: '',
    description_en: '',
    description_es: '',
    recurrence: 'monthly',
    amount: '',
    applicableTaxes: [],
    fleetAmount: ''
  };

  const [form, setForm] = useState(initialForm);
  const [taxOptions, setTaxOptions] = useState([]);

  useEffect(() => {
    fetchTaxes().then((res) => {
      const options = res.data.map((tax) => ({
        label: `${tax.name} (${tax.amount}${tax.type === 'percentage' ? '%' : '$'})`,
        value: tax._id
      }));
      setTaxOptions(options);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleTaxChange = (selected) => {
    setForm({ ...form, applicableTaxes: selected.map((s) => s.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);       
    setForm(initialForm);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label>Subscription Name (EN)</label>
        <input name="name_en" value={form.name_en} onChange={handleChange} className="input-style" />
      </div>

      <div>
        <label>Subscription Name (ES)</label>
        <input name="name_es" value={form.name_es} onChange={handleChange} className="input-style" />
      </div>

      <div className="md:col-span-2">
        <label>Description (EN)</label>
        <textarea name="description_en" value={form.description_en} onChange={handleChange} className="input-style" />
      </div>

      <div className="md:col-span-2">
        <label>Description (ES)</label>
        <textarea name="description_es" value={form.description_es} onChange={handleChange} className="input-style" />
      </div>

      <div>
        <label>Recurrence</label>
        <select name="recurrence" value={form.recurrence} onChange={handleChange} className="input-style">
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div>
        <label>Amount (USD)</label>
        <input type="number" name="amount" value={form.amount} onChange={handleChange} className="input-style" />
      </div>

      <div className="md:col-span-2">
        <label>Applicable Taxes</label>
        <Select
          isMulti
          options={taxOptions}
          value={taxOptions.filter((opt) => form.applicableTaxes.includes(opt.value))}
          onChange={handleTaxChange}
        />
      </div>

      <div className="md:col-span-2">
        <label>Fleet Limit</label>
        <input type="number" name="fleetAmount" value={form.fleetAmount} onChange={handleChange} className="input-style" />
      </div>

      <div className="md:col-span-2 text-right">
        <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded shadow">
          Save Plan
        </button>
      </div>
    </form>
  );
};

export default PlanForm;
