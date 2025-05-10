import { useState } from 'react';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import { FaPlusCircle } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';

const types = [
  'Personal Issue',
  'Startup',
  'Business',
  'Creative Ideas',
];

const fallbackImg = 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80';

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
  const [imgError, setImgError] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'image') setImgError(false);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white flex items-center justify-center py-8 px-2">
      <Fade triggerOnce>
        <div className="w-full max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-8 relative animate-fadeIn">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-200 to-purple-200 mb-2 shadow">
              <FaPlusCircle className="text-blue-600 text-4xl" />
            </div>
            <h2 className="text-3xl font-extrabold text-blue-800 mb-1 drop-shadow">Add New Campaign</h2>
            <p className="text-gray-600 text-lg text-center">Share your idea and inspire the community!</p>
          </div>
          {msg && <div className={`mb-4 text-center font-semibold ${msg.includes('success') ? 'text-green-600' : 'text-red-500'}`}>{msg}</div>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-blue-700 font-semibold mb-1">Image URL</label>
              <input name="image" type="url" placeholder="Image URL" value={form.image} onChange={handleChange} required className="border-2 border-blue-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
              {form.image && (
                <div className="mt-2 flex justify-center">
                  <img
                    src={imgError ? fallbackImg : form.image}
                    alt="Preview"
                    className="h-32 w-full object-cover rounded shadow border"
                    onError={() => setImgError(true)}
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-blue-700 font-semibold mb-1">Title</label>
              <input name="title" type="text" placeholder="Title" value={form.title} onChange={handleChange} required className="border-2 border-blue-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
            </div>
            <div>
              <label className="block text-blue-700 font-semibold mb-1">Type</label>
              <select name="type" value={form.type} onChange={handleChange} className="border-2 border-blue-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition">
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-blue-700 font-semibold mb-1">Description</label>
              <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="border-2 border-blue-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition min-h-[80px]" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-blue-700 font-semibold mb-1">Minimum Donation</label>
                <input name="minDonation" type="number" min="1" placeholder="Minimum Donation" value={form.minDonation} onChange={handleChange} required className="border-2 border-blue-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
              </div>
              <div className="flex-1">
                <label className="block text-blue-700 font-semibold mb-1">Deadline</label>
                <input name="deadline" type="date" value={form.deadline} onChange={handleChange} required className="border-2 border-blue-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-blue-700 font-semibold mb-1">User Email</label>
                <input type="text" value={user?.email || ''} readOnly className="border-2 border-blue-100 rounded-lg px-4 py-2 w-full bg-gray-100" placeholder="User Email" />
              </div>
              <div className="flex-1">
                <label className="block text-blue-700 font-semibold mb-1">User Name</label>
                <input type="text" value={user?.displayName || user?.email || ''} readOnly className="border-2 border-blue-100 rounded-lg px-4 py-2 w-full bg-gray-100" placeholder="User Name" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="mt-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 transition text-lg disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Adding...' : 'Add Campaign'}
            </button>
          </form>
        </div>
      </Fade>
    </div>
  );
} 