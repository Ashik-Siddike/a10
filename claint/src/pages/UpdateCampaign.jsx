import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import Spinner from '../components/Spinner';

const types = [
  'Personal Issue',
  'Startup',
  'Business',
  'Creative Ideas',
];

export default function UpdateCampaign() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    image: '',
    title: '',
    type: types[0],
    description: '',
    minDonation: '',
    deadline: '',
    userEmail: '',
    userName: '',
  });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCampaign() {
      setLoading(true);
      try {
        const token = user && (await user.getIdToken());
        const res = await api.get(`/campaigns/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm({
          image: res.data.image,
          title: res.data.title,
          type: res.data.type,
          description: res.data.description,
          minDonation: res.data.minDonation,
          deadline: res.data.deadline.slice(0, 10),
          userEmail: res.data.userEmail,
          userName: res.data.userName,
        });
      } catch (err) {
        setError(true);
        setMsg('Failed to fetch campaign.');
      }
      setLoading(false);
    }
    if (user) fetchCampaign();
  }, [id, user]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    try {
      const token = user && (await user.getIdToken());
      await api.put(
        `/campaigns/${id}`,
        {
          ...form,
          minDonation: Number(form.minDonation),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg('Campaign updated successfully!');
      setTimeout(() => navigate('/myCampaign'), 1200);
    } catch (err) {
      setMsg('Failed to update campaign.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Update Campaign</h2>
      {msg && <div className="mb-4 text-green-600 font-semibold">{msg}</div>}
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-center py-8">Failed to load campaign.</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="image" type="url" placeholder="Image URL" value={form.image} onChange={handleChange} required className="border rounded px-3 py-2" />
          <input name="title" type="text" placeholder="Title" value={form.title} onChange={handleChange} required className="border rounded px-3 py-2" />
          <select name="type" value={form.type} onChange={handleChange} className="border rounded px-3 py-2">
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="border rounded px-3 py-2" />
          <input name="minDonation" type="number" min="1" placeholder="Minimum Donation" value={form.minDonation} onChange={handleChange} required className="border rounded px-3 py-2" />
          <input name="deadline" type="date" value={form.deadline} onChange={handleChange} required className="border rounded px-3 py-2" />
          <input type="text" value={form.userEmail} readOnly className="border rounded px-3 py-2 bg-gray-100" placeholder="User Email" />
          <input type="text" value={form.userName} readOnly className="border rounded px-3 py-2 bg-gray-100" placeholder="User Name" />
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            {loading ? 'Updating...' : 'Update Campaign'}
          </button>
        </form>
      )}
    </div>
  );
} 