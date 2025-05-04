import { useState } from 'react';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const types = [
  'Personal Issue',
  'Startup',
  'Business',
  'Creative Ideas',
];

export default function AddCampaign() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    image: '',
    title: '',
    type: types[0],
    description: '',
    minDonation: '',
    deadline: '',
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    try {
      const token = user && (await user.getIdToken());
      await api.post(
        '/campaigns',
        {
          ...form,
          minDonation: Number(form.minDonation),
          userEmail: user.email,
          userName: user.displayName || user.email,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg('Campaign added successfully!');
      setForm({ image: '', title: '', type: types[0], description: '', minDonation: '', deadline: '' });
    } catch (err) {
      setMsg('Failed to add campaign.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Campaign</h2>
      {msg && <div className="mb-4 text-green-600 font-semibold">{msg}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="image" type="url" placeholder="Image URL" value={form.image} onChange={handleChange} required className="border rounded px-3 py-2" />
        <input name="title" type="text" placeholder="Title" value={form.title} onChange={handleChange} required className="border rounded px-3 py-2" />
        <select name="type" value={form.type} onChange={handleChange} className="border rounded px-3 py-2">
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="border rounded px-3 py-2" />
        <input name="minDonation" type="number" min="1" placeholder="Minimum Donation" value={form.minDonation} onChange={handleChange} required className="border rounded px-3 py-2" />
        <input name="deadline" type="date" value={form.deadline} onChange={handleChange} required className="border rounded px-3 py-2" />
        <input type="text" value={user?.email || ''} readOnly className="border rounded px-3 py-2 bg-gray-100" placeholder="User Email" />
        <input type="text" value={user?.displayName || user?.email || ''} readOnly className="border rounded px-3 py-2 bg-gray-100" placeholder="User Name" />
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {loading ? 'Adding...' : 'Add Campaign'}
        </button>
      </form>
    </div>
  );
} 