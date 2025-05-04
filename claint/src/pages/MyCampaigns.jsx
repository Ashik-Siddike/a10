import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

export default function MyCampaigns() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMyCampaigns() {
      setLoading(true);
      setError('');
      try {
        const token = user && (await user.getIdToken());
        const res = await api.get('/campaigns/user/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCampaigns(res.data);
      } catch (err) {
        setError('Failed to fetch campaigns.');
      }
      setLoading(false);
    }
    if (user) fetchMyCampaigns();
  }, [user, msg]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this campaign?')) return;
    setMsg('');
    try {
      const token = user && (await user.getIdToken());
      await api.delete(`/campaigns/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg('Campaign deleted successfully!');
    } catch (err) {
      setMsg('Failed to delete campaign.');
    }
  };

  const handleUpdate = (id) => {
    navigate(`/updateCampaign/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">My Campaigns</h2>
      {msg && <div className="mb-4 text-green-600 font-semibold">{msg}</div>}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : (
        <table className="w-full bg-white shadow rounded mb-8">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Type</th>
              <th className="py-2 px-4">Min Donation</th>
              <th className="py-2 px-4">Deadline</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.length === 0 && (
              <tr><td colSpan={5} className="text-center py-4">No campaigns found.</td></tr>
            )}
            {campaigns.map(c => (
              <tr key={c._id}>
                <td className="py-2 px-4">{c.title}</td>
                <td className="py-2 px-4">{c.type}</td>
                <td className="py-2 px-4">${c.minDonation}</td>
                <td className="py-2 px-4">{c.deadline.slice(0,10)}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button className="text-blue-600 underline" onClick={() => handleUpdate(c._id)}>Update</button>
                  <button className="text-red-600 underline" onClick={() => handleDelete(c._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 