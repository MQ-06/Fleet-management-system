import { useState } from 'react';
import { addTranslation } from '../../../services/translationService';

const AddTranslationForm = ({ onSuccess }) => {
  const [key, setKey] = useState('');
  const [en, setEn] = useState('');
  const [es, setEs] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTranslation({ key: key.toLowerCase(), en, es });
      alert('Translation added!');
      setKey('');
      setEn('');
      setEs('');
      onSuccess();
    } catch (err) {
      alert('Failed to add translation');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 p-6 rounded shadow">
      <h3 className="text-lg font-semibold mb-6 text-blue1">Add New Translation</h3>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Key (lowercase)"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          required
          className="p-3 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="English"
          value={en}
          onChange={(e) => setEn(e.target.value)}
          required
          className="p-3 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Spanish"
          value={es}
          onChange={(e) => setEs(e.target.value)}
          required
          className="p-3 border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        className="mt-6 bg-primary text-white px-6 py-2 rounded hover:brightness-105 transition"
      >
        Add Translation
      </button>
    </form>
  );
};

export default AddTranslationForm;
